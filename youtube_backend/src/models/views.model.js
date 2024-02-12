import mongoose from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const viewSchema=new mongoose.Schema({
    ownerId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    videoId:{
        type:mongoose.Types.ObjectId,
        ref:"Video"
    },
})

viewSchema.plugin(mongooseAggregatePaginate)
export const View=mongoose.model("View",viewSchema)