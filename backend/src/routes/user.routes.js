import { Router } from "express";
import { getAnyUser, getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, resendOtp, switchToSeller, verifyOtp } from "../controllers/user.controllers.js";
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

// Give the user after login
router.route('/me').get(verifyJWT , getCurrentUser);

// For OTP
router.route('/verify-otp').post(verifyOtp);
router.route('/resend-otp').post(resendOtp);


// Get any Public User

router.route('/:id').get(getAnyUser);


// Secured Routes
router.route('/logout').post(verifyJWT , logoutUser);
router.route('/switchtoseller').post(verifyJWT, switchToSeller)
router.route('/refresh-token').post(refreshAccessToken)

export default router;