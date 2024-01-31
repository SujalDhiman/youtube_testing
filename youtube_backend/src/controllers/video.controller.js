import mongoose from "mongoose";

import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createVideo=async function (req,res){

    try {

        const {title,description,isPublished}=req.body
    
        if([title,description,isPublished].some(field=> field === ""))
        {
            return res.status(400).json({
                success:false,
                message:"All fields are compulsory"
            })
        }
    
        console.log(req.files)
        
        return res.status(200).send("accepting files")
    } catch (error) {
        
    }

}