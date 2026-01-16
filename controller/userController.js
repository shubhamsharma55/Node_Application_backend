const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req,res,next) => {
    
    try {
        const user = await User.create(req.body);
        res.status(201).json(user)
    } catch (error) {
        next(error);
    }
};


const getUsers = async (req,res,next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const sort = req.query.sort || "-createdAt";
        const skip =(page - 1) * limit;
        let filter = {};

        if (req.query.search) {
        filter.name = { $regex: req.query.search, $options: "i" };
        }

        if (req.query.role) {
        filter.role = req.query.role;
        }

        const users = await User.find(filter).skip(skip).limit(limit).sort(sort);
        const total = await User.countDocuments(filter);

        res.status(200).json({
            users,
            total,
            page,
            totalPages:(total/limit)
        });
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req,res,next) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({
                msg:"User Not Found"
            });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req,res,next) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new : true}
        );
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

const deleteuser = async (req,res,next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "User deleted"
        });
    } catch (error) {
        next(error);
    }
};

const registerUser = async (req,res,next) => {
    try {
        const {name, email, password} = req.body;
        
        const hasPassword = await bcrypt.hash(password,10);
        

        const user = await User.create({
            name,
            email,
            password:hasPassword
        });

        res.status(201).json({
            data:{
                Name:user.name,
                Email:user.email
            },
            message:"User Register Successfully"
        });
    } catch (error) {
        next(error);
    }
};

const userLogin = async (req,res,next) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"Invalid Credentials"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        
        if(!isMatch){
            return res.status(401).json({message:"Invalid Credentials"});
        }
        const tokens = generateTokens(user._id,user.role);
        console.log(tokens);
        // return false;
        user.refreshtoken = tokens.refresh_token
        await user.save();

        return res.status(200).json(tokens);
    } catch (error) {
        next(error);
    }
};

const generateTokens = (userID,role) => {
    const access_token =jwt.sign(
        {id:userID,role},
        process.env.JWT_SECRET,
        {expiresIn:"15m"}
    );

    const refresh_token = jwt.sign(
        {id:userID},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn:"7d"}
    );
    return{access_token,refresh_token};
};

const refreshToken = async (req,res)=>{
    const{token}=req.body;

    if(!token) return res.status(401).json({message:"no token provide"});
    try {
        const decode = jwt.verify(token,process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decode.id);
        if(!user || user.refreshtoken !== token){
            return res.status(400).json({message:"Invalid Refresh token"});
        }

        const accesstoken = jwt.sign(
            {id:user.id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"15m"}
        );
        res.json({accesstoken});

    } catch (error) {
        res.status(403).json({ message: "Token expired" });
    }
}

module.exports ={
    getUsers,getUserById,createUser,updateUser,deleteuser,registerUser,userLogin,generateTokens,refreshToken
};