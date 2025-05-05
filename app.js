const express = require("express");
const mongoose = require("mongoose");
const contactsRouter = require("./routes/api/contacts");

const app = express();
const DB_URL = "mongodb+srv://larisagabrielamoldoveanu:vWAPFTRyQh0Hx8zZ@cluster0.jhbzqld.mongodb.net/ "; 

app.use(express.json());
app.use('/api/contacts', contactsRouter);

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(DB_URL); // no options needed
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};


connectToMongoDB();

module.exports = app; // Export app for use in server.js
