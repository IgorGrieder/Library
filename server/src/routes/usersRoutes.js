import express from 'express';
import UserController from '../controllers/userController.js';

const usersRoutes = express.Router() // Creating a router

usersRoutes.get("/signIn", UserController.validateUser); // Route to validate the user

export default usersRoutes