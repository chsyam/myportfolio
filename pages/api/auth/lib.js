import { jwtVerify, SignJWT } from "jose";
import Cookies from "js-cookie";
import { NextResponse } from "next/server";

const secretKey = 'chsyamkumar.in'
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("10 min from now")
        .sign(key);
}

export async function decrypt(input) {
    if (!input) {
        window.location.href = "/login";
    }
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}

export async function getSession() {
    const session = Cookies.get('session');
    if (!session) return null;
    return await decrypt(session);
}

export async function logout() {
    Cookies.remove('session');
}

export async function isLoggedIn() {
    const session = await getSession();
    if (!session) return false;
    return true;
}

export async function updateSession(cookies) {
    const session = cookies;
    if (!session) return null;
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 10 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
        name: 'session',
        value: await encrypt(parsed),
        expires: parsed.expires,
        httpOnly: true,
    })
    return res;
}