import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import {
  uploadOnCloudinary,
  uploadVideoOnCloudinary,
} from "../utils/cloudinary.js";
import { View } from "../models/views.model.js";
import { User } from "../models/user.model.js";


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
        $lookup: {
          from: "views",
          localField: "_id",
          foreignField: "videoId",
          as: "totalViews",
        },
      },
      {
        $addFields: {
          totalViews: {
            $size: "$totalViews",
          },
        },
      },
      {
        $project: {
          owner: 0,
          views: 0,
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
    const { userId } = req.body;

    //logic for increasing views
    if (userId !== "5f4f54c11e35ab609d377c65") {
      const findWhetherVideoIsAlreadyViewedOrNot = await View.findOne({$and:[{
        ownerId: new mongoose.Types.ObjectId(userId),
      },{videoId:new mongoose.Types.ObjectId(id)}]});

      if (findWhetherVideoIsAlreadyViewedOrNot === null) {
        const createdViewedVideo = await View.create({
          ownerId: userId,
          videoId: id,
        });
      }
    }

    if(userId !== "5f4f54c11e35ab609d377c65")
    {
        const userDetail=await User.findById(userId);
        let arr=userDetail.watchHistory

        const obj={
          watchedTime:String(Date.now()),
          videoId:id
        }

        arr=arr.filter((ele)=>
        String(ele.videoId) === String(id))


        if(arr.length == 0)
        {
          userDetail.watchHistory=userDetail.watchHistory.push(obj);
          await userDetail.save({validateBeforeSave:false})
        }
    }

    const video = await Video.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
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
          as: "totalLikes",
        },
      },
      {
        $unwind: "$userData",
      },
      {
        $addFields: {
          likes: {
            $size: "$totalLikes",
          },
          likedByUser: {
            $cond: {
              if: {
                $in: [
                  new mongoose.Types.ObjectId(userId),
                  "$totalLikes.likedBy",
                ],
              },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $project: {
          owner: 0,
          totalLikes: 0,
        },
      },
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

export const getUserHistory= async function(req,res){

    try {
      const {id}=req.params
  
      if(!id)
        return res.status(400).json({
          success:false,
          message:"User history cannot be fetched"})
      

      const userHistoryData=await User.findById(id)
      
      if(userHistoryData.watchHistory.length == 0)
      {
         return res.status(200).json({
            success:true,
            message:"empty user history",
            data:[]
         })
      }
      else
      {
      const userHistory=await User.aggregate(
        [
          {
              $match: {
                    _id:new mongoose.Types.ObjectId(id)
                  }
                },
          {
            $project:{
              watchHistory:1
            }
          },
          {
            $unwind:"$watchHistory"
          },
          {
            $lookup: {
              from: "videos",
              localField: "watchHistory.videoId",
              foreignField: "_id",
              as: "videoData",
              pipeline:[
                {
                  $lookup:{
                    from:"users",
                    localField:"owner",
                    foreignField:"_id",
                    as:"userData",
                    pipeline:[
                      {
                        $project:{
                          username:1
                        }
                      }
                    ]
                  }
                },
                {
                  $unwind:"$userData"
                }
              ]
            }
          },
          {
            $unwind:"$videoData"
          },
          {
            $project:{
              videoData:1
            }
          },
          {
            $group:{
              _id:"_id",
              userHistory:{
                $push:"$videoData"
              }
            }
          }
      ])
    
    return res.status(200).json({
        success:true,
        message:"History fetched successfully",
        data:userHistory
    })
    }
    } catch (error) {
      console.log("something went wrong in user getting user history ",error)
    }
  
}
