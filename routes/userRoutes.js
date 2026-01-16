const express = require("express");
const routes =express.Router();
const rateLimit = require("express-rate-limit");
const auth = require("../Middleware/authMiddleware");
const allowedRoles = require("../Middleware/userRoleMiddleware");
const upload = require("../Middleware/uploadMiddleware");
// User validation
const validate = require("../Middleware/validationMiddleware");
const {getUsers,getUserById,createUser,updateUser,deleteuser,registerUser,userLogin,generateTokens} = require("../controller/userController");
const uploadImage = require("../controller/uploadController");

const {registerValidation, loginValidation, userIdValidation} = require("../validators/userValidator");

// limiter for login
const loginLimiter = rateLimit({
    windowMs:15 * 60 * 1000,
    max:10,
    message:"ristrict to logIn to manny requests hit from you"
});

routes.get("/users",getUsers);
routes.post("/users",createUser)
routes.get("/users/:id", userIdValidation, validate, getUserById);
routes.put("/updateuser/:id",updateUser);
routes.delete("/deleteuser/:id",deleteuser);

// Register User
routes.post("/register_user", registerValidation, validate, registerUser);
routes.post("/login", loginValidation, validate, loginLimiter, userLogin);

// Protected Routes
routes.get("/profile", auth,(req,res) => {
    res.status(200).json({
        user:req.user.id,
        message:"Welcome user"
    });
});

routes.get('/admin-dashboard',
    auth,
    allowedRoles("Admin"),
    (req,res) => {
        res.status(200).json({message:"Welcome Admin"});
    }
);

routes.get("/user-profile",
    auth,
    allowedRoles("Admin","User"),
    (req,res) => {
        res.status(200).json({message:"User Profile"});
    }
);


//upload image
routes.post(
    "/upload",
    auth,
    upload.single("image"),
    uploadImage
);

// End protected routes(which route have param=auth)

module.exports = routes;