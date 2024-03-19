require('dotenv').config();
const express = require('express')
const cors = require("cors")
const routes = require("./src/routes/routes")
const connectDb = require("./src/config/db")
const path = require('path')
const { config } = require('dotenv')
const app = express()

let contentPath2 = `${process.cwd()}/src/assets`; 

// middleware
app.use(express.json());
app.use(cors());

// database connection
connectDb()

// routes
app.use("/api", routes) 
app.use("/api/graph", express.static(contentPath2));

app.listen(process.env.PORT, () => console.log(`Example app listening on PORT ${process.env.PORT}!`))