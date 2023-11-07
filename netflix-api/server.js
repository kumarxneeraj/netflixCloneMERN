require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/UserRoutes");

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("DB Connected");
    })
    
    app.use("/api/user", userRoutes);


app.listen(5000, console.log("server starred at 5000"));