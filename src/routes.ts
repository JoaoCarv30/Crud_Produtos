import { Router } from 'express';
import upload from './config/multer'; // Configuração do Multer
import { CreateProduct, GetProducts, UpdateProduct, DeleteProduct } from './controllers/productController';

export const router = Router();

router.get('/products', GetProducts);
router.post('/products', upload.single('image'), CreateProduct);
router.put('/products/:id', upload.single('image'), UpdateProduct);
router.delete('/products/:id', DeleteProduct);

export default router;
