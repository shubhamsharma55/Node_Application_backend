function errorMidl(err,req,res,next){
    console.log(err.message);

    res.status(500).json({
        status :false,
        message:err.message
    });
};

module.exports = errorMidl;