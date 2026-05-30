import { Router } from "express";

const router = Router();

// ── SUMMARY KPIs ─────────────────────────────────────────────────────────────
let desaSummary: Record<string, any> = {
  totalDesa: 15,
  totalPenduduk: 14872,
  totalKK: 3648,
  totalLuasHa: 2847.5,
  totalDanaDesa2024: 15234500000,
  rataRealisasiPct: 87.4,
  rataSkorIDM: 0.7012,
  desaMandiri: 2,
  desaMaju: 5,
  desaBerkembang: 6,
  desaTertinggal: 2,
  desaSangatTertinggal: 0,
  kecamatan: "Kuta Malaka",
  kabupaten: "Aceh Besar",
  provinsi: "Aceh",
  lastUpdate: "30 Mei 2026, 08:00 WIB",
};

// ── PROFIL DESA ───────────────────────────────────────────────────────────────
let profilData: Record<string, any>[] = [
  { id: 1, nama: "Gampong Cot Glie", kecamatan: "Kuta Malaka", kabupaten: "Aceh Besar", luas_ha: 215.3, jumlah_penduduk: 1245, jumlah_kk: 312, kepala_desa: "Faisal Hasan", jenis_desa: "Berkembang", lat: 5.4123, lng: 95.6234, tahun_berdiri: 1945 },
  { id: 2, nama: "Gampong Meunasah Tuha", kecamatan: "Kuta Malaka", kabupaten: "Aceh Besar", luas_ha: 183.7, jumlah_penduduk: 987, jumlah_kk: 241, kepala_desa: "Rusli Ibrahim", jenis_desa: "Maju", lat: 5.4089, lng: 95.6312, tahun_berdiri: 1932 },
  { id: 3, nama: "Gampong Lamjamee", kecamatan: "Kuta Malaka", kabupaten: "Aceh Besar", luas_ha: 147.2, jumlah_penduduk: 756, jumlah_kk: 189, kepala_desa: "Zulkifli Mahmud", jenis_desa: "Berkembang", lat: 5.4056, lng: 95.6178, tahun_berdiri: 1950 },
  { id: 4, nama: "Gampong Kuta Karang", kecamatan: "Kuta Malaka", kabupaten: "Aceh Besar", luas_ha: 298.1, jumlah_penduduk: 1432, jumlah_kk: 358, kepala_desa: "Mahyuddin Umar", jenis_desa: "Mandiri", lat: 5.4201, lng: 95.6089, tahun_berdiri: 1928 },
  { id: 5, nama: "Gampong Blang Bintang", kecamatan: "Kuta Malaka", kabupaten: "Aceh Besar", luas_ha: 312.8, jumlah_penduduk: 1389, jumlah_kk: 347, kepala_desa: "Syarifuddin", jenis_desa: "Maju", lat: 5.4267, lng: 95.6145, tahun_berdiri: 1938 },
  { id: 6, nama: "Gampong Lamreh", kecamatan: "Kuta Malaka", kabupaten: "Aceh Besar", luas_ha: 189.4, jumlah_penduduk: 823, jumlah_kk: 206, kepala_desa: "Hamdani Said", jenis_desa: "Berkembang", lat: 5.4178, lng: 95.6401, tahun_berdiri: 1955 },
  { id: 7, nama: "Gampong Siron", kecamatan: "Kuta Malaka", kabupaten: "Aceh Besar", luas_ha: 234.6, jumlah_penduduk: 1067, jumlah_kk: 267, kepala_desa: "Abdul Wahid", jenis_desa: "Maju", lat: 5.4312, lng: 95.6289, tahun_berdiri: 1942 },
  { id: 8, nama: "Gampong Mon Ikeun", kecamatan: "Kuta Malaka", kabupaten: "Aceh Besar", luas_ha: 156.9, jumlah_penduduk: 634, jumlah_kk: 158, kepala_desa: "Razali Yusuf", jenis_desa: "Tertinggal", lat: 5.3978, lng: 95.6523, tahun_berdiri: 1960 },
  { id: 9, nama: "Gampong Ateuk", kecamatan: "Kuta Malaka", kabupaten: "Aceh Besar", luas_ha: 201.3, jumlah_penduduk: 912, jumlah_kk: 228, kepala_desa: "Burhanuddin", jenis_desa: "Berkembang", lat: 5.4023, lng: 95.6467, tahun_berdiri: 1948 },
  { id: 10, nama: "Gampong Baet", kecamatan: "Kuta Malaka", kabupaten: "Aceh Besar", luas_ha: 178.6, jumlah_penduduk: 798, jumlah_kk: 199, kepala_desa: "Mukhlis Yahya", jenis_desa: "Berkembang", lat: 5.4134, lng: 95.6556, tahun_berdiri: 1952 },
  { id: 11, nama: "Gampong Tanjong", kecamatan: "Kuta Malaka", kabupaten: "Aceh Besar", luas_ha: 267.4, jumlah_penduduk: 1234, jumlah_kk: 309, kepala_desa: "Nasruddin Ali", jenis_desa: "Mandiri", lat: 5.4345, lng: 95.6378, tahun_berdiri: 1935 },
  { id: 12, nama: "Gampong Reudeup", kecamatan: "Kuta Malaka", kabupaten: "Aceh Besar", luas_ha: 143.8, jumlah_penduduk: 578, jumlah_kk: 144, kepala_desa: "Sarwani Hamid", jenis_desa: "Tertinggal", lat: 5.3956, lng: 95.6601, tahun_berdiri: 1965 },
  { id: 13, nama: "Gampong Lamtamot", kecamatan: "Kuta Malaka", kabupaten: "Aceh Besar", luas_ha: 189.1, jumlah_penduduk: 867, jumlah_kk: 217, kepala_desa: "Ahmadi Zakaria", jenis_desa: "Berkembang", lat: 5.4089, lng: 95.6634, tahun_berdiri: 1957 },
  { id: 14, nama: "Gampong Cot Iri", kecamatan: "Kuta Malaka", kabupaten: "Aceh Besar", luas_ha: 167.5, jumlah_penduduk: 723, jumlah_kk: 181, kepala_desa: "Junaidi Husein", jenis_desa: "Maju", lat: 5.4156, lng: 95.6712, tahun_berdiri: 1943 },
  { id: 15, nama: "Gampong Blang Krueng", kecamatan: "Kuta Malaka", kabupaten: "Aceh Besar", luas_ha: 261.8, jumlah_penduduk: 1127, jumlah_kk: 282, kepala_desa: "Ramli Daud", jenis_desa: "Maju", lat: 5.4234, lng: 95.6489, tahun_berdiri: 1939 },
];

