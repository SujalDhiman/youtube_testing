import express from "express"
import { createVideo } from "../controllers/video.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
const router=express.Router()



router.route("/createVideo").post(upload.single('video'),createVideo)

export default router