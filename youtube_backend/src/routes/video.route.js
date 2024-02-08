import express from "express";
import {
  createVideo,
  getAllVideos,
  getRequiredVideo,
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

<<<<<<< HEAD
router.route("/getParticularVideo/:id")


export default router
=======
router.route("/getParticularVideo/:id").get(getRequiredVideo);
export default router;
>>>>>>> d76de65359729086d082b3c49848f8b7954d70ff
