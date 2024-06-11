import { author } from "../models/authorModel.js";

class AuthorController {

  // Method to get all authors
  static async getAuthors(req, res) {
    try {
      const aut = await author.find({}) // Getting all the authors
      res.status(200).json(aut) // Sending the response
    } catch (err) {
      res.status(500).json({ message: `Error: ${err.message}` }) // Sending the response if a error happens
    }
  }

  // Method to get a author
  static async getAuthor(req, res) {
    const name = req.query.name
    try {
      const foundAuthor = await author.findOne({ name }) // Getting a specific author
      if (foundAuthor) {
        res.status(200).json({ found: true, foundAuthor }) // Sending the response
      } else res.status(200).json({ found: false })
    } catch (err) {
      res.status(500).json({ message: `Error: ${err.message}` }) // Sending the response if a error happens
    }
  }

  // Method to add a author
  static async addAuthor(req, res) {
    try {
      const newAut = await author.create(req.body) // Creating a author in the DB
      res.status(201).json(newAut) // Sending the response
    } catch (err) {
      res.status(500).json({ message: `Error: ${err.message}` }) // Sending the response if a error happens
    }
  }
}

export default AuthorController