import express from 'express'
import BookController from '../controllers/bookController.js';

const booksRoutes = express.Router() // Creating a router

booksRoutes.get("/books", BookController.getBooks); // Route to get all the books once the app starts
booksRoutes.post("/books", BookController.addBook); // Route to add a book
booksRoutes.get("/books/seacrh", BookController.getBook); // Route to get a the books

export default booksRoutes