// ── DANA DESA ─────────────────────────────────────────────────────────────────
let danaDesa: Record<string, any>[] = [
  { id: 1, desa_id: 1, nama_desa: "Gampong Cot Glie", tahun: 2024, alokasi: 987500000, realisasi: 921350000, persen_realisasi: 93.3, infra_pct: 55, pemberdayaan_pct: 30, operasional_pct: 15, sumber: "DD+ADD" },
  { id: 2, desa_id: 2, nama_desa: "Gampong Meunasah Tuha", tahun: 2024, alokasi: 856200000, realisasi: 789430000, persen_realisasi: 92.2, infra_pct: 50, pemberdayaan_pct: 35, operasional_pct: 15, sumber: "DD+ADD" },
  { id: 3, desa_id: 3, nama_desa: "Gampong Lamjamee", tahun: 2024, alokasi: 743800000, realisasi: 601650000, persen_realisasi: 80.9, infra_pct: 60, pemberdayaan_pct: 25, operasional_pct: 15, sumber: "DD+ADD" },
  { id: 4, desa_id: 4, nama_desa: "Gampong Kuta Karang", tahun: 2024, alokasi: 1123400000, realisasi: 1089500000, persen_realisasi: 97.0, infra_pct: 45, pemberdayaan_pct: 40, operasional_pct: 15, sumber: "DD+ADD" },
  { id: 5, desa_id: 5, nama_desa: "Gampong Blang Bintang", tahun: 2024, alokasi: 1089700000, realisasi: 1012300000, persen_realisasi: 92.9, infra_pct: 48, pemberdayaan_pct: 37, operasional_pct: 15, sumber: "DD+ADD" },
  { id: 6, desa_id: 6, nama_desa: "Gampong Lamreh", tahun: 2024, alokasi: 812300000, realisasi: 698900000, persen_realisasi: 86.0, infra_pct: 58, pemberdayaan_pct: 27, operasional_pct: 15, sumber: "DD+ADD" },
  { id: 7, desa_id: 7, nama_desa: "Gampong Siron", tahun: 2024, alokasi: 934600000, realisasi: 887200000, persen_realisasi: 94.9, infra_pct: 52, pemberdayaan_pct: 33, operasional_pct: 15, sumber: "DD+ADD" },
  { id: 8, desa_id: 8, nama_desa: "Gampong Mon Ikeun", tahun: 2024, alokasi: 687400000, realisasi: 512300000, persen_realisasi: 74.5, infra_pct: 65, pemberdayaan_pct: 20, operasional_pct: 15, sumber: "DD+ADD" },
  { id: 9, desa_id: 9, nama_desa: "Gampong Ateuk", tahun: 2024, alokasi: 867300000, realisasi: 756800000, persen_realisasi: 87.3, infra_pct: 55, pemberdayaan_pct: 30, operasional_pct: 15, sumber: "DD+ADD" },
  { id: 10, desa_id: 10, nama_desa: "Gampong Baet", tahun: 2024, alokasi: 798500000, realisasi: 671200000, persen_realisasi: 84.1, infra_pct: 57, pemberdayaan_pct: 28, operasional_pct: 15, sumber: "DD+ADD" },
  { id: 11, desa_id: 11, nama_desa: "Gampong Tanjong", tahun: 2024, alokasi: 1067800000, realisasi: 1045600000, persen_realisasi: 97.9, infra_pct: 42, pemberdayaan_pct: 43, operasional_pct: 15, sumber: "DD+ADD" },
  { id: 12, desa_id: 12, nama_desa: "Gampong Reudeup", tahun: 2024, alokasi: 623400000, realisasi: 498700000, persen_realisasi: 80.0, infra_pct: 67, pemberdayaan_pct: 18, operasional_pct: 15, sumber: "DD+ADD" },
  { id: 13, desa_id: 13, nama_desa: "Gampong Lamtamot", tahun: 2024, alokasi: 834200000, realisasi: 723450000, persen_realisasi: 86.7, infra_pct: 54, pemberdayaan_pct: 31, operasional_pct: 15, sumber: "DD+ADD" },
  { id: 14, desa_id: 14, nama_desa: "Gampong Cot Iri", tahun: 2024, alokasi: 756900000, realisasi: 703200000, persen_realisasi: 92.9, infra_pct: 50, pemberdayaan_pct: 35, operasional_pct: 15, sumber: "DD+ADD" },
  { id: 15, desa_id: 15, nama_desa: "Gampong Blang Krueng", tahun: 2024, alokasi: 951500000, realisasi: 903120000, persen_realisasi: 94.9, infra_pct: 48, pemberdayaan_pct: 37, operasional_pct: 15, sumber: "DD+ADD" },
];

