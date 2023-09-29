"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDB = require('../config/db.js');
const port = process.env.PORT || 5000;
connectDB();
const app = (0, express_1.default)();
// Middleware for accessing body data
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const allowedOrigins = ['https://keep-english.onrender.com', 'https://keep-english-api.onrender.com'];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
app.use(cors(corsOptions));
// app.use(cors());
app.use('/api/entries', require('../routes/entryRoutes.js'));
app.use('/api/user', require('../routes/userRoutes.js'));
if (process.env.NODE_ENV === 'production') {
    const __dirname = path_1.default.resolve();
    app.use(express_1.default.static(path_1.default.join(__dirname, 'client', 'build')));
    app.get('*', (req, res) => res.sendFile(path_1.default.resolve(__dirname, 'client', 'build', 'index.html')));
}
else {
    app.get('/', (req, res) => res.send('Server is ready'));
}
app.listen(port, () => console.log(`server running on ${port}`));
