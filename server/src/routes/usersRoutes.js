import express from 'express';
import UserController from '../controllers/userController.js';

const usersRoutes = express.Router(); // Creating a router

usersRoutes.get('/login', UserController.validateUser); // Route to validate the user
usersRoutes.get('/signIn', UserController.hasUser); // Route to check user in Sign In
usersRoutes.patch('/cart/address', UserController.addAddress); // Route to add a new address to the user
usersRoutes.patch('/cart/payment', UserController.addPayment); // Route to add a new payment method to the user
usersRoutes.post('/signIn', UserController.addUser); // Route to add a new user
export default usersRoutes;
