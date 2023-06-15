import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/src/libs/auth";
import jwtDecode from "jwt-decode";


export async function middleware(req: NextRequest) {
    const token:any = req.cookies.get('user-token')?.value
    const tokenData: any = token === undefined ? undefined : jwtDecode(token, {header: true}) 

    const verifyToken = token && (await verifyAuth(token).catch((err) => {
        console.log(err)
    }))
    
    const { pathname } = req.nextUrl;

    if (!verifyToken && pathname === "/") return NextResponse.redirect(new URL('/authentication/login', req.url))
    if (!verifyToken && pathname === "/settings") return NextResponse.redirect(new URL('/authentication/login', req.url))
    
    if (!verifyToken && pathname.includes('/admin') && !tokenData?.isAdmin ) return NextResponse.redirect(new URL('/authentication/login', req.url))
    
    if (verifyToken && pathname.includes('/admin') && !tokenData?.isAdmin ) return NextResponse.redirect(new URL('/', req.url))

    if(pathname.startsWith('/authentication/login') && !verifyToken) return;

    if(pathname.includes('/authentication/login') && verifyToken) return NextResponse.redirect(new URL('/', req.url))

}

export const config = {
    matcher: ['/', '/settings', '/admin/:path*', '/authentication/:path*']
}