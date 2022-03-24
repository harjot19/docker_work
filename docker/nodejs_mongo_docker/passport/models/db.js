//file for database connection

console.log("inside models file ");
const mongoose = require("mongoose");
mongoose.set('runValidators', true); // here is your global setting

mongoose.connect('mongodb://db_container:27017/passport_authenticatin',{useNewUrlParser : true,useUnifiedTopology: true},(err) => {
    if(!err) {console.log("MongoDB connection successful")}
    else{ console.log("error is ",err)}
});

require('../src/users/user-model');   //including employees model in database connection fileData