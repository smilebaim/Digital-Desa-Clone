import { Router } from "express";

const router = Router();

// ── SUMMARY KPIs ─────────────────────────────────────────────────────────────
let desaSummary: Record<string, any> = {
  totalDesa: 15,
  totalPenduduk: 16348,
  totalKK: 4012,
  totalLuasHa: 3124.7,
  totalDanaDesa2024: 16875000000,
  rataRealisasiPct: 88.6,
  rataSkorIDM: 0.7134,
  desaMandiri: 2,
  desaMaju: 6,
  desaBerkembang: 5,
  desaTertinggal: 2,
  desaSangatTertinggal: 0,
  kecamatan: "Sekernan",
  kabupaten: "Muaro Jambi",
  provinsi: "Jambi",
  lastUpdate: "30 Mei 2026, 08:00 WIB",
};

// ── PROFIL DESA ───────────────────────────────────────────────────────────────
let profilData: Record<string, any>[] = [
  { id: 1,  nama: "Desa Sekernan",      kecamatan: "Sekernan", kabupaten: "Muaro Jambi", luas_ha: 248.5, jumlah_penduduk: 1523, jumlah_kk: 378, kepala_desa: "Marjono",          jenis_desa: "Maju",              lat: -1.5812, lng: 103.5634, tahun_berdiri: 1945 },
  { id: 2,  nama: "Desa Pondok Meja",   kecamatan: "Sekernan", kabupaten: "Muaro Jambi", luas_ha: 312.1, jumlah_penduduk: 1876, jumlah_kk: 461, kepala_desa: "Wahyu Santoso",    jenis_desa: "Mandiri",           lat: -1.5634, lng: 103.5489, tahun_berdiri: 1932 },
  { id: 3,  nama: "Desa Arang-Arang",   kecamatan: "Sekernan", kabupaten: "Muaro Jambi", luas_ha: 187.4, jumlah_penduduk: 987,  jumlah_kk: 241, kepala_desa: "Heru Prasetyo",    jenis_desa: "Berkembang",        lat: -1.6023, lng: 103.5312, tahun_berdiri: 1950 },
  { id: 4,  nama: "Desa Berembang",     kecamatan: "Sekernan", kabupaten: "Muaro Jambi", luas_ha: 276.8, jumlah_penduduk: 1412, jumlah_kk: 347, kepala_desa: "Slamet Riyadi",    jenis_desa: "Maju",              lat: -1.6189, lng: 103.5178, tahun_berdiri: 1928 },
  { id: 5,  nama: "Desa Sungai Rotan",  kecamatan: "Sekernan", kabupaten: "Muaro Jambi", luas_ha: 203.6, jumlah_penduduk: 1134, jumlah_kk: 278, kepala_desa: "Bambang Sutrisno", jenis_desa: "Berkembang",        lat: -1.6345, lng: 103.5456, tahun_berdiri: 1938 },
  { id: 6,  nama: "Desa Gerunggung",    kecamatan: "Sekernan", kabupaten: "Muaro Jambi", luas_ha: 159.3, jumlah_penduduk: 823,  jumlah_kk: 201, kepala_desa: "Edi Purwanto",     jenis_desa: "Berkembang",        lat: -1.6512, lng: 103.5623, tahun_berdiri: 1955 },
  { id: 7,  nama: "Desa Tanjung Katung",kecamatan: "Sekernan", kabupaten: "Muaro Jambi", luas_ha: 234.7, jumlah_penduduk: 1267, jumlah_kk: 312, kepala_desa: "Tri Wibowo",       jenis_desa: "Maju",              lat: -1.6678, lng: 103.5789, tahun_berdiri: 1942 },
  { id: 8,  nama: "Desa Kilangan",      kecamatan: "Sekernan", kabupaten: "Muaro Jambi", luas_ha: 148.9, jumlah_penduduk: 734,  jumlah_kk: 179, kepala_desa: "Agus Supriyadi",   jenis_desa: "Tertinggal",        lat: -1.6834, lng: 103.5934, tahun_berdiri: 1960 },
  { id: 9,  nama: "Desa Tunas Baru",    kecamatan: "Sekernan", kabupaten: "Muaro Jambi", luas_ha: 298.2, jumlah_penduduk: 1589, jumlah_kk: 392, kepala_desa: "Dwi Cahyono",      jenis_desa: "Mandiri",           lat: -1.6156, lng: 103.6012, tahun_berdiri: 1948 },
  { id: 10, nama: "Desa Parit Culum",   kecamatan: "Sekernan", kabupaten: "Muaro Jambi", luas_ha: 167.4, jumlah_penduduk: 856,  jumlah_kk: 211, kepala_desa: "Supri Hartono",    jenis_desa: "Berkembang",        lat: -1.6289, lng: 103.6167, tahun_berdiri: 1952 },
  { id: 11, nama: "Desa Mekar Jaya",    kecamatan: "Sekernan", kabupaten: "Muaro Jambi", luas_ha: 213.5, jumlah_penduduk: 1145, jumlah_kk: 282, kepala_desa: "Jumadi",           jenis_desa: "Maju",              lat: -1.5956, lng: 103.6234, tahun_berdiri: 1935 },
  { id: 12, nama: "Desa Sungai Gelam",  kecamatan: "Sekernan", kabupaten: "Muaro Jambi", luas_ha: 178.6, jumlah_penduduk: 923,  jumlah_kk: 228, kepala_desa: "Rusdi Effendi",    jenis_desa: "Maju",              lat: -1.5789, lng: 103.6389, tahun_berdiri: 1957 },
  { id: 13, nama: "Desa Karya Maju",    kecamatan: "Sekernan", kabupaten: "Muaro Jambi", luas_ha: 289.1, jumlah_penduduk: 1423, jumlah_kk: 351, kepala_desa: "Purnomo",          jenis_desa: "Maju",              lat: -1.5623, lng: 103.6512, tahun_berdiri: 1943 },
  { id: 14, nama: "Desa Bukit Baling",  kecamatan: "Sekernan", kabupaten: "Muaro Jambi", luas_ha: 134.7, jumlah_penduduk: 612,  jumlah_kk: 150, kepala_desa: "Sutomo",           jenis_desa: "Tertinggal",        lat: -1.7012, lng: 103.5567, tahun_berdiri: 1965 },
  { id: 15, nama: "Desa Muara Sebapo",  kecamatan: "Sekernan", kabupaten: "Muaro Jambi", luas_ha: 371.9, jumlah_penduduk: 1844, jumlah_kk: 455, kepala_desa: "Hariyanto",        jenis_desa: "Maju",              lat: -1.7178, lng: 103.5234, tahun_berdiri: 1939 },
];

