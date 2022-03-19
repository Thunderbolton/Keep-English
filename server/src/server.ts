import express, { Application, Request, Response } from 'express';
const dotenv = require('dotenv').config()
const connectDB = require('../config/db.js')
const port = process.env.PORT || 5000


connectDB()

const app: Application = express();

app.use('/api/entries', require('../routes/entryRoutes.js'))

app.listen(port, () => console.log(`server running on ${port}`));