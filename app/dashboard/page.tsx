// Rute Privat: /dashboard
// Ini adalah Server Component (default) - HANYA dapat diakses jika Middleware berhasil

// Kita tidak menggunakan Header/Footer yang sama dengan Landing Page.
// Nanti kita akan buat Sidebar/Layout khusus untuk Dashboard.

// Sebagai placeholder, kita akan menggunakan Header/Footer sementara

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <div>ini header</div>

      <main className="grow container mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Dashboard Utama
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Selamat datang kembali! Anda telah berhasil mengakses rute yang
            dilindungi.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box 1 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-indigo-200 dark:border-indigo-700">
              <h2 className="text-2xl font-semibold text-indigo-600 mb-3">
                Manajemen Konten
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Kelola artikel dan produk keuangan Anda.
              </p>
              <a
                href="/dashboard/content/articles"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Lihat Artikel &rarr;
              </a>
            </div>

            {/* Box 2 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-green-200 dark:border-green-700">
              <h2 className="text-2xl font-semibold text-green-600 mb-3">
                Admin Panel
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Kelola pengguna dan peran (Admin only).
              </p>
              <a
                href="/dashboard/admin/users"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Kelola Pengguna &rarr;
              </a>
            </div>

            {/* Box 3 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-yellow-200 dark:border-yellow-700">
              <h2 className="text-2xl font-semibold text-yellow-600 mb-3">
                Simulasi Transaksi
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Mulai proses pendaftaran produk/layanan.
              </p>
              <a
                href="/dashboard/transactions"
                className="text-yellow-600 hover:text-yellow-700 font-medium"
              >
                Mulai Stepper &rarr;
              </a>
            </div>
          </div>
        </div>
      </main>

      <div>ini footer</div>
    </div>
  );
}
