import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { User } from "./models/userModel";
import { compare } from 'bcryptjs';
import { connectToDatabase } from "./lib/utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
  }),
  Credentials({
    name: "Credentials",
    credentials: {
      email: {
        type: "email",
        label: "Email"
      },
      password: {
        type: "password",
        label: "Password",
      }
    },
    authorize:async (credentials) =>{
      const email = credentials.email as string || undefined;
      const password = credentials.password as string || undefined;

      if(!email || !password){
        throw new Error("please provide both email and password");
      }

      await connectToDatabase();

      const user = await User.findOne({email}).select("+password");

      if(!user) throw new Error("Invalid Email and Password 1");

      if(!user.password) throw new Error("Invalid Email and Password 2")

      const isMatch = await compare(password,user.password);

      if(!isMatch) throw new Error("Invalid Email and Password 3")

      return {name:user.name, email:user.email , id:user._id};
    }
  })],
  pages:{
    signIn:'/login',
  },
  callbacks:{
    signIn:async({user,account})=>{
        if(account?.provider === 'google'){
          try {
            const {email,name,id} = user;
            await connectToDatabase();

            const alreadyuser = await User.findOne({email});
            if(!alreadyuser){
              await User.create({email,name,googleId:id});
            }

            return true;
          } catch (error) {
            throw new Error('Error  while creating user!');
          }
        }
        return false;
    }
  }
})
