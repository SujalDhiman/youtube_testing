import mongoose from "mongoose";

import { Likes } from "../models/likes.model.js";


export const likeVideo=async function(req,res){
    try 
    {
        const {videoId,ownerId,likeState}=req.body
        
        if(likeState === true)
        {
            const likeByUser=await Likes.create({
                video:videoId,
                likedBy:ownerId
            })

            res.status(200).json({
                success:true,
                message:"video liked",
                data:likeByUser
            })
        }
        else
        {
            const findTheUser=await Likes.findById(ownerId)

            if(findTheUser)
            {
                const deleteUser=await Likes.findByIdAndDelete(findTheUser._id)
                
                res.status(200).json({
                    success:true,
                    message:"video disliked",
                    data:findTheUser
                })
            }
            else
            {
                res.status(200).json({
                    success:true,
                    message:"video should be liked first"
                })
            }
        }
  } catch (error) {
        console.log("error occured in like by user")    
  }
}