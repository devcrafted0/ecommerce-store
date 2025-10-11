import { Router } from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser, verifyOtp } from "../controllers/user.controllers.js";
import { upload } from '../middlewares/multer.middleware.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// router.route('/register').post(
//     upload.fields([
//         {
//             name : "avatar",
//             maxCount : 1,
//         },
//         {
//             name : 'coverImage',
//             maxCount : 1
//         }
//     ]),    
//     registerUser
// );

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/verify-otp').post(verifyOtp);

// Secured Routes
router.route('/logout').post(verifyJWT , logoutUser);
router.route('/refresh-token').post(refreshAccessToken)

export default router;