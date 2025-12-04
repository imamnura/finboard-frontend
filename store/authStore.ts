// 'use client' WAJIB untuk file yang menggunakan hook di sisi klien (seperti Zustand)
"use client";
import { create } from "zustand";

// Interface untuk data pengguna
// Sesuaikan dengan data yang diterima dari backend (misalnya dari prisma/schema.prisma)
const initialUserState = {
  id: null,
  email: null,
  name: null,
  role: null,
};

// Store Zustand untuk Status Otentikasi
export const useAuthStore = create((set) => ({
  user: initialUserState,
  token: null,
  isLoggedIn: false,

  // Action untuk memperbarui status login
  login: (userData: typeof initialUserState, token: string) => {
    // Simpan token ke localStorage atau Cookie untuk persistensi (akan kita lakukan nanti)
    // Untuk saat ini, kita simpan hanya di state

    // Logika untuk menyimpan token ke localStorage (untuk sementara)
    // PENTING: Dalam aplikasi nyata, gunakan HttpOnly Cookie untuk keamanan!
    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", token);
    }

    set({
      user: userData,
      token: token,
      isLoggedIn: true,
    });
  },

  logout: () => {
    // Hapus token dari localStorage atau Cookie
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
    }

    set({
      user: initialUserState,
      token: null,
      isLoggedIn: false,
    });
  },

  //Memeriksa dan memuat ulang status otentikasi dari penyimpanan (jika ada)
  initializeAuth: () => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        // Di sini, idealnya kita perlu memvalidasi token di server.
        // Untuk kesederhanaan, kita hanya berasumsi token valid
        // dan menunggu token dari API Login untuk mengisi data user.

        // Jika ada token, atur isLoggedIn ke true,
        // data user akan diisi setelah sukses login/validasi sesi.
        set((state: typeof initialUserState) => ({
          ...state,
          token: storedToken,
          isLoggedIn: true,
        }));
      }
    }
  },
}));
