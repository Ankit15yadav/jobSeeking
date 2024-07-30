const cloudinary = require("cloudinary").v2;

exports.uploadImageToCloud = async (file, folder, height, quality) => {
    const options = { folder, resource_type: 'raw' };
    //resume upload krne k lie


    if (height) {
        options.height = height;
    }
    if (quality) {
        options.quality = quality;
    }

    options.resource_type = "auto";

    return await cloudinary.uploader.upload(file.tempFilePath, options,
    );
}