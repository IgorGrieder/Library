import express from 'express';
import UserController from '../controllers/userController.js';

const usersRoutes = express.Router(); // Creating a router

usersRoutes.get('/signIn', UserController.validateUser); // Route to validate the user
usersRoutes.patch('/cart/address', UserController.addAddress); // Route to add a new address to the user
usersRoutes.patch('/cart/payment', UserController.addPayment); // Route to add a new payment method to the user
export default usersRoutes;