// ── DANA DESA ─────────────────────────────────────────────────────────────────
let danaDesa: Record<string, any>[] = [
  { id: 1,  desa_id: 1,  nama_desa: "Desa Sekernan",       tahun: 2024, alokasi: 1087500000, realisasi: 1021300000, persen_realisasi: 93.9, infra_pct: 52, pemberdayaan_pct: 33, operasional_pct: 15, sumber: "DD+ADD" },
  { id: 2,  desa_id: 2,  nama_desa: "Desa Pondok Meja",    tahun: 2024, alokasi: 1234600000, realisasi: 1212500000, persen_realisasi: 98.2, infra_pct: 45, pemberdayaan_pct: 40, operasional_pct: 15, sumber: "DD+ADD" },
  { id: 3,  desa_id: 3,  nama_desa: "Desa Arang-Arang",    tahun: 2024, alokasi: 843800000,  realisasi: 701650000,  persen_realisasi: 83.2, infra_pct: 60, pemberdayaan_pct: 25, operasional_pct: 15, sumber: "DD+ADD" },
  { id: 4,  desa_id: 4,  nama_desa: "Desa Berembang",      tahun: 2024, alokasi: 1089700000, realisasi: 1034300000, persen_realisasi: 94.9, infra_pct: 48, pemberdayaan_pct: 37, operasional_pct: 15, sumber: "DD+ADD" },
  { id: 5,  desa_id: 5,  nama_desa: "Desa Sungai Rotan",   tahun: 2024, alokasi: 934600000,  realisasi: 812300000,  persen_realisasi: 86.9, infra_pct: 55, pemberdayaan_pct: 30, operasional_pct: 15, sumber: "DD+ADD" },
  { id: 6,  desa_id: 6,  nama_desa: "Desa Gerunggung",     tahun: 2024, alokasi: 812300000,  realisasi: 698900000,  persen_realisasi: 86.0, infra_pct: 58, pemberdayaan_pct: 27, operasional_pct: 15, sumber: "DD+ADD" },
  { id: 7,  desa_id: 7,  nama_desa: "Desa Tanjung Katung", tahun: 2024, alokasi: 1056900000, realisasi: 1003200000, persen_realisasi: 94.9, infra_pct: 50, pemberdayaan_pct: 35, operasional_pct: 15, sumber: "DD+ADD" },
  { id: 8,  desa_id: 8,  nama_desa: "Desa Kilangan",       tahun: 2024, alokasi: 687400000,  realisasi: 512300000,  persen_realisasi: 74.5, infra_pct: 65, pemberdayaan_pct: 20, operasional_pct: 15, sumber: "DD+ADD" },
  { id: 9,  desa_id: 9,  nama_desa: "Desa Tunas Baru",     tahun: 2024, alokasi: 1267300000, realisasi: 1245600000, persen_realisasi: 98.3, infra_pct: 42, pemberdayaan_pct: 43, operasional_pct: 15, sumber: "DD+ADD" },
  { id: 10, desa_id: 10, nama_desa: "Desa Parit Culum",    tahun: 2024, alokasi: 798500000,  realisasi: 671200000,  persen_realisasi: 84.1, infra_pct: 57, pemberdayaan_pct: 28, operasional_pct: 15, sumber: "DD+ADD" },
  { id: 11, desa_id: 11, nama_desa: "Desa Mekar Jaya",     tahun: 2024, alokasi: 967800000,  realisasi: 934600000,  persen_realisasi: 96.6, infra_pct: 47, pemberdayaan_pct: 38, operasional_pct: 15, sumber: "DD+ADD" },
  { id: 12, desa_id: 12, nama_desa: "Desa Sungai Gelam",   tahun: 2024, alokasi: 867300000,  realisasi: 823450000,  persen_realisasi: 94.9, infra_pct: 53, pemberdayaan_pct: 32, operasional_pct: 15, sumber: "DD+ADD" },
  { id: 13, desa_id: 13, nama_desa: "Desa Karya Maju",     tahun: 2024, alokasi: 1123400000, realisasi: 1089500000, persen_realisasi: 97.0, infra_pct: 48, pemberdayaan_pct: 37, operasional_pct: 15, sumber: "DD+ADD" },
  { id: 14, desa_id: 14, nama_desa: "Desa Bukit Baling",   tahun: 2024, alokasi: 623400000,  realisasi: 498700000,  persen_realisasi: 80.0, infra_pct: 67, pemberdayaan_pct: 18, operasional_pct: 15, sumber: "DD+ADD" },
  { id: 15, desa_id: 15, nama_desa: "Desa Muara Sebapo",   tahun: 2024, alokasi: 1378700000, realisasi: 1323100000, persen_realisasi: 96.0, infra_pct: 44, pemberdayaan_pct: 41, operasional_pct: 15, sumber: "DD+ADD" },
];

