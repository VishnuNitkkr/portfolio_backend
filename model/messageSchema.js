import mongoose from "mongoose";
import validator from "validator";

const messageSchema= new mongoose.Schema({

  name:{
    type:String,
    required:[true,"Name is required"],
    minLength:3,
  },
  email: { 
    type: String, 
    required: [true,"Email is required"],
    validate:[validator.isEmail,'plz provide valid email'] ,
    
  }, 
 
  phone:{
    type:String,
    required:[true,"Phone no. is required"],
    minLength:[10,'At least 10 characters should be present.']
    
    
  },
  address:{
    type:String,
    required:true
    
  },
  message:{
    type:String,
    required:true,
    minLength:3,
  }

},{timestamps:true})


export const Message=mongoose.model("Message",messageSchema);