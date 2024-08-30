import { NextResponse } from 'next/server';

export function middleware(request) {
    const response = NextResponse.next();

    const cookies = request.cookies;
    const session = cookies.get('session');
    if (session) {
        const newExpiration = new Date(Date.now() + 4 * 60 * 60 * 1000);
        response.cookies.set('session', session, {
            expires: newExpiration,
            httpOnly: true,
            sameSite: 'strict',
        });
    } else {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return response;
}

export const config = {
    matcher: ['/edit/:path*', '/dashboard/:path*'],
};
