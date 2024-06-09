import { author } from "../models/authorModel.js";
import { book } from "../models/bookModel.js";

class BookController {

  // Method to get all books
  static async getBooks(req, res) {
    try {
      const books = await book.find({}) // Getting all the books
      res.status(200).json(books) // Sending the response
    } catch (err) {
      res.status(500).json({ message: `Error: ${err.message}` }) // Sending the response if a error happens
    }
  }

  // Method to get a book
  static async getBook(req, res) {
    const name = req.query.name
    try {
      const foundBook = await book.findOne({ name }) // Getting a specific book
      if (foundBook) {
        res.status(200).json({ found: true, foundBook }) // Sending the response
      } else res.status(200).json({ found: false })
    } catch (err) {
      res.status(500).json({ message: `Error: ${err.message}` }) // Sending the response if a error happens
    }
  }

  // Method to add a book
  static async addBook(req, res) {
    const reqBody = req.body
    try {
      const autFound = await author.findById(reqBody.author) // Getting the author related to the ID
      const newBook = { ...reqBody, author: { ...autFound } } // Creating the object 
      const createdBook = await book.create(newBook)
      res.status(201).json(createdBook) // Sending the response
    } catch (err) {
      res.status(500).json({ message: `Error: ${err.message}` }) // Sending the response if a error happens
    }
  }
}

export default BookController