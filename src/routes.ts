import express from 'express';
import { Router } from 'express';
import upload from './config/multer'; // Configuração do Multer
import { CreateProduct, GetProducts, UpdateProduct, DeleteProduct, GetUserProducts } from './controllers/productController';
import { CreateUser, GetUsers } from './controllers/userController';
import { Authcontroller } from './controllers/authController';
import { AuthMiddleware } from './middlewares/authMIddleware';
import path from 'path';

export const router = Router();

// Servir arquivos estáticos da pasta uploads
router.use('/uploads', express.static(path.resolve(__dirname, '../../uploads')));

// ROTAS DE PRODUTOS
router.get('/products', GetProducts);
router.post('/products', AuthMiddleware, upload.single('Image'), CreateProduct);
router.put('/products/:id', UpdateProduct);
router.delete('/products/:id', DeleteProduct);

router.use("/images", express.static("uploads")); // Rota para acessar as imagens

// ROTAS DE USUÁRIOS
router.post('/users', CreateUser);
router.get('/users', GetUsers);

router.get('/users/products', AuthMiddleware, GetUserProducts);


// ROTAS DE AUTENTICAÇÃO
router.post('/auth', Authcontroller);

