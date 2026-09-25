# Projek Kos Management

Sistem informasi berbasis web untuk operasional pemilik/pengelola dan kenyamanan penyewa kos (Laravel).

Entitas: `User`, `Room`, `Rental`, `Permission`.
Peran: `superadmin`, `admin` (penjaga), `pemilik`, `pengekos`.

## Prasyarat

- PHP >= 8.3 dan Composer
- Node.js + npm
- Git

## A. Menjalankan proyek dari nol (untuk anggota lain)

```bash
git clone <url-repo>
cd Projek-kos-management
composer install
copy .env.example .env        # Linux/macOS: cp .env.example .env
php artisan key:generate
type nul > database\database.sqlite   # Linux/macOS: touch database/database.sqlite
php artisan migrate:fresh --seed
npm install
npm run build
php artisan serve
```

Buka `http://localhost:8000`.

Data awal hasil seeder:

| Tabel | Isi |
|-------|-----|
| `users` | `superadmin@example.com`, `admin@example.com`, `pemilik@example.com` |
| `rooms` | `A01` s.d. `A05`, harga dasar 800.000 |

## B. Langkah pembuatan (dari inisiasi Laravel sampai migrasi + seeder)

### 1. Inisiasi proyek

```bash
composer create-project laravel/laravel Projek-kos-management
cd Projek-kos-management
git init
```

Database default memakai SQLite (`DB_CONNECTION=sqlite` di `.env`), file `database/database.sqlite` dibuat otomatis oleh Composer.

### 2. Membuat model

```bash
php artisan make:model Room
php artisan make:model Rental
php artisan make:model Permission
```

`User` sudah bawaan Laravel. Isi `$fillable` dan relasi tiap model:

| Model | `$fillable` | Relasi |
|-------|-------------|--------|
| `User` | name, email, google_id, role | `hasMany` Rental, `hasMany` Permission |
| `Room` | room_number, status, base_price | `hasMany` Rental |
| `Rental` | user_id, room_id, add_ons, total_price, payment_status | `belongsTo` User, `belongsTo` Room; cast `add_ons` => `array` |
| `Permission` | user_id, type, description, status | `belongsTo` User |

### 3. UUID sebagai primary key

Tambahkan trait bawaan Laravel di keempat model (mencegah *enumeration attack*):

```php
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Room extends Model
{
    use HasUuids;
}
```

Khusus `User`: `use HasFactory, Notifiable, HasUuids;` (import `Illuminate\Database\Eloquent\Factories\HasFactory`).

### 4. Migrasi

**a. Ubah `database/migrations/0001_01_01_000000_create_users_table.php`**

- `users`: `uuid('id')->primary()`, `name`, `email` (unique), `google_id` (nullable, unique), `role` (default `pengekos`), `timestamps()`. Kolom `password` dihapus karena login memakai Google SSO.
- `sessions.user_id` menjadi `foreignUuid('user_id')->nullable()->index()`.
- Tabel `password_reset_tokens` dihapus (beserta di `down()`).

**b. Buat migrasi tabel kos**

```bash
php artisan make:migration create_kos_tables
```

Isinya membuat:

- `rooms`: `uuid` PK, `room_number` (unique), `status` (default `available`), `base_price` (unsigned integer)
- `rentals`: `uuid` PK, `foreignUuid` `user_id` & `room_id` (`constrained()->cascadeOnDelete()`), `add_ons` (json, nullable), `total_price`, `payment_status` enum `pending|verified` (default `pending`)
- `permissions`: `uuid` PK, `foreignUuid` `user_id` (cascade), `type` enum `izin_tamu|izin_kendaraan|komplain_fasilitas`, `description` (text), `status` enum `pending|approved|rejected` (default `pending`)

### 5. Factory

`database/factories/UserFactory.php` menyesuaikan kolom baru (tanpa `password`):

```php
public function definition(): array
{
    return [
        'name' => fake()->name(),
        'email' => fake()->unique()->safeEmail(),
        'google_id' => fake()->unique()->numerify('####################'),
        'role' => 'pengekos',
    ];
}
```

### 6. Seeder

`database/seeders/DatabaseSeeder.php`:

```php
public function run(): void
{
    foreach (['superadmin', 'admin', 'pemilik'] as $role) {
        User::factory()->create([
            'name' => ucfirst($role),
            'email' => "$role@example.com",
            'role' => $role,
        ]);
    }

    foreach (range(1, 5) as $n) {
        Room::create(['room_number' => "A0$n", 'base_price' => 800000]);
    }
}
```

Jangan lupa `use App\Models\Room;` di bagian atas file.

### 7. Jalankan migrasi + seeder

```bash
php artisan migrate:fresh --seed
```

Semua migrasi berstatus `DONE` dan seeder berjalan tanpa error.

## Catatan

- Rancangan awal menyebut PostgreSQL. Untuk pindah dari SQLite, ubah di `.env`: `DB_CONNECTION=pgsql`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`, lalu jalankan ulang `php artisan migrate:fresh --seed`.
- Autentikasi Google SSO, controller, dan view dikerjakan anggota lain.