// ── IDM ───────────────────────────────────────────────────────────────────────
let idmData: Record<string, any>[] = [
  { id: 1, desa_id: 1, nama_desa: "Gampong Cot Glie", tahun: 2024, skor_idm: 0.6842, status_idm: "Berkembang", iks: 0.7123, ike: 0.6534, ikl: 0.6869, skor_sebelumnya: 0.6612, delta: 0.0230 },
  { id: 2, desa_id: 2, nama_desa: "Gampong Meunasah Tuha", tahun: 2024, skor_idm: 0.7534, status_idm: "Maju", iks: 0.7812, ike: 0.7201, ikl: 0.7589, skor_sebelumnya: 0.7234, delta: 0.0300 },
  { id: 3, desa_id: 3, nama_desa: "Gampong Lamjamee", tahun: 2024, skor_idm: 0.6523, status_idm: "Berkembang", iks: 0.6845, ike: 0.6231, ikl: 0.6493, skor_sebelumnya: 0.6321, delta: 0.0202 },
  { id: 4, desa_id: 4, nama_desa: "Gampong Kuta Karang", tahun: 2024, skor_idm: 0.8423, status_idm: "Mandiri", iks: 0.8734, ike: 0.8123, ikl: 0.8412, skor_sebelumnya: 0.8134, delta: 0.0289 },
  { id: 5, desa_id: 5, nama_desa: "Gampong Blang Bintang", tahun: 2024, skor_idm: 0.7823, status_idm: "Maju", iks: 0.8012, ike: 0.7634, ikl: 0.7823, skor_sebelumnya: 0.7512, delta: 0.0311 },
  { id: 6, desa_id: 6, nama_desa: "Gampong Lamreh", tahun: 2024, skor_idm: 0.6712, status_idm: "Berkembang", iks: 0.6934, ike: 0.6523, ikl: 0.6679, skor_sebelumnya: 0.6501, delta: 0.0211 },
  { id: 7, desa_id: 7, nama_desa: "Gampong Siron", tahun: 2024, skor_idm: 0.7234, status_idm: "Maju", iks: 0.7512, ike: 0.6987, ikl: 0.7203, skor_sebelumnya: 0.6934, delta: 0.0300 },
  { id: 8, desa_id: 8, nama_desa: "Gampong Mon Ikeun", tahun: 2024, skor_idm: 0.5623, status_idm: "Tertinggal", iks: 0.5912, ike: 0.5289, ikl: 0.5668, skor_sebelumnya: 0.5401, delta: 0.0222 },
  { id: 9, desa_id: 9, nama_desa: "Gampong Ateuk", tahun: 2024, skor_idm: 0.6934, status_idm: "Berkembang", iks: 0.7201, ike: 0.6678, ikl: 0.6923, skor_sebelumnya: 0.6712, delta: 0.0222 },
  { id: 10, desa_id: 10, nama_desa: "Gampong Baet", tahun: 2024, skor_idm: 0.6445, status_idm: "Berkembang", iks: 0.6712, ike: 0.6189, ikl: 0.6434, skor_sebelumnya: 0.6223, delta: 0.0222 },
  { id: 11, desa_id: 11, nama_desa: "Gampong Tanjong", tahun: 2024, skor_idm: 0.8312, status_idm: "Mandiri", iks: 0.8623, ike: 0.8001, ikl: 0.8312, skor_sebelumnya: 0.8001, delta: 0.0311 },
  { id: 12, desa_id: 12, nama_desa: "Gampong Reudeup", tahun: 2024, skor_idm: 0.5312, status_idm: "Tertinggal", iks: 0.5601, ike: 0.5023, ikl: 0.5312, skor_sebelumnya: 0.5101, delta: 0.0211 },
  { id: 13, desa_id: 13, nama_desa: "Gampong Lamtamot", tahun: 2024, skor_idm: 0.6734, status_idm: "Berkembang", iks: 0.7001, ike: 0.6467, ikl: 0.6734, skor_sebelumnya: 0.6512, delta: 0.0222 },
  { id: 14, desa_id: 14, nama_desa: "Gampong Cot Iri", tahun: 2024, skor_idm: 0.7123, status_idm: "Maju", iks: 0.7412, ike: 0.6845, ikl: 0.7112, skor_sebelumnya: 0.6823, delta: 0.0300 },
  { id: 15, desa_id: 15, nama_desa: "Gampong Blang Krueng", tahun: 2024, skor_idm: 0.7645, status_idm: "Maju", iks: 0.7934, ike: 0.7356, ikl: 0.7645, skor_sebelumnya: 0.7334, delta: 0.0311 },
];

