import { NextResponse } from 'next/server';

export async function middleware(request) {
    console.log('middleware', request.cookies.get('token'));
    const req_cookies = request.cookies.get('token');
    console.log("req_cookies", req_cookies, req_cookies['value'])
    console.log("req_cookies", Object.keys(req_cookies))
    const token = request.cookies["token"];


    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        const res = await fetch('https://myportfolio-henna-six.vercel.app/api/auth/protected', {
            headers: {
                Authorization: token,
            },
        });
        console.log(res.status);

        if (!res.ok) {
            throw new Error('Token validation failed');
        }

        return NextResponse.next();
    } catch (error) {
        console.error(error);
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/edit/:path*', '/dashboard/:path*'],
};