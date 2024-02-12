import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"


export const verifyJWT=async  (req,res,next)=>{

    // get data from cookies
    try {
        
        const token=req.cookies.accessToken 
        console.log(req.cookies)
        if(!token)
        return res.status(400).json({
        success:false,
        message:"Please login first"})

        const decodedToken=await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        

        const user=await User.findOne(decodedToken._id).select("-password -refreshToken")

        if(!user)
            return res.status(400).json({
            success:false,
            message:"Invalid token"})

        req.user=user._id
        next()
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Token Expired Please Login"
        })
    }
}