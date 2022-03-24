const mongoose = require('mongoose');

const bcrypt = require("bcryptjs");

let employeeSchema = new mongoose.Schema({
        fullName:{
            type:String,
            // required: 'Name is required',
            // match:[/^[A-z a-z]{2,30}$/, "please fill valid Name"],
            // trim:true,
            // default:''

        },
    
        email:{
            type:String  ,
            // required: 'Email address is required',
            // match:[/^[A-za-z0-9._]{3,100}@[A-za-z]{1,10}[.]{1}[A-za-z]{1,10}$/, 'Please fill a valid email address'], //match regex   //length
            // trim:true,
            // default:''
        },
        
        phoneCode:{
            type:String,
            // required:"Please fill Country code",
            // match:[/^[+]{1}[1-9]{2,3}$/,"Please fill valid Country code"],
            // trim:true,
            // default:''
        },
        pass1:{
            type:String,
        },
        pass2:{
            type:String,
        },      
        phone:{
            type:String,
            // required:"Please fill Phone number",
            // match:[/^[1-9]{1}[0-9]{9,9}$/,"Please fill valid Phone number"],
            // trim:true,
            // default:''
        },
        dob:{
            type:String,
            // required:"Please fill date of birth",
            // trim:true,
            // default:''
        },
        address1:{
            type:String,
            // required:"Please fill Address line 1",
            // trim:true,
            // default:''

        },
        address2:{
            type:String,
            // required:"Please fill Address line 2",
            // trim:true,
            // default:''
        },
        city:{
            type:String,
            // required:"Please fill City",
            // match:[/^[A-z a-z]{2,15}$/, "please fill valid city"],
            // trim:true,
            // default:''
        },
        state:{
            type:String,
            // required:"Please fill State",
            // match:[/^[A-z a-z]{2,15}$/, "please fill valid state"],
            // trim:true,
            // default:''
        },
        zipCode:{
            type:String,
            // required:"Please fill Zipcode",
            // match:[/^[1-9]{1}[0-9]{5,5}$/, "please fill valid zipCode"],
            // trim:true,
            // default:''
        }
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


//registering schema under mongoose and exporting

module.exports = {employees:mongoose.model('employees',employeeSchema)}

module.exports.hashPassword = async (pass1) => {
    try{
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(pass1,salt);
    }
    catch(err){
        throw new Error('Hashinf failed'  , err);
    }
}

module.exports.comparePasswords = async(inputPassword,hashedPassword) =>{
    try{
        return await bcrypt.compare(inputPassword,hashedPassword);
    }
    catch(error){
        throw new Error("comparison failed",error);
    }
}