// ── PELAYANAN DESA ────────────────────────────────────────────────────────────
let pelayananData: Record<string, any>[] = [
  { id: 1, nama_desa: "Gampong Cot Glie", jenis: "Pendidikan", nama_fasilitas: "PAUD Cot Glie", status: "Aktif", pengguna_bulan: 45, keterangan: "Gedung permanen, 2 pengajar" },
  { id: 2, nama_desa: "Gampong Cot Glie", jenis: "Kesehatan", nama_fasilitas: "Posyandu Cot Glie", status: "Aktif", pengguna_bulan: 120, keterangan: "Jadwal rutin tiap Selasa" },
  { id: 3, nama_desa: "Gampong Cot Glie", jenis: "Administrasi", nama_fasilitas: "Balai Gampong Cot Glie", status: "Aktif", pengguna_bulan: 89, keterangan: "Online & offline, SIPD terintegrasi" },
  { id: 4, nama_desa: "Gampong Kuta Karang", jenis: "Pendidikan", nama_fasilitas: "TK Tunas Harapan", status: "Aktif", pengguna_bulan: 67, keterangan: "Gedung baru 2023" },
  { id: 5, nama_desa: "Gampong Kuta Karang", jenis: "Kesehatan", nama_fasilitas: "Polindes Kuta Karang", status: "Aktif", pengguna_bulan: 178, keterangan: "1 bidan desa full-time" },
  { id: 6, nama_desa: "Gampong Kuta Karang", jenis: "Ekonomi", nama_fasilitas: "BUMDes Kuta Mandiri", status: "Aktif", pengguna_bulan: 234, keterangan: "Unit usaha: simpan-pinjam, toko desa" },
  { id: 7, nama_desa: "Gampong Kuta Karang", jenis: "Administrasi", nama_fasilitas: "Kantor Gampong Kuta Karang", status: "Aktif", pengguna_bulan: 145, keterangan: "Layanan 5 hari kerja, sistem digital" },
  { id: 8, nama_desa: "Gampong Tanjong", jenis: "Pendidikan", nama_fasilitas: "PAUD Tanjong Jaya", status: "Aktif", pengguna_bulan: 58, keterangan: "2 kelas, kurikulum nasional" },
  { id: 9, nama_desa: "Gampong Tanjong", jenis: "Ekonomi", nama_fasilitas: "BUMDes Tanjong Sejahtera", status: "Aktif", pengguna_bulan: 312, keterangan: "Wisata desa, kios pertanian" },
  { id: 10, nama_desa: "Gampong Tanjong", jenis: "Kesehatan", nama_fasilitas: "Posyandu Balita Tanjong", status: "Aktif", pengguna_bulan: 156, keterangan: "Rutin 2x sebulan" },
  { id: 11, nama_desa: "Gampong Blang Bintang", jenis: "Kesehatan", nama_fasilitas: "Posyandu Blang Bintang", status: "Aktif", pengguna_bulan: 134, keterangan: "Terintegrasi Puskesmas Kuta Malaka" },
  { id: 12, nama_desa: "Gampong Blang Bintang", jenis: "Ekonomi", nama_fasilitas: "Pasar Desa Blang Bintang", status: "Aktif", pengguna_bulan: 567, keterangan: "Aktif tiap Rabu dan Sabtu" },
  { id: 13, nama_desa: "Gampong Siron", jenis: "Pendidikan", nama_fasilitas: "TK Al-Falah Siron", status: "Aktif", pengguna_bulan: 52, keterangan: "Berbasis pesantren" },
  { id: 14, nama_desa: "Gampong Siron", jenis: "Administrasi", nama_fasilitas: "Balai Gampong Siron", status: "Aktif", pengguna_bulan: 98, keterangan: "Renovasi 2023 via Dana Desa" },
  { id: 15, nama_desa: "Gampong Mon Ikeun", jenis: "Kesehatan", nama_fasilitas: "Posyandu Mon Ikeun", status: "Tidak Aktif", pengguna_bulan: 34, keterangan: "Kekurangan kader, butuh intervensi" },
  { id: 16, nama_desa: "Gampong Reudeup", jenis: "Administrasi", nama_fasilitas: "Sekretariat Gampong Reudeup", status: "Aktif", pengguna_bulan: 45, keterangan: "Pelayanan terbatas 3 hari" },
  { id: 17, nama_desa: "Gampong Blang Krueng", jenis: "Ekonomi", nama_fasilitas: "BUMDes Krueng Mandiri", status: "Aktif", pengguna_bulan: 198, keterangan: "Agribisnis dan pengolahan hasil tani" },
  { id: 18, nama_desa: "Gampong Meunasah Tuha", jenis: "Kesehatan", nama_fasilitas: "Posbindu Meunasah Tuha", status: "Aktif", pengguna_bulan: 89, keterangan: "Pemeriksaan lansia rutin" },
  { id: 19, nama_desa: "Gampong Lamtamot", jenis: "Pendidikan", nama_fasilitas: "PAUD Lamtamot Ceria", status: "Aktif", pengguna_bulan: 41, keterangan: "Didukung PKK" },
  { id: 20, nama_desa: "Gampong Ateuk", jenis: "Ekonomi", nama_fasilitas: "Koperasi Desa Ateuk", status: "Aktif", pengguna_bulan: 156, keterangan: "Anggota 120 KK, simpan pinjam" },
];

