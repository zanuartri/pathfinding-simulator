# Pathfinding Simulator

Pathfinding Simulator adalah aplikasi berbasis web untuk memvisualisasikan dan membandingkan performa algoritma pathfinding Dijkstra dan A\*. Dibangun menggunakan React, Vite, dan Tailwind CSS, aplikasi ini memungkinkan pengguna untuk melakukan eksperimen dan observasi terhadap kedua algoritma tersebut dengan berbagai fitur interaktif.

## 🚀 Fitur

- 🔍 **Algoritma:** Dijkstra dan A\*
- 🎲 **Random Maze:** Buat maze acak dengan sekali klik
- 🏁 **Start/Stop Button:** Mulai dan hentikan simulasi kapan saja
- 🎯 **Set Initial & Target Point:** Tentukan titik awal dan akhir dengan mudah
- 🛠️ **Interactive Grid:** Gambar dinding dan maze secara langsung di grid
- 📊 **Statistik Real-Time:**
  - Panjang jalur (path length)
  - Waktu eksekusi (execution time)
  - Jumlah node yang dikunjungi

## 🛠️ Teknologi yang Digunakan

- ⚛️ React (Vite)
- 🎨 Tailwind CSS

## ⚙️ Instalasi

```bash
git clone https://github.com/zanuartri/pathfinding-simulator.git
cd pathfinding-simulator

npm install

npm run dev
```

Akses aplikasi di [http://localhost:5173](http://localhost:5173)

## 🚢 Deployment

Aplikasi ini telah di-deploy menggunakan Vercel dan dapat diakses di:
[https://pathfinding-simulator-delta.vercel.app/](https://pathfinding-simulator-delta.vercel.app/)

## 🧪 Cara Penggunaan

1. **Pilih Algoritma:** Pilih antara Dijkstra atau A\*.
2. **Tentukan Posisi Awal & Akhir:** Klik pada grid untuk mengatur posisi awal (start) dan target.
3. **Tambahkan Dinding (Walls):** Klik dan seret untuk menggambar rintangan pada grid.
4. **Generate Random Maze:** Klik tombol _Random Maze_ untuk menghasilkan maze secara acak.
5. **Mulai Simulasi:** Klik tombol _Start_ dan amati bagaimana algoritma mencari jalur.
6. **Pantau Statistik:** Lihat statistik panjang jalur, waktu eksekusi, dan jumlah node.
7. **Hentikan Simulasi:** Klik tombol _Stop_ untuk menghentikan simulasi kapan saja.

## 🧠 Algoritma yang Digunakan

### 🔹 Dijkstra's Algorithm

Algoritma pathfinding yang menjamin menemukan jalur terpendek dengan menghitung jarak dari titik awal ke semua node yang dapat dicapai.

### 🔹 A\* (A-Star) Algorithm

Algoritma yang memanfaatkan heuristik (estimasi jarak ke target) untuk mempercepat pencarian jalur terpendek.

## 💡 Insight Eksperimen

Aplikasi ini dirancang untuk membandingkan kinerja kedua algoritma dengan metrik berikut:

- **Kecepatan Eksekusi:** Perbedaan waktu yang dibutuhkan kedua algoritma.
- **Efisiensi Pencarian:** Jumlah node yang dikunjungi selama pencarian.
- **Kualitas Jalur:** Panjang jalur yang ditemukan.

## 📄 Lisensi

MIT License.

---

🔗 **GitHub:** [https://github.com/zanuartri/pathfinding-simulator](https://github.com/zanuartri/pathfinding-simulator)

🚀 **Live Demo:** [https://pathfinding-simulator-delta.vercel.app/](https://pathfinding-simulator-delta.vercel.app/)

Selamat bereksperimen dan mengeksplorasi dunia pathfinding! 🧠⚙️
