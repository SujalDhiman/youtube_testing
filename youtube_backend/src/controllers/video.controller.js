import mongoose from "mongoose";

export const createVideo=async function (req,res){

    console.log(req.file)

    return res.status(200).send("accepting files")

}