import mongoose from "mongoose";

import { Likes } from "../models/likes.model.js";


export const likeVideo=async function(req,res){
    try 
    {
        const {videoId,ownerId}=req.body
  
        const likeByUser=await Likes.create({
            video:videoId,
            likedBy:ownerId
        })

        res.status(200).json({
            success:true,
            message:"video liked",
            data:likeByUser
        })

  } catch (error) {
        console.log("error occured in like by user")    
  }
}