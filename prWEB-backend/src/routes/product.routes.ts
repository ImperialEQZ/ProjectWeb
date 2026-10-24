import { Router } from 'express';
import { getAllProducts, getProductById } from '../controllers/product.control';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);

export default router;