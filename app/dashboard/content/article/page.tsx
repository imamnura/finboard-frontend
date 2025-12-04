// Rute Privat: /dashboard/content/articles
// Server Component untuk menampilkan daftar artikel

import Link from "next/link";

// Placeholder untuk mendapatkan daftar artikel dari Backend (akan diimplementasikan nanti)
// Kita akan menggunakan Server Component Fetching di sini.
async function getArticles() {
  // NOTE: Di sini kita perlu mengirimkan token JWT dari Server Component
  // ke Backend. Ini adalah topik yang lebih kompleks (menggunakan next-auth atau
  // mendapatkan cookie di RSC), tetapi untuk sementara, kita kembalikan data mock.

  // URL API Backend (sesuai auth.controller.ts)
  // const API_URL = 'http://localhost:3001/api/v1/content/articles';

  // try {
  //    const response = await fetch(API_URL, {
  //      cache: 'no-store', // Selalu fetch data terbaru
  //      headers: {
  //        // Ini adalah area yang sulit di RSC: mendapatkan Token dari Cookie
  //        // 'Authorization': `Bearer ${token}`
  //      }
  //    });
  //    return response.json();
  // } catch (error) {
  //    console.error('Failed to fetch articles:', error);
  //    return { articles: [], message: 'Gagal memuat artikel.' };
  // }

  // Data Mock untuk Development
  return [
    {
      id: "1",
      title: "Panduan Investasi Reksa Dana",
      isPublished: true,
      createdAt: new Date().toLocaleDateString(),
    },
    {
      id: "2",
      title: "Memahami Risiko Kredit",
      isPublished: false,
      createdAt: new Date().toLocaleDateString(),
    },
    {
      id: "3",
      title: "Strategi Penghematan di Era Digital",
      isPublished: true,
      createdAt: new Date().toLocaleDateString(),
    },
  ];
}

// Komponen utama (Server Component)
export default async function ArticlesListPage() {
  // 1. Ambil data saat render di server
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Manajemen Artikel
            </h1>
            <Link
              href="/dashboard/content/articles/create"
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl shadow-md hover:bg-indigo-700 transition duration-150"
            >
              + Buat Artikel Baru
            </Link>
          </header>

          {/* Tabel Daftar Artikel */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Judul
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Tanggal Dibuat
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {articles.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                    >
                      Belum ada artikel yang dibuat.
                    </td>
                  </tr>
                ) : (
                  articles.map((article) => (
                    <tr
                      key={article.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-100"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {article.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            article.isPublished
                              ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                          }`}
                        >
                          {article.isPublished ? "Terbit" : "Draf"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {article.createdAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <Link
                          href={`/dashboard/content/articles/edit/${article.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </Link>
                        {/* Tombol Delete (Akan menggunakan Server Action) */}
                        <button className="text-red-600 hover:text-red-900">
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
