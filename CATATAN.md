# Catatan Implementasi Modul Kamar

## 1. Tujuan

Menuntaskan alur CRUD Kamar yang sudah menggunakan Laravel, Inertia.js, React, dan Tailwind CSS tanpa mengubah arsitektur atau skema database.

## 2. Kondisi Awal

- Resource route Kamar dan seluruh tujuh aksi `RoomController` sudah tersedia.
- Controller sudah mengirim props melalui Inertia dan memakai pagination 10 data per halaman.
- Halaman Index, Create, Edit, dan Show sudah tersedia sebagai halaman React.
- Form Create dan Edit menggunakan `useForm`, tetapi markup form terduplikasi.
- Validasi Create dan Edit berbeda; validasi Edit menerima status bebas dan harga yang tidak sesuai batas kolom database.
- Aksi hapus belum meminta konfirmasi, dan halaman daftar belum menampilkan navigasi pagination.
- Test halaman mencoba menemukan teks antarmuka React di HTML server. Aplikasi tidak mengaktifkan SSR, sehingga isi halaman berada pada props Inertia dan dirender di browser.
- Masih ada template Blade Kamar lama di `resources/views/rooms` dan `resources/views/dashboard/rooms`. Route resource saat ini merender halaman React; template tersebut tidak dihapus karena mungkin masih dipakai dalam pekerjaan lain.
- Pada audit awal Pertemuan 7 belum ditemukan route login/logout atau policy/otorisasi. Socialite telah terpasang, `users.role` telah tersedia, tetapi alur autentikasi belum dibuat.
- Migration menetapkan penghapusan Room dapat menghapus Rental terkait melalui `cascadeOnDelete()`.

## 3. Kekurangan yang Diperbaiki

- Menyamakan aturan validasi update dengan create, termasuk status yang diizinkan, keunikan nomor kamar, harga bulat, dan rentang harga unsigned integer.
- Menggabungkan markup dan logika form Create/Edit agar tetap memakai satu pola `useForm`.
- Menambahkan konfirmasi hapus yang menyebut kamar dan memperingatkan bahwa Rental terkait ikut terhapus.
- Menambahkan indikator proses untuk pengiriman form dan penghapusan, pesan validasi per field, serta pesan flash sukses/error.
- Menambahkan state kosong, navigasi pagination, badge status bersama, dan layout daftar yang dapat digulir horizontal pada layar kecil.
- Mengubah pemeriksaan halaman dalam feature test menjadi pemeriksaan komponen dan props Inertia.

## 4–5. File yang Ditambahkan atau Diubah

Ditambahkan:

- `resources/js/Pages/Dashboard/Rooms/RoomForm.jsx` — form reusable untuk create dan edit.
- `resources/js/Pages/Dashboard/Rooms/RoomStatus.jsx` — badge status yang dipakai di daftar dan detail.
- `CATATAN.md` — catatan audit, perubahan, verifikasi, dan instruksi penggunaan.

Diubah:

- `resources/js/Pages/Dashboard/Rooms/Create.jsx` dan `Edit.jsx` — menggunakan `RoomForm`.
- `resources/js/Pages/Dashboard/Rooms/Index.jsx` — feedback, state kosong, pagination, badge status, konfirmasi dan status proses hapus.
- `resources/js/Pages/Dashboard/Rooms/Show.jsx` — detail yang konsisten dengan badge status dan label berbahasa Indonesia.
- `app/Http/Requests/UpdateRoomRequest.php` — validasi update disamakan dengan batas create dan skema.
- `tests/Feature/RoomCrudTest.php` — assert response Inertia, operasi CRUD, validasi update, serta pagination.

Tidak ada file yang dihapus. Implementasi Pertemuan 7 setelah catatan awal ini menambahkan migration, auth routes, policy, middleware, dan konfigurasi placeholder Google OAuth. File `.env` dan data PostgreSQL pengguna tidak diubah oleh pengerjaan ini.

## 6. Komponen React

- `RoomForm` menampung field, validasi yang ditampilkan, tombol proses, dan submit untuk kedua mode.
- `RoomStatus` memberi label dan gaya yang konsisten untuk status kamar.
- Komponen baru dibatasi pada penggunaan ulang yang nyata; tidak dibuat tabel atau dialog generik khusus untuk satu halaman.

