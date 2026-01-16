const cloudinary = require("../config/cloudinary");
const User = require("../Models/User");
const fs = require("fs");

const uploadImage = async (req,res,next) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path,{
            folder:"node_uploads"
        });
        fs.unlinkSync(req.file.path);

        // get logged-in user
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.image = result.secure_url;
        await user.save();

        res.status(200).json({
            image:result.secure_url
        });
    } catch (error) {
        next(error);
    }
};
module.exports=uploadImage;