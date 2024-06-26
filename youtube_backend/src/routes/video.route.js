import express from "express";
import {
  createVideo,
  getAllVideos,
  getRequiredVideo,
  getUserHistory
} from "../controllers/video.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/createVideo").post(
  verifyJWT,
  upload.fields([
    {
      name: "video",
    },
    {
      name: "thumbnail",
    },
  ]),
  createVideo
);

router.route("/getAllVideo").get(getAllVideos);

router.route("/getParticularVideo/:id").post(getRequiredVideo);

router.route("/getHistory/:id").get(getUserHistory)

export default router;
