const passport = require("passport");

const localStrategy = require("passport-local").Strategy;

const {employees} =require("../src/users/user-model.js");

const compPassword = require("../src/users/user-model.js");

passport.serializeUser((employees,done) => {
    done(null,employees.id);
})    //tells which data of user object need to store in session



passport.deserializeUser(async (id,done) => {
    try{
        const client = await employees.findById(id);
        done(null,client);
    }
    catch(error){
        done(error,null);
    }
})

//comparing email and password for login
passport.use('local', new localStrategy({
    usernameField:"email",
    passwordField:"pass1",
    passReqToCallback:false
},async (email,pass1,done) =>{
    try{

        console.log("username password",email,pass1);
        // if email already exists
        const emailSearch = await employees.findOne({email:email});
        if(!emailSearch){
            console.log("correct,email dose notexist in db");

            return done(null,false,{message:"Unknown user"});
        }
        else{
            console.log("correct,email exist in db",emailSearch);
        }
        console.log("pass1",pass1);
        console.log("emoloyees.pass1",emailSearch.pass1);
        //check password is correct
        const isValid =await compPassword.comparePasswords(pass1,emailSearch.pass1);
        console.log("emoloyees.pass1",emailSearch.pass1);
        console.log("isValid is ",isValid);
        if(isValid){
            console.log("employees in isValid",employees);
            return done(null,emailSearch);
        }
        else{
            console.log("login password incorrect");
            return done(null,false,{message:"Password not correct"});
        }

    }
    catch(error){
        return done(error,false);
    }
}));