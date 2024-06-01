import dotenv from 'dotenv'
import express from 'express';
import connectDb from './src/dbconfig/dbconnection.js';
import setUpRoutes from './src/routes/indexRoutes.js';

// dotenv config to make sure the info can be used
dotenv.config()

// connecting to our mongoDB atlas
connectDb()

// creating an instance of express and setting up the routes for our API
const app = express()
setUpRoutes(app)

app.listen(process.env.PORT, () => { console.log('Server on') }
)