import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { postVideo, uploadVideo } from "../controllers/video.controllers.js";
import {authorizeRoles} from '../middlewares/authorizeRoles.js'

const router = Router();

router.route('/upload').post(verifyJWT, authorizeRoles("seller"), upload.single('video') , uploadVideo);
router.route('/upload-thumbnail').post(verifyJWT, authorizeRoles("seller"), upload.single('thumbnail') , uploadVideo)
router.route('/post-video').post(verifyJWT, authorizeRoles("seller"), postVideo);

export default router;