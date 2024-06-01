import express from 'express'
import BookController from '../controllers/bookController.js';

const booksRoutes = express.Router() // creating a router

booksRoutes.get("/", BookController.getBooks); // route to get all the books once the app starts

export default booksRoutes