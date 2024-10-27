const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { adminLogin } = require('./controller/auth');
const Admin = require('./routes/auth');
const Blog = require('./routes/blog');
require('dotenv').config();
//connect to database
connectDB();


app.use(express.json());
 app.use(cors());
app.use(cookieParser());
//define routes
app.use('/api', Admin);
app.use('/api/blog',Blog);


//listen for requests
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;