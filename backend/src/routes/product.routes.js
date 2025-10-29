import { Router } from "express";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAllProducts, getProduct, publishProduct, uploadImage , editProduct} from "../controllers/product.controllers.js";
const router = Router();

// get all the users for the specific user
router.route('/').get(getAllProducts);

// Get specific products 
router.route('/:id').get(getProduct);



// Protected Rotue
router.route('/publishProduct').post(verifyJWT, authorizeRoles("seller"), upload.array('images', 5), publishProduct);

// For edit page and upload the images only there
router.route('/upload-image').post(verifyJWT, authorizeRoles("seller"), upload.single('image') , uploadImage);
// for complete edit of the product (the product will be coming completely)
router.route('/edit-product/:id').put(verifyJWT , authorizeRoles("seller"), editProduct);

export default router;