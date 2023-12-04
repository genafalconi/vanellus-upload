const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
dotenv.config({path: "../.env"});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (req, res, comprobante) => {
  const {buffer} = comprobante;
  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
        {resource_type: "auto", folder: "Vanellus"},
        async (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }).end(buffer);
  });

  return result.url;
};

module.exports = uploadImage;
