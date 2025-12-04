Panduan singkat — Ucapan Ulang Tahun Interaktif

1. Tujuan
- Menampilkan animasi balon. Saat balon diklik, muncul teks "Selamat Ulang Tahun!" beserta nama: Alvensia, Rinda, Mirella. Musik (opsional) dimainkan jika tersedia.

2. File yang dibuat
- `index.html` — Halaman utama (buka di browser).
- `style.css` — Styling untuk balon, animasi, dan pesan.
- `script.js` — Logika interaktif (klik, pop, mainkan musik).

3. Menambahkan musik dan suara pop
- Taruh file `music.mp3` di folder yang sama untuk musik latar yang diputar ketika pesan muncul.
- (Opsional) taruh `pop.mp3` di folder yang sama untuk suara pecah balon. Bila tidak ada, program akan tetap berjalan tanpa suara.

4. Cara menjalankan
- Buka `index.html` di browser modern (Chrome/Edge/Firefox). Klik atau ketuk salah satu balon.

5. Integrasi dengan `movie.py`
- Halaman ini bersifat interaktif dan harus dibuka di browser — tidak bisa diklik di dalam file video.
- Jika Anda ingin versi video (non-interaktif) yang menampilkan pecah balon lalu menampilkan teks secara otomatis, beri tahu saya; saya bisa mengupdate `movie.py` untuk membuat video fallback.

6. Kustomisasi cepat
- Kustom lewat `script.js` CONFIG (direkomendasikan):
	- Buka file `script.js` dan edit objek `CONFIG` di bagian paling atas.
	- Contoh properti yang dapat Anda ubah:
		- `greeting`: string utama (mis. "Selamat Ulang Tahun!")
		- `names`: string nama (mis. "Alvensia · Rinda · Mirella")
		- `musicFile`: nama file musik (mis. `music.mp3`)
		- `popFile`: nama file suara pop (mis. `pop.mp3`)
		- `balloonColors`: array warna/gradien untuk tiap balon
		- `floatDurationBase`: durasi dasar animasi float (detik)

- Setelah mengedit `CONFIG`, simpan dan muat ulang `index.html` di browser.

Butuh bantuan lagi? Pilih salah satu: tambahkan konfeti setelah klik, tombol "Bagikan"/download, atau buat video MP4 otomatis. Saya bisa kerjakan sekarang jika Anda mau.
