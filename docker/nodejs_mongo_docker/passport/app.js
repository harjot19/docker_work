require("./models/db");

require('dotenv').config();

const express = require("express");

const swig = require("swig-security-fix");

const bodyParser = require("body-parser");




const cookieParser = require("cookie-parser");

const session =require("express-session");

const flash =require("connect-flash");

const passport = require("passport");

const alert = require('alert'); 

const mongoose = require("mongoose");

const path = require('path');



require("./config/passport.js");

// mongoose.Promise = global.Promise;



let app = express();

app.use('/public',express.static('public'));
app.use(express.static(path.join(__dirname,'public')));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','html');
app.engine('html',swig.renderFile);



app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

app.use(cookieParser());

app.use(session({
    cookie: {maxAge: 24*60*60*1000},
            secret:"secret",
            saveUninitialized:false,
            resave:false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use((req,res,next) => {
    res.locals.success_messages = req.flash('success');
    res.locals.error_messages = req.flash('error');
    // res.locals.isAuthenticated = req.user ? true : false;
    next();
});



const route = require("./src/users/user-route.js");  //aquiring routes

app.use('/',route);

app.listen(process.env.PORT,() => {
    console.log("server is running");
})