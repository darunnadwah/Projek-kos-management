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
- Belum ditemukan route login, middleware autentikasi, atau policy/otorisasi yang melindungi route Kamar. Model User memiliki role dan Socialite terpasang, tetapi alur autentikasi belum tersedia.
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

Tidak ada file yang dihapus. Tidak ada perubahan pada migration, `.env`, route, dependency, atau data PostgreSQL pengguna.

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
- Belum ada autentikasi/otorisasi yang dapat diintegrasikan. Route Kamar tetap publik sesuai kondisi awal dan perlu dilindungi saat alur login/role diterapkan.
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
- Autentikasi dan otorisasi belum tersedia. Karena itu, CRUD Kamar saat ini dapat diakses tanpa login.
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
