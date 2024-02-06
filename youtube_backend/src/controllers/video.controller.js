import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { uploadOnCloudinary,uploadVideoOnCloudinary } from "../utils/cloudinary.js";

export const createVideo = async function (req, res) {
  try {
    const { title, description, isPublished, owner } = req.body;

    const videoFileLocalPath = req.files.video[0].path;

    const thumbnailLocalPath = req.files.thumbnail[0].path;

    const videoFileAfterUpload = await uploadVideoOnCloudinary(videoFileLocalPath);

    const thumbnailFileAfterUpload = await uploadOnCloudinary(
      thumbnailLocalPath
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
      data:video
    });
  } catch (error) {
    console.log("error occured in create video ",error.message);
  }
};

export const getAllVideos=async function (req,res){
    try {

      const videos=await Video.aggregate(
        [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "userData",
              pipeline:[
                {
                  $project:{
                      username:1,
                      avatar:1
                  }
                }
              ]
            }
          },
          {
            $unwind:"$userData"
          },
          {
            $project:{
              owner:0
            }
          }
      ]
    )
    return res.status(200).json({
        success:true,
        message:"Data successfully retrieved",
        data:videos
    })
    } catch (error) {
      console.log("something went wrong in getting all videos")      
    }
}

export const getRequiredVideo=async function (req,res){

    return res.status(200).send("data is sent")

}
