import { Router } from 'express';
import {
  getUserController,
  loginController,
  logoutController,
  registerController,
  clientLogin,
  clientList,
} from '../Controllers/authController.js';
import {
  deleteProductController,
  getProductsController,
  insertProductController,
  updateProductController,
  productList,
} from '../Controllers/productController.js';
import authMiddleware, {
  authClientMiddleware,
} from '../Middleware/authMiddleware.js';
import {
  createNewSaleController,
  deleteSaleController,
  getSalesController,
  getMyOrderList,
} from '../Controllers/salesController.js';
import {
  clientregisterController,
  crateOderController,
} from '../Controllers/clientAuth.js';
export const route = Router();

// auth endpoint:
route.post('/login', loginController);
route.post('/register', registerController);
route.get('/logout', logoutController);
route.get('/getUser', authMiddleware, getUserController);

// product endpoint://need verifytoken
route.get('/products', authMiddleware, getProductsController);
route.post('/insert', authMiddleware, insertProductController);
route.post('/update', authMiddleware, updateProductController);
route.post('/delete', authMiddleware, deleteProductController);

// sales endpoint://need verifytoken
route.get('/getsales', authMiddleware, getSalesController);
route.post('/createsales', authMiddleware, createNewSaleController);
route.post('/deletesales', authMiddleware, deleteSaleController);

// client routes

route.post('/clientsignup', clientregisterController);
route.post('/client-login', clientLogin);
route.get('/client-list', clientList);

route.post('/create-order', authClientMiddleware, crateOderController);

//products

route.get('/product-list', authClientMiddleware, productList);

route.get('/order-list', authClientMiddleware, getMyOrderList);

route.get('/client-logout', async (req, res) => {
  res.clearCookie('client');
  res.status(200).json({ status: true, message: 'Logged out successfully' });
});
