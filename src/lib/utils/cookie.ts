'use server'
import { cookies } from "next/headers"

const setCookie = async(token:string, un:string, uid:string) => { 
    const cookieStore = await cookies()
    cookieStore.set('token', token)
    cookieStore.set('un', un)
    cookieStore.set('uid', uid)
}

const getCookie = async() => {
    const cookieStore = await cookies() 
    const token = cookieStore.get('token')?.value
    const un = cookieStore.get('un')?.value
    const uid = cookieStore.get('uid')?.value

    console.log("*******",token, un, uid)
    return {token, un, uid}
}

export {setCookie, getCookie}