let nextId = { profil: 16, dana: 16, idm: 16, pelayanan: 21 };

// ── READ ──────────────────────────────────────────────────────────────────────
router.get("/desa/summary", (_req, res) => { res.json(desaSummary); });
router.get("/desa/profil", (_req, res) => { res.json(profilData); });
router.get("/desa/dana", (_req, res) => { res.json(danaDesa); });
router.get("/desa/idm", (_req, res) => { res.json(idmData); });
router.get("/desa/pelayanan", (_req, res) => { res.json(pelayananData); });

// ── UPDATE SUMMARY ────────────────────────────────────────────────────────────
router.put("/desa/summary", (req, res) => {
  desaSummary = { ...desaSummary, ...req.body };
  res.json(desaSummary);
});

// ── PROFIL CRUD ───────────────────────────────────────────────────────────────
router.post("/desa/profil", (req, res) => {
  const r = { ...req.body, id: nextId.profil++ };
  profilData.push(r); res.status(201).json(r);
});
router.put("/desa/profil/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = profilData.findIndex((r) => r.id === id);
  if (idx === -1) { res.status(404).json({ error: "Not found" }); return; }
  profilData[idx] = { ...profilData[idx], ...req.body, id }; res.json(profilData[idx]);
});
router.delete("/desa/profil/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = profilData.length;
  profilData = profilData.filter((r) => r.id !== id);
  if (profilData.length === before) { res.status(404).json({ error: "Not found" }); return; }
  res.status(204).end();
});

