import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 1. Definisikan daftar rute yang HANYA boleh diakses oleh pengguna yang sudah login
const protectedRoutes = ["/dashboard", "/profile", "/settings"];

// 2. Definisikan daftar rute yang HANYA boleh diakses oleh pengguna yang BELUM login
const authRoutes = ["/login", "/register"];

// 3. Nama token yang disimpan di cookie/localStorage (sesuai dengan authStore.js)
// Dalam konteks middleware, kita hanya bisa membaca dari Cookie.
const AUTH_TOKEN_KEY = "authToken";

export function middleware(request: NextRequest) {
  // Dapatkan token dari Cookie.
  // Catatan: Next.js Middleware hanya dapat membaca cookies, BUKAN localStorage!
  // Kita berasumsi server backend Anda akan mengaturnya sebagai Cookie.
  const token = request.cookies.get(AUTH_TOKEN_KEY)?.value;
  const url = request.nextUrl.clone();

  //4. Cek apakah rute yang diminta adalah rute yang dilindungi
  if (authRoutes.includes(url.pathname)) {
    // Jika pengguna sudah login (ada token), redirect ke dashboard
    if (token) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
    // Jika belum ada token, izinkan akses ke /login atau /register
    return NextResponse.next();
  }

  //5. Jika pengguna mencoba mengakses rute yang dilindungi (/dashboard, /dashboard/*)
  if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
    // Jika tidak ada token, redirect ke halaman login
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    // Jika ada token, izinkan akses ke rute yang dilindungi
    // NOTE: Dalam aplikasi nyata, Anda harus memvalidasi token di sini
    return NextResponse.next();
  }

  // Izinkan akses untuk semua rute publik lainnya (/, /articles, dll.)
  return NextResponse.next();
}

// 4. Konfigurasi Matcher: Beri tahu middleware rute mana yang harus diperhatikan
export const config = {
  // Middleware akan berjalan pada setiap request yang cocok dengan pola ini
  matcher: [
    /*
     * Mencocokkan semua rute kecuali:
     * - API routes (api|trpc|_next/static|_next/image|favicon.ico)
     * - File statis (images, fonts, dll.)
     * - Folder root (/) tidak perlu dilindungi, namun /login dan /register perlu diperhatikan.
     */
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/login",
    "/register",
  ],
};
