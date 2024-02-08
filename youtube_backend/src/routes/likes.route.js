import express from "express"
import { likeVideo } from "../controllers/likes.controller.js"

const router=express.Router()

router.route("/likeVideo").post(likeVideo)


export default router