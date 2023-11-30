const functions = require('firebase-functions');
const express = require('express');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

// Configure Cloudinary with your cloud credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cors());
// Use express-fileupload middleware for handling file uploads
app.use(fileUpload());

// Define a route for file uploads
app.post('/upload', async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.comprobante; // 'file' is the name attribute in your form
    const { data } = file
    // Upload file to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: 'auto', folder: 'Vanellus' }, async (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }).end(data);
    });


    // Return the Cloudinary URL of the uploaded file
    res.json(result?.url);
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3002, () => console.log(`listening 3002`))

exports.app = functions.https.onRequest(app);
