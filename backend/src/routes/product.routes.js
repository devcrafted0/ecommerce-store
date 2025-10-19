import { Router } from "express";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAllProducts, publishProduct } from "../controllers/product.controllers.js";
const router = Router();

// get all the users for the specific user
router.route('/').get(getAllProducts);


// Protected Rotue
router.route('/publishProduct').post(verifyJWT, authorizeRoles("seller"), upload.array('images', 5), publishProduct);


export default router;