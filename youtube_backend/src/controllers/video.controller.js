import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import {
  uploadOnCloudinary,
  uploadVideoOnCloudinary,
} from "../utils/cloudinary.js";

export const createVideo = async function (req, res) {
  try {
    const { title, description, isPublished, owner } = req.body;

    console.log(req.files);

    const videoFileLocalPath = req.files.video[0].path;
    const imageFileLocalPath = req.files.thumbnail[0].path;

    console.log(videoFileLocalPath);
    console.log(imageFileLocalPath);

    const videoFileAfterUpload = await uploadVideoOnCloudinary(
      videoFileLocalPath
    );

    const thumbnailFileAfterUpload = await uploadOnCloudinary(
      imageFileLocalPath
    );

    const video = await Video.create({
      videoFile: {
        public_id: videoFileAfterUpload.public_id,
        secure_url: videoFileAfterUpload.secure_url,
      },
      thumbnail: {
        public_id: thumbnailFileAfterUpload.public_id,
        secure_url: thumbnailFileAfterUpload.secure_url,
      },
      title,
      description,
      duration: videoFileAfterUpload.duration,
      isPublished,
      owner,
      original_name: videoFileAfterUpload.original_filename,
    });

    res.status(200).json({
      success: true,
      message: "video successfully uploaded",
      data: video,
    });
  } catch (error) {
    console.log("error occured in create video ", error.message);
  }
};

export const getAllVideos = async function (req, res) {
  try {
    const videos = await Video.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "userData",
          pipeline: [
            {
              $project: {
                username: 1,
                avatar: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$userData",
      },
      {
        $project: {
          owner: 0,
        },
      },
    ]);
    return res.status(200).json({
      success: true,
      message: "Data successfully retrieved",
      data: videos,
    });
  } catch (error) {
    console.log("something went wrong in getting all videos ", error.message);
  }
};

export const getRequiredVideo = async function (req, res) {
  try {
    const { id } = req.params;
    const {userId} =req.body
    const video = await Video.aggregate([
      {
          $match:{
            _id:new mongoose.Types.ObjectId(id)
          }
      },
      {

        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "userData",
          pipeline: [
            {
              $project: {
                username: 1,
                avatar: 1,
              },
            },
          ],
        },
      },
  		{
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "video",
          as: "totalLikes"
        }
      },
      {
        $unwind: "$userData",
      },
  		{
    		$addFields: {
    		  likes:{
            $size:"$totalLikes"
          },
          likedByUser:{
            $cond:{
              if:{
                $in:[new mongoose.Types.ObjectId(userId),"$totalLikes.likedBy"]
              },
              then:true,
              else:false
            }
          }
    		}
  		},
      {
        $project: {
          owner: 0,
          totalLikes:0
        },
      }
]);

    return res.status(200).json({
      success: true,
      message: "video details fetched",
      data: video,
    });
  } catch (error) {
    console.log("error in getting required video ", error.message);
  }
};