## 7. Props, State, Form, dan Feedback

- Data kamar dan paginator tetap berasal dari props Inertia.
- State lokal hanya menyimpan ID kamar yang sedang dihapus.
- `useForm` menyimpan input Create/Edit, mengirim `POST` atau `PUT`, mempertahankan input saat validasi gagal, menampilkan error field, dan menonaktifkan tombol saat proses berlangsung.
- Nilai input Edit diinisialisasi langsung dari prop `room`.
- Hapus hanya dijalankan setelah konfirmasi; pembatalan tidak mengirim request.
- Pesan sukses/error memiliki role aksesibilitas, state daftar kosong menyediakan tautan tambah, dan navigasi pagination memakai `Link` Inertia.

## 8. Perubahan Backend dan Validasi

- Route resource, kontrak controller, dan skema database dipertahankan.
- `UpdateRoomRequest` sekarang mewajibkan status `available`, `occupied`, atau `maintenance`; harga harus integer dari 0 sampai 4.294.967.295; nomor kamar wajib string maksimal 255 karakter dan unik kecuali untuk kamar yang sedang diedit.
- Server tetap menjadi sumber validasi utama; batas input HTML hanya membantu pengguna.
- Temuan ini berlaku pada kondisi awal sebelum implementasi Pertemuan 7; lihat bagian 13 untuk autentikasi dan otorisasi yang sekarang diterapkan.
- Konfirmasi penghapusan menyebut efek cascade pada Rental. Aturan cascade database tidak diubah.

## 9. Pengujian dan Hasil Aktual

- `php artisan test --compact` — lulus: 13 test, 131 assertion.
- `npm run build` — lulus. Vite menampilkan peringatan bahwa `fontaine` opsional tidak terpasang untuk optimized font fallbacks; build tetap berhasil.
- `vendor/bin/pint --dirty --format agent` — lulus.
- `git diff --check` — lulus.
- Uji browser dilakukan pada database SQLite sementara yang terisolasi, bukan database PostgreSQL pengguna: create dan update berhasil, flash tampil, pembatalan hapus mempertahankan data, konfirmasi hapus menghapus data dan menampilkan state kosong. Layout daftar juga diperiksa pada viewport 390 × 844.
- Pemeriksaan log browser setelah alur tersebut tidak menunjukkan error JavaScript; hanya pesan informasi React DevTools.

## 10. Kendala dan Hal yang Belum Dicakup

- Belum ada browser-test otomatis di dependency proyek; aksi konfirmasi dan layout diperiksa manual melalui browser.
- Catatan ini mencatat audit dan implementasi tugas yang berbeda; autentikasi dan otorisasi sekarang melindungi route Kamar.
- Menghapus kamar dengan Rental terkait akan ikut menghapus Rental berdasarkan migration yang ada. Mengubahnya menjadi larangan hapus atau soft delete memerlukan keputusan aturan bisnis dan perubahan skema/behavior terpisah.
- Template Blade Kamar lama masih ada tetapi tidak digunakan oleh route resource saat ini.
- Informasi kontribusi anggota kelompok tidak diberikan, sehingga tidak dicatat.

## 11. Cara Menjalankan dan Menguji

1. Pastikan koneksi database lokal sudah dikonfigurasi dan migration telah dijalankan.
2. Jalankan aplikasi dan frontend, misalnya dengan `php artisan serve` serta `npm run dev`.
3. Buka `/rooms`, lalu uji tambah, detail, ubah, dan hapus kamar. Periksa juga validasi dengan mengirim nomor duplikat atau harga di luar rentang.
4. Gunakan tombol Hapus dan pilih batal untuk memastikan data tidak berubah, lalu ulangi dan konfirmasi untuk menghapus.
5. Jalankan verifikasi otomatis dengan `php artisan test --compact` dan `npm run build`.

## 12. Kontribusi

Tidak ada nama atau pembagian kontribusi anggota yang diberikan untuk dicatat.

## 13. Pertemuan 7 — Autentikasi dan Otorisasi

### Audit dan keputusan

