import express from 'express';
import dotenv from "dotenv";
import morgan from 'morgan';
import cors from 'cors'
import {connectDB} from './database/db.js';
import {Message} from './model/messageSchema.js';


const app=express();

dotenv.config();

//mongo connection
connectDB();

//middlewares
app.use(cors({
  origin:[process.env.FRONTEND_URL],
  methods:['POST'],
  credentials:true
}))
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, application/json');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // If you need to send cookies
  next();
});
//router
app.post('/api/v1/message',async(req,res)=>{
   try {
    const {name,email,phone ,address,message}=req.body;
    if(!name||!email||!phone||!address||!message){
      return res.status(400).json({
        success:false,
        message:"Please provide all Fields"
      })
    }

   const data=await Message.create({name,email,phone ,address,message});

   if(!data){
    return res.status(500).json({
      success:false,
      message:'internal server error'
    })
   }

   res.status(200).json({
    success:true,
    message:'Message sent successfully'
   })


   } catch (error) {
    console.log(`Error in sending message=> ${error}`);
    return res.status(404).json({
      success:false,
      message:error
    })
    
   }
})


//server

const port =process.env.PORT;

app.listen(port,()=>{
  console.log(`server is running at port no. ${port}`);
})




