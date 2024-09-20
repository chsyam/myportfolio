import { NextResponse } from 'next/server';

export async function middleware(request) {
    const req_cookies = request.cookies.get('token');
    const token = req_cookies['value'];

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