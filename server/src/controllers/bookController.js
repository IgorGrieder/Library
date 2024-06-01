import mongoose from "mongoose";
import express from 'express';
import book from "../models/bookModel.js";

class BookController {

  // method to get all books
  static async getBooks(req, res) {

    try {
      const books = await book.find({}) // getting all the books
      res.status(200).json(books) // sending the response
    } catch (err) {
      res.status(500).json({ message: `Error: ${err.message}` }) // sendint the response if a error happens
    }
  }
}

export default BookController