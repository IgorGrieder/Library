import express from 'express'
import BookController from '../controllers/bookController.js';

const booksRoutes = express.Router() // Creating a router

booksRoutes.get("/books", BookController.getBooks); // Route to get all the books once the app starts

export default booksRoutes