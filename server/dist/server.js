"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = require('dotenv').config();
const connectDB = require('../config/db.js');
const port = process.env.PORT || 5000;
connectDB();
const app = (0, express_1.default)();
app.use('/api/entries', require('../routes/entryRoutes.js'));
app.listen(port, () => console.log(`server running on ${port}`));
