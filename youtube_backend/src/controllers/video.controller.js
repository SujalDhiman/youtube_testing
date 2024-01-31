import mongoose from "mongoose";

import { uploadOnCloudinary } from "../utils/cloudinary";

export const createVideo=async function (req,res){

    const {text,url}=req.body

    const response=await uploadOnCloudinary(url)


    console.log(response)

    return res.status(200).send("accepting files")

}