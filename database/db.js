import mongoose from 'mongoose';

export const connectDB = async()=>{
    try {
      const res= await mongoose.connect(process.env.MONGO_URI);

      if(res){
        console.log('connected to mongodb');
      }
      else{
        console.log('error in connecting to mongodb')
      }

    } catch (error) {
      console.log(`error in mongodb ${error}`)
    }
}