// ── DANA CRUD ─────────────────────────────────────────────────────────────────
router.post("/desa/dana", (req, res) => {
  const r = { ...req.body, id: nextId.dana++ };
  danaDesa.push(r); res.status(201).json(r);
});
router.put("/desa/dana/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = danaDesa.findIndex((r) => r.id === id);
  if (idx === -1) { res.status(404).json({ error: "Not found" }); return; }
  danaDesa[idx] = { ...danaDesa[idx], ...req.body, id }; res.json(danaDesa[idx]);
});
router.delete("/desa/dana/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = danaDesa.length;
  danaDesa = danaDesa.filter((r) => r.id !== id);
  if (danaDesa.length === before) { res.status(404).json({ error: "Not found" }); return; }
  res.status(204).end();
});

// ── IDM CRUD ──────────────────────────────────────────────────────────────────
router.post("/desa/idm", (req, res) => {
  const r = { ...req.body, id: nextId.idm++ };
  idmData.push(r); res.status(201).json(r);
});
router.put("/desa/idm/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = idmData.findIndex((r) => r.id === id);
  if (idx === -1) { res.status(404).json({ error: "Not found" }); return; }
  idmData[idx] = { ...idmData[idx], ...req.body, id }; res.json(idmData[idx]);
});
router.delete("/desa/idm/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = idmData.length;
  idmData = idmData.filter((r) => r.id !== id);
  if (idmData.length === before) { res.status(404).json({ error: "Not found" }); return; }
  res.status(204).end();
});

// ── PELAYANAN CRUD ────────────────────────────────────────────────────────────
router.post("/desa/pelayanan", (req, res) => {
  const r = { ...req.body, id: nextId.pelayanan++ };
  pelayananData.push(r); res.status(201).json(r);
});
router.put("/desa/pelayanan/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = pelayananData.findIndex((r) => r.id === id);
  if (idx === -1) { res.status(404).json({ error: "Not found" }); return; }
  pelayananData[idx] = { ...pelayananData[idx], ...req.body, id }; res.json(pelayananData[idx]);
});
router.delete("/desa/pelayanan/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = pelayananData.length;
  pelayananData = pelayananData.filter((r) => r.id !== id);
  if (pelayananData.length === before) { res.status(404).json({ error: "Not found" }); return; }
  res.status(204).end();
});

export default router;
