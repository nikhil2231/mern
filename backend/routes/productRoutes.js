import express from 'express';
const router = express.Router();
import { protect, admin } from '../middlware/authMiddleware.js';
import { getProducts, getProductById, deleteProduct, updateProduct, createProduct, addReviews  } from '../controllers/productController.js';






router.route('/').get(getProducts).post(protect, admin, createProduct);


router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct);


router.route('/:id/reviews').post(protect, addReviews)


export default router;



