# Sistem Manajemen Kos

Aplikasi web untuk membantu pengelola kos mengatur data kamar, pengajuan penyewaan, dan permohonan izin penghuni. Aplikasi menyediakan akses berbeda untuk penyewa, admin, dan superadmin.

## Fitur

- Dashboard dengan ringkasan jumlah kamar, penyewaan, dan permohonan izin.
- Pengelolaan data kamar, termasuk nomor, deskripsi fasilitas, harga, dan status ketersediaan.
- Pengajuan penyewaan oleh penyewa untuk kamar yang tersedia.
- Pengajuan izin oleh penyewa, misalnya permohonan membawa tamu.
- Peninjauan dan pembaruan status penyewaan serta izin: menunggu, disetujui, atau ditolak.
- Pengelolaan akun dan peran pengguna oleh superadmin.
- Autentikasi, pengaturan profil, dan pengelolaan kata sandi.

## Hak akses

| Peran | Hak akses utama |
| --- | --- |
| Penyewa (`user`) | Melihat kamar, mengajukan penyewaan dan izin, serta melihat pengajuan miliknya. |
| Admin (`admin`) | Mengelola data kamar serta melihat dan mengelola pengajuan penyewaan dan izin. |
| Superadmin (`superadmin`) | Mengakses fitur admin dan mengelola akun serta peran pengguna. |

## Teknologi

- Laravel 13 dan PHP 8.3 atau lebih baru
- Inertia.js 2 dan React 18
- Tailwind CSS
- SQLite sebagai database bawaan; MySQL juga dapat digunakan melalui konfigurasi Laravel

## Persyaratan

- PHP 8.3 atau lebih baru beserta ekstensi yang dibutuhkan Laravel
- Composer
- Node.js dan npm

## Menjalankan aplikasi di Windows

Jalankan perintah berikut dari PowerShell di folder proyek. Konfigurasi bawaan menggunakan SQLite.

1. Pastikan file database SQLite tersedia:

   ```powershell
   if (-not (Test-Path database\database.sqlite)) {
       New-Item -ItemType File database\database.sqlite | Out-Null
   }
   ```

2. Pasang dependensi, siapkan file `.env`, buat kunci aplikasi, jalankan migrasi, dan build aset:

   ```powershell
   composer run setup
   ```

3. (Opsional) Isi database dengan akun dan data contoh untuk pengembangan lokal:

   ```powershell
   php artisan db:seed
   ```

4. Jalankan server aplikasi:

   ```powershell
   php artisan serve
   ```

5. Di terminal PowerShell lain, jalankan Vite untuk aset frontend:

   ```powershell
   npm run dev
   ```

   Buka alamat yang ditampilkan oleh `php artisan serve` di browser.

Jika ingin menggunakan MySQL, sesuaikan `DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, dan `DB_PASSWORD` di `.env` sebelum menjalankan setup. Pastikan database MySQL tujuan sudah dibuat.

## Akun demo

Setelah menjalankan `php artisan db:seed`, akun berikut tersedia untuk pengujian lokal:

| Peran | Email | Kata sandi |
| --- | --- | --- |
| Superadmin | `superadmin@gmail.com` | `password` |
| Admin | `admin@gmail.com` | `password` |
| Penyewa | `user@gmail.com` | `password` |

**Akun dan kata sandi ini hanya untuk pengembangan lokal. Jangan gunakan kredensial demo di lingkungan produksi; ganti atau hapus akun tersebut sebelum aplikasi dipublikasikan.**

## Pengujian

Jalankan suite pengujian dengan:

```powershell
php artisan test
```