// ── IDM ───────────────────────────────────────────────────────────────────────
let idmData: Record<string, any>[] = [
  { id: 1,  desa_id: 1,  nama_desa: "Desa Sekernan",       tahun: 2024, skor_idm: 0.7534, status_idm: "Maju",        iks: 0.7812, ike: 0.7201, ikl: 0.7589, skor_sebelumnya: 0.7234, delta: 0.0300 },
  { id: 2,  desa_id: 2,  nama_desa: "Desa Pondok Meja",    tahun: 2024, skor_idm: 0.8423, status_idm: "Mandiri",     iks: 0.8734, ike: 0.8123, ikl: 0.8412, skor_sebelumnya: 0.8134, delta: 0.0289 },
  { id: 3,  desa_id: 3,  nama_desa: "Desa Arang-Arang",    tahun: 2024, skor_idm: 0.6523, status_idm: "Berkembang",  iks: 0.6845, ike: 0.6231, ikl: 0.6493, skor_sebelumnya: 0.6321, delta: 0.0202 },
  { id: 4,  desa_id: 4,  nama_desa: "Desa Berembang",      tahun: 2024, skor_idm: 0.7823, status_idm: "Maju",        iks: 0.8012, ike: 0.7634, ikl: 0.7823, skor_sebelumnya: 0.7512, delta: 0.0311 },
  { id: 5,  desa_id: 5,  nama_desa: "Desa Sungai Rotan",   tahun: 2024, skor_idm: 0.6842, status_idm: "Berkembang",  iks: 0.7123, ike: 0.6534, ikl: 0.6869, skor_sebelumnya: 0.6612, delta: 0.0230 },
  { id: 6,  desa_id: 6,  nama_desa: "Desa Gerunggung",     tahun: 2024, skor_idm: 0.6712, status_idm: "Berkembang",  iks: 0.6934, ike: 0.6523, ikl: 0.6679, skor_sebelumnya: 0.6501, delta: 0.0211 },
  { id: 7,  desa_id: 7,  nama_desa: "Desa Tanjung Katung", tahun: 2024, skor_idm: 0.7234, status_idm: "Maju",        iks: 0.7512, ike: 0.6987, ikl: 0.7203, skor_sebelumnya: 0.6934, delta: 0.0300 },
  { id: 8,  desa_id: 8,  nama_desa: "Desa Kilangan",       tahun: 2024, skor_idm: 0.5623, status_idm: "Tertinggal",  iks: 0.5912, ike: 0.5289, ikl: 0.5668, skor_sebelumnya: 0.5401, delta: 0.0222 },
  { id: 9,  desa_id: 9,  nama_desa: "Desa Tunas Baru",     tahun: 2024, skor_idm: 0.8312, status_idm: "Mandiri",     iks: 0.8623, ike: 0.8001, ikl: 0.8312, skor_sebelumnya: 0.8001, delta: 0.0311 },
  { id: 10, desa_id: 10, nama_desa: "Desa Parit Culum",    tahun: 2024, skor_idm: 0.6445, status_idm: "Berkembang",  iks: 0.6712, ike: 0.6189, ikl: 0.6434, skor_sebelumnya: 0.6223, delta: 0.0222 },
  { id: 11, desa_id: 11, nama_desa: "Desa Mekar Jaya",     tahun: 2024, skor_idm: 0.7645, status_idm: "Maju",        iks: 0.7934, ike: 0.7356, ikl: 0.7645, skor_sebelumnya: 0.7334, delta: 0.0311 },
  { id: 12, desa_id: 12, nama_desa: "Desa Sungai Gelam",   tahun: 2024, skor_idm: 0.7123, status_idm: "Maju",        iks: 0.7412, ike: 0.6845, ikl: 0.7112, skor_sebelumnya: 0.6823, delta: 0.0300 },
  { id: 13, desa_id: 13, nama_desa: "Desa Karya Maju",     tahun: 2024, skor_idm: 0.7934, status_idm: "Maju",        iks: 0.8201, ike: 0.7678, ikl: 0.7923, skor_sebelumnya: 0.7612, delta: 0.0322 },
  { id: 14, desa_id: 14, nama_desa: "Desa Bukit Baling",   tahun: 2024, skor_idm: 0.5312, status_idm: "Tertinggal",  iks: 0.5601, ike: 0.5023, ikl: 0.5312, skor_sebelumnya: 0.5101, delta: 0.0211 },
  { id: 15, desa_id: 15, nama_desa: "Desa Muara Sebapo",   tahun: 2024, skor_idm: 0.7912, status_idm: "Maju",        iks: 0.8189, ike: 0.7645, ikl: 0.7902, skor_sebelumnya: 0.7601, delta: 0.0311 },
];

