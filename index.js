const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const uploadImage = require("./src/uploadImage.js");
const app = express();
const fileMiddleware = require("express-multipart-file-parser");

dotenv.config({path: ".env"});

app.use(cors());
app.use(express.json({limit: "25mb"}));
app.use(express.urlencoded({limit: "25mb"}));
app.use(fileMiddleware);

app.post("/upload", async (req, res) => {
  const comprobante = req.files[0];
  const response = await uploadImage(req, res, comprobante);
  res.json(response);
});

exports.uploader = functions.https.onRequest(app);
