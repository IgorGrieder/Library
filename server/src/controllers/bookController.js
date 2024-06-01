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
}

export default BookController