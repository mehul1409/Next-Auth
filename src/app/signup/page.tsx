import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { User } from '@/models/userModel'
import { hash } from 'bcryptjs'
import { redirect } from 'next/navigation'
import { connectToDatabase } from '@/lib/utils'
import { signIn } from '@/auth'

const page = () => {
    return (
        <div className='flex justify-center items-center'>
            <Card>
                <CardHeader>
                    <CardTitle className='flex justify-center'>Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={async (formData : FormData) =>{
                        'use server';

                        const name = formData.get('name') as string | undefined;
                        const email = formData.get('email') as string | undefined;
                        const password = formData.get('password') as string | undefined;

                        if(!name || !email || !password){
                            throw new Error("All fields are required!");
                        }

                        await connectToDatabase();

                        const user = await User.findOne({email});
                        if(user) throw new Error("user already exist!");

                        const hasedPassword = await hash(password,10);

                        await User.create({
                            name,
                            email,
                            password:hasedPassword,
                        })

                        redirect('/login')

                    }} className='flex flex-col gap-2'>
                        <Input placeholder='name' name='name'/>
                        <Input type='email' placeholder='Email' name='email'/>
                        <Input type='password' placeholder='Password' name='password'/>
                        <Button type='submit' variant="outline">Signup</Button>
                    </form>
                </CardContent>
                <CardFooter className='flex flex-col gap-2'>
                    <form action={async()=>{
                        'use server';
                        await signIn('google');
                    }}>
                        <Button type='submit'>Login with google</Button>
                    </form>
                    <Link href='/login'>Already have an account</Link>
                </CardFooter>
            </Card>

        </div>
    )
}

export default page