- Versi proyek saat audit: Laravel 13.33, Inertia Laravel 3.5, React adapter 3.9, dan Socialite 5.31; PHP runtime pada workspace 8.4.
- Tidak ada starter kit auth, route login/logout, controller auth, atau email verification. Socialite telah menjadi dependency dan konfigurasi Google tersedia, jadi implementasi memakai Google OAuth bawaan Socialite, bukan membuat form password atau sistem auth baru.
- Kolom `users.role` sudah tersedia, sehingga tidak ditambahkan kolom `peran` kedua. Role aplikasi distandardisasi menjadi `admin` dan `petugas`.
- Sesuai keputusan pengguna, role lama `admin` tetap admin dan semua role lama lain (termasuk `superadmin`, `pemilik`, `pengekos`) dinormalisasi menjadi petugas. Karena migration menyatukan beberapa nilai lama, rollback mengembalikan default kolom tetapi tidak dapat memulihkan nilai lama masing-masing akun.
- Hak akses yang dipilih: admin dapat CRUD Kamar; petugas hanya dapat melihat daftar dan detail. Tidak ada penyaringan data per petugas karena model Room tidak memiliki kolom pemilik/tenant dan semua petugas berbagi akses baca yang sama.

### Migration, middleware, policy, dan route

- Migration baru `2026_10_19_053033_normalize_legacy_user_roles_for_staff_access.php` menormalkan nilai role lama serta mengubah default baru menjadi `petugas`. Tidak ada operasi drop tabel/kolom dan tidak ada `.env` lokal yang diubah.
- `EnsureUserHasRole` didaftarkan sebagai alias `role` di `bootstrap/app.php`. Seluruh route resource `/rooms` berada di middleware `auth` dan `role:admin,petugas`; route `/logout` memakai `auth`. Route `/`, `/login`, dan callback OAuth tetap publik sesuai fungsi.
- `RoomPolicy` diterapkan untuk `viewAny`, `view`, `create`, `update`, dan `delete`, dan didaftarkan eksplisit di `AppServiceProvider`.
- Controller memanggil `Gate::authorize()` pada semua aksi resource. Form Request untuk store/update juga memeriksa Policy sebelum validasi, sehingga petugas menerima HTTP 403 pada request langsung meskipun payload tidak valid.
- Inertia mengirim `auth.user` dengan subset identitas (id, nama, email, role), tidak mengirim `google_id`. Props `can` pada daftar/detail berasal dari Gate/Policy dan mengatur visibilitas aksi React.
- `role` dikeluarkan dari `$fillable` model User sehingga mass assignment biasa tidak dapat menetapkannya. Callback OAuth menetapkan akun baru sebagai petugas secara server-side; tidak menerima role dari query/request. Role admin harus ditetapkan secara tepercaya oleh pengelola, bukan melalui halaman publik.
- Google hanya menerima akun dengan klaim email terverifikasi. Callback menghubungkan akun lama berdasarkan email hanya jika belum terhubung ke Google lain; sesi diperbarui saat login, dan logout menginvalidasi sesi serta meregenerasi token CSRF.
- Email verification Laravel tidak diaktifkan karena model/schema tidak memiliki `email_verified_at` atau kontrak `MustVerifyEmail`. Verifikasi identitas/email dilakukan melalui klaim Google terverifikasi.

### File Pertemuan 7 yang ditambahkan/diubah

Ditambahkan:

- `app/Http/Controllers/Auth/GoogleAuthController.php` — halaman login, redirect/callback OAuth, dan logout.
- `app/Http/Middleware/EnsureUserHasRole.php` — pembatas role.
- `app/Policies/RoomPolicy.php` — kewenangan CRUD Kamar.
- `database/migrations/2026_10_19_053033_normalize_legacy_user_roles_for_staff_access.php` — normalisasi role/default.
- `resources/js/Pages/Auth/Login.jsx` — UI login Google dan pesan feedback.
- `resources/js/Components/AuthenticatedLayout.jsx` — identitas user dan tombol logout untuk halaman privat.
- `tests/Feature/GoogleAuthenticationTest.php` dan `tests/Feature/RoomAuthorizationTest.php` — test OAuth, session, policy, route, serta props Inertia.

Diubah:

