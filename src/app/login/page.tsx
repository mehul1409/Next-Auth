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
import { auth, signIn } from '@/auth'
import { CredentialsSignin } from 'next-auth'
import { redirect } from 'next/navigation'

const page =async () => {

    const session = await auth();
    if(session?.user) redirect('/');

    const loginhandler = async (formData : FormData) =>{
         'use server';              
        const email = formData.get('email') as string | undefined;
        const password = formData.get('password') as string | undefined;

       try{
        await signIn('credentials',{
            email,password
        });

       }catch(error){
        const err = error as CredentialsSignin;
        return err.message;
       }

    }

    return (

        <div className='flex justify-center items-center'>
            <Card>
                <CardHeader>
                    <CardTitle className='flex justify-center'>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={loginhandler}
                     className='flex flex-col gap-2'>
                        <Input type='email' placeholder='Email'name='email' />
                        <Input type='password' placeholder='Password'name='password' />
                        <Button type='submit' variant="outline">Login</Button>
                    </form>
                </CardContent>
                <CardFooter className='flex flex-col gap-2'>
                    <form action={async()=>{
                        'use server';
                        await signIn('google');
                    }}>
                        <Button type='submit'>Login with google</Button>
                    </form>
                    <form action={async()=>{
                        'use server';
                        await signIn('github');
                    }}>
                        <Button type='submit'>Login with github</Button>
                    </form>
                    <Link href='/signup'>Don't have an account</Link>
                </CardFooter>
            </Card>

        </div>
    )
}

export default page

