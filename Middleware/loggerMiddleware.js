function logger(req,res,next){
    // console.log(`${req.method} ${req.orignalUrl}`)
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}
module.exports = logger;