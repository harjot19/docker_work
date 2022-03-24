
const mongoose = require("mongoose");

//including schema 
const {employees} = require("./user-model.js");

//including hash function
const hashFunction = require("./user-model.js");

require("../../config/passport.js");
//creating class for all functions
class User{

        insertDetails = async(body) => {

            try{   
                //check if email entered already exist
                let emailExist = await employees.find({email:body.email});
                if(emailExist.length > 0){
                    return Promise.reject({error:"email already exist,Please try with some other email"});
                }
                
                //check if phone number entered already exist
                let phoneExist = await employees.find({phone:body.phone});
                if(phoneExist.length > 0){
                    return Promise.reject({error:"phone number already exist,Please try with some other phone number"});
                }

                console.log("body is in contoller",body);

                //hash the password
                const hash = await hashFunction.hashPassword(body.pass1);
                console.log("passowrd hashed is  ",hash);


                delete body.pass2;   //no need to store confirm passowrd in database
                body.pass1 = hash   //for  hashed password in database

                console.log("body after hasshing is ",body);

                // let employeeInsert = new employeeDetails();
                let clients = await new employees(body);
                await clients.save();
                return Promise.resolve(clients);
            }
            catch(err){
                console.log("error inserting ",err);
                if(err instanceof mongoose.Error.ValidationError ){
                    console.log('error.validationError occurss');
                    this.handleValidationError(err,body);
                    
               
                }
                else  // if non- mongoose vaidation eror occurs
                console.log("Error inserting record in database  " + err);
                return Promise.reject(err);
            }    
      }

       
        //function for handling mongoose validation errors
        handleValidationError(err,body){
            for(let field in err.errors){
                switch(err.errors[field].path){
                    case 'fullName':
                        body['fullNameError'] = err.errors[field].message;
                        break;

                    case 'email' :
                        body['emailError'] = err.errors[field].message;
                        break;   

                    case 'dob':
                        body['dobError'] = err.errors[field].message;
                        break;

                    case 'phoneCode' :
                        body['phoneCodeError'] = err.errors[field].message;
                        break;  

                    case 'phone' :
                        body['phoneError'] = err.errors[field].message;
                        break;  

                    case 'address1':
                        body['address1Error'] = err.errors[field].message;
                        break;

                    case 'address2' :
                        body['address2Error'] = err.errors[field].message;
                        break;    

                    case 'city':
                        body['cityError'] = err.errors[field].message;
                        break;

                    case 'state' :
                        body['stateError'] = err.errors[field].message;
                        break;   
                        
                    case 'zipCode' :
                        body['zipCodeError'] = err.errors[field].message;
                        break;  
 
                    default:
                        break;       
                }
            }
        }

        //list route for showing user's details enetered according to their update time

        listDetails = async() => {
            try{

               let list = await employees.find({}).sort({updated_at:-1});  //sorrting according to updatiion date and time
                    
                    return Promise.resolve(list);        
            }  
            catch(err){
                    console.log("err listing",err);
                    return Promise.reject(err);
                }       
        }

        //edit function to update details of user
        editDetails = async(id) => {
            //finding user to update by id present in url
            try{
                let editUser = await employees.findById(id);
                console.log("editUser",editUser);
                return Promise.resolve(editUser);
                    i
            }  
            catch(err){
                return Promise.reject(err);
            }  
              
        }

        //update data function

        updateRecord = async(body) => {
            try{
               
                console.log("inside update the body is ",body);
                
                ///check if email entered already exist
                let emailExist = await employees.find({$and:[{email:body.email},{_id:{$ne:body._id}}]});  //and condition of mongoose
                
                if(emailExist.length > 0){
                    return Promise.reject({error:"email already exist,Please try with some other email"});
                }


                //check if phone number entered already exist
                let phoneExist = await employees.find({$and:[{phone:body.phone}, {_id:{$ne:body._id}}]});  //and condition of mongoose
                if(phoneExist.length > 0){
                     return Promise.reject({error:"phone number already exist,Please try with some other phone"});
                 }    
                 
                //update user data in database 
                let updateUser = await employees.findByIdAndUpdate(
                {_id:body._id}, body,{new:true});        
                return Promise.resolve(updateUser);        
            }
            catch(err){
                //if mongoose validation error occurs
                if(err instanceof mongoose.Error.ValidationError ){
                    console.log('error.validationError occurs');
                    this.handleValidationError(err,body);
           
                }
                else  //if non mongoose validation error occurs
                console.log("error  while updating is ",err);
                return Promise.reject(err);

            }        
                   
                    
        }

        //delete route function

        
        deleteUser = async(id) => {
            try{
                let deleteUser = await employees.findByIdAndRemove(id);
                console.log('user deleted is ',deleteUser)
                return Promise.resolve(deleteUser);
            } 
            catch(err){
                return Promise.reject(err);
            }   
    
        }

}  // class ends



module.exports = User;   //exporting User class
