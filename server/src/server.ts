import express, { Application } from 'express';
const dotenv = require('dotenv').config()
const cors = require('cors')
const connectDB = require('../config/db.js')
const port = process.env.PORT || 5000

connectDB()

const app: Application = express();

// Middleware for accessing body data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const allowedOrigins = ['https://keep-english.onrender.com']
const corsOptions = {
    origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }

app.use(cors(corsOptions));

// app.use(cors());


app.use('/api/entries', require('../routes/entryRoutes.js'))

app.use('/api/user', require('../routes/userRoutes.js'))

app.listen(port, () => console.log(`server running on ${port}`));