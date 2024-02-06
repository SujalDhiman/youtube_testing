import express from "express"
import { createVideo } from "../controllers/video.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router=express.Router()



router.route("/createVideo").post(verifyJWT,upload.fields([
    {
        name:"video"
    },
    {
        name:"thumbnail"
    }
]),createVideo)

export default router