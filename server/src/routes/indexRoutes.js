import express from 'express'
import cors from 'cors'
import booksRoutes from './booksRoutes.js'

const setUpRoutes = (app) => {
  // setting up cors and some middlewears
  app.use(cors());
  app.use(express.json());

  // setting up routes
  app.use(booksRoutes);

}

export default setUpRoutes