// import CryptoJS from 'crypto-js';
// import { NextResponse } from 'next/server';

// export async function middleware(request) {
//     const req_cookies = request.cookies.get('token');
//     if (req_cookies == undefined) {
//         return NextResponse.redirect(new URL('/login', request.url));
//     }
//     const token = req_cookies['value'];
//     console.log("token =>", token);

//     if (!token) {
//         console.log("token not found");
//         return NextResponse.redirect(new URL('/login', request.url));
//     }

//     try {
//         const hash = CryptoJS.SHA256(process.env.JWT_SECRET).toString();
//         console.log("hash", hash);
//         // const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         // console.log("decoded", decoded)
//         // const res = await fetch('https://myportfolio-henna-six.vercel.app/api/auth/protected', {
//         //     headers: {
//         //         Authorization: token,
//         //     },
//         // });

//         // console.log(res)
//         if (!hash) {
//             throw new Error('Token validation failed');
//         }
//         if (hash) {
//             return NextResponse.next();
//         }
//     } catch (error) {
//         console.error(error);
//         return NextResponse.redirect(new URL('/login', request.url));
//     }
// }

// export const config = {
//     matcher: ['/edit/:path*', '/dashboard/:path*'],
// };