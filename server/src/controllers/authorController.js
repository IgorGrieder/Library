import { author } from "../models/authorModel.js";

class AuthorController {

  // Method to get all authors
  static async getAuthor(req, res) {

    try {
      const aut = await author.find({}) // Getting all the authors
      res.status(200).json(aut) // Sending the response
    } catch (err) {
      res.status(500).json({ message: `Error: ${err.message}` }) // Sending the response if a error happens
    }
  }
}

export default AuthorController