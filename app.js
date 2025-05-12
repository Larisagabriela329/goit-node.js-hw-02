const express = require("express");
const mongoose = require("mongoose");
const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");
require('dotenv').config();

const app = express();
const DB_URL = process.env.DB_URL;

app.use(express.json());
app.use('/api/contacts', contactsRouter);
app.use('/users', usersRouter);

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(DB_URL); 
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};


connectToMongoDB();

module.exports = app; // Export app for use in server.js