// ── PELAYANAN ─────────────────────────────────────────────────────────────────
let pelayananData: Record<string, any>[] = [
  { id: 1,  desa_id: 1,  nama_desa: "Desa Sekernan",       jenis: "Kesehatan",    nama_layanan: "Posyandu Melati",         status: "Aktif",  jumlah_penerima: 312, frekuensi: "Bulanan",  petugas: "Bidan Sari" },
  { id: 2,  desa_id: 2,  nama_desa: "Desa Pondok Meja",    jenis: "Pendidikan",   nama_layanan: "PAUD Ceria",              status: "Aktif",  jumlah_penerima: 45,  frekuensi: "Harian",   petugas: "Ibu Wati" },
  { id: 3,  desa_id: 3,  nama_desa: "Desa Arang-Arang",    jenis: "Administrasi", nama_layanan: "Pelayanan KTP & KK",      status: "Aktif",  jumlah_penerima: 134, frekuensi: "Harian",   petugas: "Pak Joko" },
  { id: 4,  desa_id: 4,  nama_desa: "Desa Berembang",      jenis: "Sosial",       nama_layanan: "Bantuan PKH",             status: "Aktif",  jumlah_penerima: 89,  frekuensi: "Triwulan", petugas: "Bu Sri" },
  { id: 5,  desa_id: 5,  nama_desa: "Desa Sungai Rotan",   jenis: "Kesehatan",    nama_layanan: "Posyandu Mawar",          status: "Aktif",  jumlah_penerima: 245, frekuensi: "Bulanan",  petugas: "Bidan Tini" },
  { id: 6,  desa_id: 6,  nama_desa: "Desa Gerunggung",     jenis: "Infrastruktur",nama_layanan: "Pengairan Sawah",         status: "Proses", jumlah_penerima: 156, frekuensi: "Musiman",  petugas: "Pak Budi" },
  { id: 7,  desa_id: 7,  nama_desa: "Desa Tanjung Katung", jenis: "Pendidikan",   nama_layanan: "TPA Al-Ikhlas",           status: "Aktif",  jumlah_penerima: 78,  frekuensi: "Harian",   petugas: "Ustadz Amin" },
  { id: 8,  desa_id: 8,  nama_desa: "Desa Kilangan",       jenis: "Ekonomi",      nama_layanan: "BUMDes Maju Bersama",     status: "Aktif",  jumlah_penerima: 67,  frekuensi: "Harian",   petugas: "Pak Supri" },
  { id: 9,  desa_id: 9,  nama_desa: "Desa Tunas Baru",     jenis: "Kesehatan",    nama_layanan: "Polindes Tunas Sehat",    status: "Aktif",  jumlah_penerima: 389, frekuensi: "Harian",   petugas: "Bidan Rina" },
  { id: 10, desa_id: 10, nama_desa: "Desa Parit Culum",    jenis: "Sosial",       nama_layanan: "Lansia Bahagia",          status: "Aktif",  jumlah_penerima: 112, frekuensi: "Mingguan", petugas: "Ibu Siti" },
  { id: 11, desa_id: 11, nama_desa: "Desa Mekar Jaya",     jenis: "Administrasi", nama_layanan: "Kependudukan Digital",    status: "Aktif",  jumlah_penerima: 289, frekuensi: "Harian",   petugas: "Pak Hendra" },
  { id: 12, desa_id: 12, nama_desa: "Desa Sungai Gelam",   jenis: "Pendidikan",   nama_layanan: "Beasiswa Anak Desa",      status: "Aktif",  jumlah_penerima: 34,  frekuensi: "Tahunan",  petugas: "Bu Wulan" },
  { id: 13, desa_id: 13, nama_desa: "Desa Karya Maju",     jenis: "Ekonomi",      nama_layanan: "Koperasi Tani Sejahtera", status: "Aktif",  jumlah_penerima: 145, frekuensi: "Bulanan",  petugas: "Pak Ridwan" },
  { id: 14, desa_id: 14, nama_desa: "Desa Bukit Baling",   jenis: "Kesehatan",    nama_layanan: "Posyandu Anggrek",        status: "Nonaktif",jumlah_penerima: 98, frekuensi: "Bulanan",  petugas: "Bidan Dewi" },
  { id: 15, desa_id: 15, nama_desa: "Desa Muara Sebapo",   jenis: "Infrastruktur",nama_layanan: "Jalan Usaha Tani",        status: "Aktif",  jumlah_penerima: 412, frekuensi: "Harian",   petugas: "Pak Agus" },
];

