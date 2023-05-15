import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from 'morgan'
import connectDB from "./config/db.js";

dotenv.config();

//database config
connectDB();

const app = express()

//middleware
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send("<h1>Welcome to my E-commerce App</h1>");
});

const PORT = process.env.PORT || 8080 // From env file

app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} mode on ${PORT}`.bgCyan.white)
})