- `routes/web.php` — route auth dan middleware route privat.
- `bootstrap/app.php` — alias middleware `role`.
- `app/Providers/AppServiceProvider.php` — pendaftaran policy.
- `app/Http/Middleware/HandleInertiaRequests.php` — shared props user minimal.
- `app/Models/User.php`, `database/factories/UserFactory.php`, `database/seeders/DatabaseSeeder.php` — role canonical dan role non-mass-assignable.
- `app/Http/Controllers/RoomController.php` — pemeriksaan Gate untuk setiap aksi serta props `can`.
- Halaman React Room Index/Show/Form — sembunyikan aksi yang tidak diizinkan dan tampilkan tombol logout.
- `config/services.php` dan `.env.example` — key konfigurasi Google OAuth; `.env` tetap tidak disentuh.
- `tests/Feature/RoomCrudTest.php` — alur CRUD lama dijalankan sebagai admin terautentikasi.

### Setup dan pengujian

1. Isi `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, dan `GOOGLE_REDIRECT_URI` pada environment lokal/hosting. Callback harus sama persis dengan URL redirect yang didaftarkan pada Google Cloud Console. Nilai rahasia tidak dicatat di repo.
2. Jalankan `php artisan config:clear`, `php artisan migrate`, dan `npm run dev` (atau build produksi).
3. Akses `/login`, masuk dengan Google terverifikasi, lalu role akun baru menjadi `petugas`. Tetapkan akun admin melalui prosedur provisioning tepercaya, misalnya setelah login pertama: `php artisan tinker --execute='App\Models\User::where("email", "email-admin-anda")->update(["role" => "admin"]);'`.
4. Jalankan `php artisan test --compact`.

Hasil aktual implementasi Pertemuan 7:

- `php artisan test --compact` — lulus: 27 test, 231 assertion.
- Test mencakup admin CRUD, petugas read-only/403 tanpa perubahan data, props `can`, perlindungan mass assignment role, dan normalisasi role lama.
- `npm run build` — lulus; tetap ada peringatan bahwa `fontaine` opsional tidak terpasang untuk optimized font fallbacks.
- `vendor/bin/pint --dirty --format agent` — lulus.
- Auth test memakai Socialite fake (tidak menghubungi Google); migration dijalankan oleh test suite pada SQLite in-memory. Pemeriksaan browser memastikan halaman login tampil; tombol OAuth menampilkan pesan bahwa login Google belum dikonfigurasi. OAuth nyata belum diuji karena kredensial Google tidak disediakan dan `.env` tidak diubah.

## 14. Login email dan kata sandi

- Halaman `/login` sekarang menerima email/kata sandi dan tetap menyediakan tombol Google. Route `POST /login` memakai `Auth::attempt()`, regenerasi session, dan pembatasan percobaan login.
- Pendaftaran tersedia di `/register`; akun baru otomatis berperan `petugas`, kata sandi minimal 8 karakter disimpan melalui hashed cast, dan input `role` diabaikan. Pendaftaran tidak dapat mengambil alih email yang sudah terdaftar sebagai akun Google.
- Migration `2026_10_19_063252_add_password_column_to_users_table.php` menambahkan kolom kata sandi nullable agar akun Google yang sudah ada tetap valid. Akun Google lama belum memiliki kata sandi sehingga perlu akun lokal baru atau password harus diprovisikan secara tepercaya; tidak ada default password.
- Untuk akun admin, daftar akun lokal terlebih dahulu, lalu ubah role dari lingkungan tepercaya setelah migration: `php artisan tinker --execute='App\Models\User::where("email", "email-admin-anda")->update(["role" => "admin"]);'`. Jangan menerima role admin dari formulir publik.
- Jalankan `php artisan migrate`, lalu buka `/register` untuk membuat akun petugas atau `/login` untuk masuk. Pemulihan kata sandi melalui email belum tersedia karena proyek belum memiliki alur pengiriman/reset kata sandi.
- Verifikasi: seluruh suite lulus (35 test, 280 assertion); test autentikasi email/kata sandi lulus (8 test, 49 assertion); `npm run build`, Pint, dan `git diff --check` lulus. Browser diuji pada SQLite sementara terisolasi: daftar petugas, logout, lalu login email/kata sandi berhasil. Database PostgreSQL aplikasi tidak diubah dan migration baru belum dijalankan di sana.
