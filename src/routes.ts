import { Router } from 'express';
import upload from './config/multer'; // Configuração do Multer
import { CreateProduct, GetProducts, UpdateProduct, DeleteProduct } from './controllers/productController';
import { CreateUser, GetUsers } from './controllers/userController';
import { Authcontroller } from './controllers/authController';


export const router = Router();

//ROTAS DE PRODUTOS
router.get('/products', GetProducts);
router.post('/products', CreateProduct);
router.put('/products/:id', UpdateProduct);
router.delete('/products/:id', DeleteProduct);

//ROTAS DE USUÁRIOS
 router.post('/users', CreateUser);
 router.get('/users', GetUsers);

 //ROTAS DE AUTENTICACAO
 router.post('/auth', Authcontroller);