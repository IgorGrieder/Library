import express from 'express'
import cors from 'cors'
import booksRoutes from './booksRoutes.js'
import authorsRoutes from './authorsRoutes.js'

const setUpRoutes = (app) => {

  const corsOps = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }
  // Setting up cors and some middlewears
  app.use(cors(corsOps));

  // Middleware to parse JSON and URL-encoded data
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Setting up routes
  app.use(booksRoutes);
  app.use(authorsRoutes);

  app.use('/not-found', (req, res) => {
    res.send('404 - Not found')
  })

  // 404 Error Handling Middleware
  app.use((req, res) => {
    res.redirect('/not-found');
  });
}

export default setUpRoutes