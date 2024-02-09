import mongoose from "mongoose";

import { Likes } from "../models/likes.model.js";

export const likeVideo = async function (req, res) {
  try {
    const { videoId, ownerId, likeState } = req.body;
    console.log("request recieved");
    if (likeState === true) {
      const doesUserExist = await Likes.findOne({
        likedBy: new mongoose.Types.ObjectId(ownerId),
      });

      if (!doesUserExist) {
        const likeByUser = await Likes.create({
          video: videoId,
          likedBy: ownerId,
        });

        res.status(200).json({
          success: true,
          message: "video liked",
          data: likeByUser,
        });
      }
    } else {

      const findTheUser = await Likes.findOne({
        likedBy: new mongoose.Types.ObjectId(ownerId),
      });
      
      console.log(findTheUser)

      if (findTheUser) {
        const deleteUser = await Likes.findByIdAndDelete(findTheUser._id);

        res.status(200).json({
          success: true,
          message: "video disliked",
          data: findTheUser,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "video should be liked first",
        });
      }
    }
  } catch (error) {
    console.log("error occured in like by user ", error.message);
  }
};
