import express from "express"
import { createVideo,getAllVideos } from "../controllers/video.controller.js"
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

router.route("/getAllVideo").get(getAllVideos)

router.route("/getParticularVideo/:id")


export default router