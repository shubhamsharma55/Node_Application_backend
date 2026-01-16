const express = require("express");
const logger = require("./Middleware/loggerMiddleware");
const errorHandler = require("./Middleware/errorMiddleware");
const userRoutes = require('./routes/userRoutes');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

const app =express();
app.disable("x-powered-by");
// middleware

//helmet
app.use(helmet()); // 🪖 Helmet ON (security headers)
// app.use(
//   helmet({
//     contentSecurityPolicy: false, // dev me kabhi kabhi disable karte hain
//   })
// );
// helmet End

app.use(express.json());
// app.use(mongoSanitize()); //👈MongoDB injection protection
// app.use(
//   mongoSanitize({
//     sanitizeFilter: true   // 👈 IMPORTANT
//   })
// );
app.use(logger);

const limiter = rateLimit({
    windowMs:15 * 60 * 1000, //15 min
    max:100, //15 min only 100 hit providing 
    message: "To many request,try again later"
});

// cors for origan access
// app.use(cors()); //👈 CORS enabled
app.use(cors({
    origin:"http://localhost:3000",
    methods:["GET,POST,PUT"],
    credentials:true
}));


// routes
app.use('/api',userRoutes);

app.get("/",(req,res) => {
    res.send("Hello Shubham");
});


app.use(errorHandler);
module.exports = app;