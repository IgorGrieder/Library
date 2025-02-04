import dotenv from 'dotenv'
import express from 'express';
import connectDb from './src/dbconfig/dbconnection.js';
import setUpRoutes from './src/routes/indexRoutes.js';

// Dotenv config to make sure the info can be used
dotenv.config()

// Connecting to our mongoDB atlas
connectDb()

// Creating an instance of express and setting up the routes for our API
const app = express()
setUpRoutes(app)

app.listen(process.env.PORT, () => { console.log('Server on') }
)