// ── ROUTES ────────────────────────────────────────────────────────────────────

// GET /api/desa/summary
router.get("/summary", (req, res) => {
  res.json(desaSummary);
});

// PUT /api/desa/summary
router.put("/summary", (req, res) => {
  desaSummary = { ...desaSummary, ...req.body };
  res.json(desaSummary);
});

// GET /api/desa/profil
router.get("/profil", (req, res) => {
  res.json(profilData);
});

// GET /api/desa/profil/:id
router.get("/profil/:id", (req, res) => {
  const item = profilData.find((d) => d.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// POST /api/desa/profil
router.post("/profil", (req, res) => {
  const newItem = { ...req.body, id: Date.now() };
  profilData.push(newItem);
  res.status(201).json(newItem);
});

// PUT /api/desa/profil/:id
router.put("/profil/:id", (req, res) => {
  const idx = profilData.findIndex((d) => d.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  profilData[idx] = { ...profilData[idx], ...req.body };
  res.json(profilData[idx]);
});

// DELETE /api/desa/profil/:id
router.delete("/profil/:id", (req, res) => {
  const idx = profilData.findIndex((d) => d.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  profilData.splice(idx, 1);
  res.status(204).send();
});

// GET /api/desa/dana
router.get("/dana", (req, res) => {
  res.json(danaDesa);
});

// GET /api/desa/dana/:id
router.get("/dana/:id", (req, res) => {
  const item = danaDesa.find((d) => d.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// POST /api/desa/dana
router.post("/dana", (req, res) => {
  const newItem = { ...req.body, id: Date.now() };
  danaDesa.push(newItem);
  res.status(201).json(newItem);
});

// PUT /api/desa/dana/:id
router.put("/dana/:id", (req, res) => {
  const idx = danaDesa.findIndex((d) => d.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  danaDesa[idx] = { ...danaDesa[idx], ...req.body };
  res.json(danaDesa[idx]);
});

// DELETE /api/desa/dana/:id
router.delete("/dana/:id", (req, res) => {
  const idx = danaDesa.findIndex((d) => d.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  danaDesa.splice(idx, 1);
  res.status(204).send();
});

// GET /api/desa/idm
router.get("/idm", (req, res) => {
  res.json(idmData);
});

// GET /api/desa/idm/:id
router.get("/idm/:id", (req, res) => {
  const item = idmData.find((d) => d.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// POST /api/desa/idm
router.post("/idm", (req, res) => {
  const newItem = { ...req.body, id: Date.now() };
  idmData.push(newItem);
  res.status(201).json(newItem);
});

// PUT /api/desa/idm/:id
router.put("/idm/:id", (req, res) => {
  const idx = idmData.findIndex((d) => d.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  idmData[idx] = { ...idmData[idx], ...req.body };
  res.json(idmData[idx]);
});

// DELETE /api/desa/idm/:id
router.delete("/idm/:id", (req, res) => {
  const idx = idmData.findIndex((d) => d.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  idmData.splice(idx, 1);
  res.status(204).send();
});

// GET /api/desa/pelayanan
router.get("/pelayanan", (req, res) => {
  res.json(pelayananData);
});

// GET /api/desa/pelayanan/:id
router.get("/pelayanan/:id", (req, res) => {
  const item = pelayananData.find((d) => d.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// POST /api/desa/pelayanan
router.post("/pelayanan", (req, res) => {
  const newItem = { ...req.body, id: Date.now() };
  pelayananData.push(newItem);
  res.status(201).json(newItem);
});

// PUT /api/desa/pelayanan/:id
router.put("/pelayanan/:id", (req, res) => {
  const idx = pelayananData.findIndex((d) => d.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  pelayananData[idx] = { ...pelayananData[idx], ...req.body };
  res.json(pelayananData[idx]);
});

// DELETE /api/desa/pelayanan/:id
router.delete("/pelayanan/:id", (req, res) => {
  const idx = pelayananData.findIndex((d) => d.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  pelayananData.splice(idx, 1);
  res.status(204).send();
});

export default router;
