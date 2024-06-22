import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import mongoose from "mongoose"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const connectToDatabase = async()=>{
  try{
    if(mongoose.connections && mongoose.connections[0].readyState) return;

    const {connection} = await mongoose.connect(process.env.MONGO_URL as string,{dbName:"authjs"})

    console.log(`connected to database:${connection.host}`);

  }catch(error){
    throw new Error("Error connecting to database!");
  }
}