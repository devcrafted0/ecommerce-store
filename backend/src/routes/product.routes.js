import { Router } from "express";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { publishProduct } from "../controllers/product.controllers.js";
const router = Router();


router.route('/publishProduct').post(verifyJWT, authorizeRoles("seller"), upload.array('images', 5), publishProduct);


export default router;