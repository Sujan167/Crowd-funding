const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

// import { v2 as cloudinary } from "cloudinary";
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
cloudinary.config({
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET,
});
module.exports = cloudinary;
// // -------------------------------------------------------------------

// // Function to upload a file to Cloudinary
// const uploadOnCloudinary = async (localFilePath) => {
// 	try {
// 		if (!localFilePath) return null;
// 		const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" });
// 		console.log("File uploaded to Cloudinary:", response.url);
// 		return response;
// 	} catch (error) {
// 		console.error("Cloudinary upload failed:", error.message);
// 		fs.unlinkSync(localFilePath); // Remove the locally saved file as the upload has failed
// 		return null;
// 	}
// };

// module.exports = uploadOnCloudinary;

// const cloudinary = require("cloudinary").v2;

// // Configure Cloudinary with your credentials
// cloudinary.config({
// 	cloud_name: CLOUDINARY_CLOUD_NAME,
// 	api_key: CLOUDINARY_API_KEY,
// 	api_secret: CLOUDINARY_API_SECRET,
// });

// // Function to upload file to Cloudinary
// const uploadToCloudinary = (filePath) => {
// 	return new Promise((resolve, reject) => {
// 		cloudinary.uploader.upload(filePath, (error, result) => {
// 			if (error) {
// 				reject(error);
// 				console.log(`\n\nerror:: ${error} ----- \n\n`);
// 			} else {
// 				resolve(result);
// 				console.log(`\n\nresult:: ${result} ----- \n\n`);
// 			}
// 		});
// 	});
// };

// module.exports = { uploadToCloudinary };
