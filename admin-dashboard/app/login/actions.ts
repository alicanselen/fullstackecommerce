'use server';

import { login, signup } from "@/api/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handlelogin(email:string , password:string) {
    let redirectURL = `/login?errorMessage=${encodeURIComponent('Giris Yapma Basarisiz')}`;
    try {
        const res = await login(email , password);
        
        cookies().set('token' , res.token);
        redirectURL = '/dashboard'

        console.log(res);
    } catch (error) {
        console.log(error);
    }
    finally{
        redirect(redirectURL);
    }
}

export async function handleSignUp(email:string , password:string) {
    let redirectURL = `/login?errorMessage=${encodeURIComponent(
        'Kayit Olurken Bir Sorun Olustu'
    )}`;
    try {
        const res = await signup(email , password);
        
        cookies().set('token' , res.token);
        redirectURL = '/dashboard'

        console.log(res);
    } catch (error) {
        console.log(error);
    }
    finally{
        redirect(redirectURL);
    }
}