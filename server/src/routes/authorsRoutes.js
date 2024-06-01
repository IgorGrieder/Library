import express from 'express'
import AuthorController from '../controllers/authorController.js';

const authorsRoutes = express.Router() // Creating a router

authorsRoutes.get("/authors", AuthorController.getAuthors); // Route to get all the authors once the app starts
authorsRoutes.post("/authors", AuthorController.addAuthor); // Route to add a author 
authorsRoutes.get("/authors/search", AuthorController.getAuthor) // Route to get a author

export default authorsRoutes