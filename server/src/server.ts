import express, { Application, Request, Response, urlencoded } from 'express';
const dotenv = require('dotenv').config()
const connectDB = require('../config/db.js')
const port = process.env.PORT || 5000

connectDB()

const app: Application = express();

// Middleware for accessing body data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/entries', require('../routes/entryRoutes.js'))

app.listen(port, () => console.log(`server running on ${port}`));