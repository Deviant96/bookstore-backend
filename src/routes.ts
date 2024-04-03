import express from 'express';
import * as authController from './controllers/auth.controller';
import * as orderController from './controllers/order.controller';
import * as bookController from './controllers/book.controller';

const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

router.post('/user/get', authController.getCurrentUserData);

router.post('/order', orderController.placeOrder);
router.post('/cancelorder', orderController.cancelOrder);
router.post('/listorder', orderController.listOrders);

router.post('/books', bookController.createBook);
router.get('/books/:id', bookController.getBookById);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);
router.get('/books', bookController.listBooks);

export default router;
