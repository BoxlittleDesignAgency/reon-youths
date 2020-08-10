const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');


const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');const expressJwt = require('express-jwt');
const expressValidator = require('express-validator');

const dotenv = require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8081;

//db
//connect to mongoose options
const connectDBWithRetry = require('./config/db');

connectDBWithRetry();

// middleware

app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(bodyParser.json());
app.use(cors());


//bring in routes
const authRoutes = require('./routes/api/auth');
const userRoutes = require('./routes/api/user');
const postRoutes = require('./routes/api/post');
const profileRoutes = require('./routes/api/profile');
const siteRoutes = require('./routes/api/site');

// app.get('/ping', (req, res) => {
//   res.send('ping pong');
// });

app.use("/api",
  expressJwt({
    credentialsRequired: true,
    secret: process.env.JWT_SECRET,
    requestProperty: 'user',
    userProperty: 'user'
  })
);

// apiDocs
app.get('/api', (req, res) => {
  fs.readFile('docs/apiDocs.json', (err, data) => {
    if (err) {
      res.status(400).json({
        error: err
      });
    }

    const docs = JSON.parse(data);
    res.json(docs);
    res.end();
  });
});

//add custom routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', profileRoutes);
app.use('/api', siteRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    // res.end();
  });
}

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Unauthorized FROM SERVER!' });
  }
});

app.listen(PORT, () => {
  console.log(`A Node Js API is listening on port: ${PORT}`);
});
