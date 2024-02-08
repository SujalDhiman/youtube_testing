import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const likesSchema=new mongoose.Schema({
    video:{
        type:mongoose.Types.ObjectId,
        ref:"Video"
    },
    likedBy:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

likesSchema.plugin(mongooseAggregatePaginate)

export const Likes=mongoose.model("Like",likesSchema)

