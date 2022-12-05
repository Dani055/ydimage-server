const dotenv = require('dotenv').config()
var express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 9999;
var app = express();
const cors = require('cors');
const feedRoutes = require("./routes/feed");
const multer = require('multer');


app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization', 'Content-Type: multipart/form-data');
  next();
});

app.use('/images', express.static('images'))
app.use('/feed', feedRoutes);

// General error handling
app.use((error, req, res, next) => {
    if(error instanceof multer.MulterError){
      if(error.code == "LIMIT_FILE_SIZE"){
        return res.status(500).json({
          message: "One of the files is too large. Upload canceled"
        })
      }
      else if(error.code == "LIMIT_FILE_COUNT"){
        return res.status(500).json({
          message: "Selected too many files for upload. Upload canceled"
        })
      }
    }
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
    console.log(message);
    next();
});

app.listen(port, () => { console.log(`REST API listening on port: ${port}`) });