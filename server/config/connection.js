require("dotenv").config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/tdd-todo_db', {});

module.exports = mongoose.connection;