import { Router } from "express";

const router = Router();

let bencanaSummary: Record<string, any> = {
  totalKorban: 47,
  totalPengungsi: 3842,
  titikPengungsian: 23,
  rumahRusak: 1256,
  sawahHa: 847.5,
  kabupatenTerdampak: 8,
  fasumRusak: 34,
  kebunHa: 312.0,
  tambakHa: 89.5,
  rekapCluster: {
    kerusakan: "Rp 12,4 M",
    kerugian: "Rp 8,7 M",
    total: "Rp 21,1 M",
    perSektor: [
      { nama: "Permukiman", nilai: "Rp 7,2 M" },
      { nama: "Pertanian", nilai: "Rp 4,8 M" },
      { nama: "Infrastruktur", nilai: "Rp 5,1 M" },
      { nama: "Sosial", nilai: "Rp 2,3 M" },
      { nama: "Ekonomi", nilai: "Rp 1,7 M" },
    ],
  },
  faskes: { puskesmas: 12, rsud: 3, fasyankes: 8 },
  jaringan: { critical: 4, warning: 7, normal: 15 },
  posko: { totalPosko: 23, totalPengungsi: 3842, titikPengungsian: 23 },
  bantuan: { totalDesa: 142, kuning: 58, biru: 34, abu: 21, putih: 29 },
  lastUpdate: "27 Mei 2025, 14:30 WIB",
};

let dampakData: Record<string, any>[] = [
  { id: 1, kabupaten: "Aceh Besar", kecamatan: "Kuta Baro", jenisKejadian: "Banjir", korbanJiwa: 0, korbanLuka: 3, rumahRusakBerat: 12, rumahRusakRingan: 45, sawahTerdampakHa: 120.5, tanggal: "2025-05-24", status: "Siaga" },
  { id: 2, kabupaten: "Aceh Besar", kecamatan: "Darul Imarah", jenisKejadian: "Banjir", korbanJiwa: 0, korbanLuka: 0, rumahRusakBerat: 5, rumahRusakRingan: 28, sawahTerdampakHa: 75.0, tanggal: "2025-05-24", status: "Waspada" },
  { id: 3, kabupaten: "Pidie", kecamatan: "Padang Tiji", jenisKejadian: "Longsor", korbanJiwa: 2, korbanLuka: 8, rumahRusakBerat: 18, rumahRusakRingan: 22, sawahTerdampakHa: 43.0, tanggal: "2025-05-23", status: "Siaga" },
  { id: 4, kabupaten: "Pidie Jaya", kecamatan: "Bandar Baru", jenisKejadian: "Banjir Bandang", korbanJiwa: 1, korbanLuka: 12, rumahRusakBerat: 34, rumahRusakRingan: 67, sawahTerdampakHa: 210.0, tanggal: "2025-05-23", status: "Siaga" },
  { id: 5, kabupaten: "Bireuen", kecamatan: "Kota Juang", jenisKejadian: "Banjir", korbanJiwa: 0, korbanLuka: 0, rumahRusakBerat: 8, rumahRusakRingan: 55, sawahTerdampakHa: 95.5, tanggal: "2025-05-22", status: "Waspada" },
  { id: 6, kabupaten: "Bireuen", kecamatan: "Peusangan", jenisKejadian: "Banjir", korbanJiwa: 0, korbanLuka: 2, rumahRusakBerat: 15, rumahRusakRingan: 42, sawahTerdampakHa: 88.0, tanggal: "2025-05-22", status: "Siaga" },
  { id: 7, kabupaten: "Aceh Utara", kecamatan: "Sawang", jenisKejadian: "Banjir", korbanJiwa: 0, korbanLuka: 1, rumahRusakBerat: 9, rumahRusakRingan: 38, sawahTerdampakHa: 67.0, tanggal: "2025-05-21", status: "Waspada" },
  { id: 8, kabupaten: "Aceh Utara", kecamatan: "Nisam", jenisKejadian: "Longsor", korbanJiwa: 1, korbanLuka: 4, rumahRusakBerat: 7, rumahRusakRingan: 14, sawahTerdampakHa: 22.5, tanggal: "2025-05-21", status: "Siaga" },
  { id: 9, kabupaten: "Aceh Timur", kecamatan: "Idi Rayeuk", jenisKejadian: "Banjir", korbanJiwa: 0, korbanLuka: 0, rumahRusakBerat: 4, rumahRusakRingan: 29, sawahTerdampakHa: 55.0, tanggal: "2025-05-20", status: "Aman" },
  { id: 10, kabupaten: "Aceh Timur", kecamatan: "Peureulak", jenisKejadian: "Abrasi", korbanJiwa: 0, korbanLuka: 0, rumahRusakBerat: 11, rumahRusakRingan: 18, sawahTerdampakHa: 0, tanggal: "2025-05-20", status: "Waspada" },
  { id: 11, kabupaten: "Aceh Tamiang", kecamatan: "Karang Baru", jenisKejadian: "Banjir", korbanJiwa: 0, korbanLuka: 3, rumahRusakBerat: 6, rumahRusakRingan: 33, sawahTerdampakHa: 44.5, tanggal: "2025-05-19", status: "Waspada" },
  { id: 12, kabupaten: "Aceh Tamiang", kecamatan: "Bendahara", jenisKejadian: "Banjir", korbanJiwa: 0, korbanLuka: 0, rumahRusakBerat: 3, rumahRusakRingan: 21, sawahTerdampakHa: 26.5, tanggal: "2025-05-19", status: "Aman" },
  { id: 13, kabupaten: "Aceh Jaya", kecamatan: "Sampoinet", jenisKejadian: "Longsor", korbanJiwa: 0, korbanLuka: 6, rumahRusakBerat: 14, rumahRusakRingan: 19, sawahTerdampakHa: 0, tanggal: "2025-05-18", status: "Siaga" },
  { id: 14, kabupaten: "Simeulue", kecamatan: "Simeulue Timur", jenisKejadian: "Abrasi", korbanJiwa: 0, korbanLuka: 0, rumahRusakBerat: 8, rumahRusakRingan: 11, sawahTerdampakHa: 0, tanggal: "2025-05-17", status: "Waspada" },
];

let pertanianData: Record<string, any>[] = [
  { id: 1, nama: "Sawah Irigasi Kuta Baro", kabupaten: "Aceh Besar", kecamatan: "Kuta Baro", volume: 85.5, kerugian: "Rp 427.500.000", kondisi: "Berat" },
  { id: 2, nama: "Kebun Pisang Darul Imarah", kabupaten: "Aceh Besar", kecamatan: "Darul Imarah", volume: 22.0, kerugian: "Rp 132.000.000", kondisi: "Ringan" },
  { id: 3, nama: "Sawah Tadah Hujan Padang Tiji", kabupaten: "Pidie", kecamatan: "Padang Tiji", volume: 43.0, kerugian: "Rp 258.000.000", kondisi: "Berat" },
  { id: 4, nama: "Perkebunan Karet Bandar Baru", kabupaten: "Pidie Jaya", kecamatan: "Bandar Baru", volume: 120.0, kerugian: "Rp 840.000.000", kondisi: "Berat" },
  { id: 5, nama: "Tambak Udang Peureulak", kabupaten: "Aceh Timur", kecamatan: "Peureulak", volume: 45.5, kerugian: "Rp 682.500.000", kondisi: "Berat" },
  { id: 6, nama: "Sawah Irigasi Kota Juang", kabupaten: "Bireuen", kecamatan: "Kota Juang", volume: 65.5, kerugian: "Rp 327.500.000", kondisi: "Sedang" },
  { id: 7, nama: "Kebun Kelapa Sawit Sawang", kabupaten: "Aceh Utara", kecamatan: "Sawang", volume: 38.0, kerugian: "Rp 266.000.000", kondisi: "Ringan" },
  { id: 8, nama: "Tambak Bandeng Karang Baru", kabupaten: "Aceh Tamiang", kecamatan: "Karang Baru", volume: 28.5, kerugian: "Rp 342.000.000", kondisi: "Sedang" },
  { id: 9, nama: "Kebun Cengkeh Sampoinet", kabupaten: "Aceh Jaya", kecamatan: "Sampoinet", volume: 55.0, kerugian: "Rp 495.000.000", kondisi: "Berat" },
  { id: 10, nama: "Sawah Lebak Peusangan", kabupaten: "Bireuen", kecamatan: "Peusangan", volume: 52.0, kerugian: "Rp 208.000.000", kondisi: "Ringan" },
];

let pendudukData: Record<string, any>[] = [
  { id: 1, kabupaten: "Aceh Besar", penduduk: 432850, kk: 108213, disabilitas: 1245, pengungsi: 287 },
  { id: 2, kabupaten: "Pidie", penduduk: 398124, kk: 99531, disabilitas: 1087, pengungsi: 378 },
  { id: 3, kabupaten: "Pidie Jaya", penduduk: 164285, kk: 41071, disabilitas: 476, pengungsi: 1035 },
  { id: 4, kabupaten: "Bireuen", penduduk: 452693, kk: 113173, disabilitas: 1325, pengungsi: 476 },
  { id: 5, kabupaten: "Aceh Utara", penduduk: 598742, kk: 149686, disabilitas: 1764, pengungsi: 231 },
  { id: 6, kabupaten: "Aceh Timur", penduduk: 409853, kk: 102463, disabilitas: 1198, pengungsi: 334 },
  { id: 7, kabupaten: "Aceh Tamiang", penduduk: 290384, kk: 72596, disabilitas: 847, pengungsi: 193 },
  { id: 8, kabupaten: "Aceh Jaya", penduduk: 92456, kk: 23114, disabilitas: 268, pengungsi: 267 },
  { id: 9, kabupaten: "Simeulue", penduduk: 98543, kk: 24636, disabilitas: 286, pengungsi: 161 },
];

let orangHilangData: Record<string, any>[] = [
  { id: 1, nama: "Ahmad Fauzi", usia: 34, kecamatan: "Padang Tiji", kabupaten: "Pidie", status: "Dicari", tanggal: "2025-05-23" },
  { id: 2, nama: "Siti Rahma", usia: 12, kecamatan: "Bandar Baru", kabupaten: "Pidie Jaya", status: "Ditemukan", tanggal: "2025-05-23" },
  { id: 3, nama: "Zulkifli Harun", usia: 58, kecamatan: "Nisam", kabupaten: "Aceh Utara", status: "Dicari", tanggal: "2025-05-21" },
  { id: 4, nama: "Nurjanah", usia: 67, kecamatan: "Sampoinet", kabupaten: "Aceh Jaya", status: "Dicari", tanggal: "2025-05-18" },
  { id: 5, nama: "Muhammad Rizki", usia: 8, kecamatan: "Bandar Baru", kabupaten: "Pidie Jaya", status: "Ditemukan", tanggal: "2025-05-24" },
];

let bantuanDesaData: Record<string, any>[] = [
  { id: 1, desa: "Gampong Cot Bak U", kecamatan: "Kuta Baro", kabupaten: "Aceh Besar", satuan: "Kecamatan Kuta Baro", warna: "kuning" },
  { id: 2, desa: "Gampong Lampisang", kecamatan: "Darul Imarah", kabupaten: "Aceh Besar", satuan: "Kecamatan Darul Imarah", warna: "kuning" },
  { id: 3, desa: "Gampong Blang Mee", kecamatan: "Padang Tiji", kabupaten: "Pidie", satuan: "Kecamatan Padang Tiji", warna: "kuning" },
  { id: 4, desa: "Gampong Pante Rawa", kecamatan: "Bandar Baru", kabupaten: "Pidie Jaya", satuan: "Kecamatan Bandar Baru", warna: "biru" },
  { id: 5, desa: "Gampong Krueng Baro", kecamatan: "Bandar Baru", kabupaten: "Pidie Jaya", satuan: "Kecamatan Bandar Baru", warna: "biru" },
  { id: 6, desa: "Gampong Jangka Mesjid", kecamatan: "Kota Juang", kabupaten: "Bireuen", satuan: "Kecamatan Kota Juang", warna: "kuning" },
  { id: 7, desa: "Gampong Pulo Pisang", kecamatan: "Peusangan", kabupaten: "Bireuen", satuan: "Kecamatan Peusangan", warna: "biru_keabuan" },
  { id: 8, desa: "Gampong Sawang Barat", kecamatan: "Sawang", kabupaten: "Aceh Utara", satuan: "Kecamatan Sawang", warna: "kuning" },
  { id: 9, desa: "Gampong Krueng Kiran", kecamatan: "Nisam", kabupaten: "Aceh Utara", satuan: "Kecamatan Nisam", warna: "putih" },
  { id: 10, desa: "Gampong Idi Cut", kecamatan: "Idi Rayeuk", kabupaten: "Aceh Timur", satuan: "Kecamatan Idi Rayeuk", warna: "kuning" },
  { id: 11, desa: "Gampong Alur Manis", kecamatan: "Peureulak", kabupaten: "Aceh Timur", satuan: "Kecamatan Peureulak", warna: "biru_keabuan" },
  { id: 12, desa: "Gampong Karang Jadi", kecamatan: "Karang Baru", kabupaten: "Aceh Tamiang", satuan: "Kecamatan Karang Baru", warna: "kuning" },
  { id: 13, desa: "Gampong Geulumbuk", kecamatan: "Bendahara", kabupaten: "Aceh Tamiang", satuan: "Kecamatan Bendahara", warna: "putih" },
  { id: 14, desa: "Gampong Pante Cermin", kecamatan: "Sampoinet", kabupaten: "Aceh Jaya", satuan: "Kecamatan Sampoinet", warna: "biru" },
  { id: 15, desa: "Gampong Lugu", kecamatan: "Simeulue Timur", kabupaten: "Simeulue", satuan: "Kecamatan Simeulue Timur", warna: "putih" },
  { id: 16, desa: "Gampong Latak", kecamatan: "Kuta Baro", kabupaten: "Aceh Besar", satuan: "Kecamatan Kuta Baro", warna: "biru_keabuan" },
  { id: 17, desa: "Gampong Blang Tingkeum", kecamatan: "Bandar Baru", kabupaten: "Pidie Jaya", satuan: "Kecamatan Bandar Baru", warna: "putih" },
  { id: 18, desa: "Gampong Meunasah Kulam", kecamatan: "Kota Juang", kabupaten: "Bireuen", satuan: "Kecamatan Kota Juang", warna: "biru" },
];

let markersData: Record<string, any>[] = [
  { id: 1, lat: 5.1839, lng: 96.5084, kabupaten: "Pidie Jaya", kecamatan: "Bandar Baru", jenisBencana: "Banjir Bandang", severity: "critical", korban: 13, pengungsi: 1035 },
  { id: 2, lat: 5.3261, lng: 95.8572, kabupaten: "Aceh Besar", kecamatan: "Kuta Baro", jenisBencana: "Banjir", severity: "warning", korban: 3, pengungsi: 287 },
  { id: 3, lat: 5.3781, lng: 95.9862, kabupaten: "Aceh Besar", kecamatan: "Darul Imarah", jenisBencana: "Banjir", severity: "normal", korban: 0, pengungsi: 0 },
  { id: 4, lat: 5.1575, lng: 95.9814, kabupaten: "Pidie", kecamatan: "Padang Tiji", jenisBencana: "Longsor", severity: "critical", korban: 10, pengungsi: 378 },
  { id: 5, lat: 5.2109, lng: 96.7367, kabupaten: "Bireuen", kecamatan: "Kota Juang", jenisBencana: "Banjir", severity: "warning", korban: 2, pengungsi: 476 },
  { id: 6, lat: 5.2513, lng: 96.8921, kabupaten: "Bireuen", kecamatan: "Peusangan", jenisBencana: "Banjir", severity: "warning", korban: 2, pengungsi: 0 },
  { id: 7, lat: 5.0289, lng: 97.1832, kabupaten: "Aceh Utara", kecamatan: "Sawang", jenisBencana: "Banjir", severity: "warning", korban: 1, pengungsi: 231 },
  { id: 8, lat: 5.1045, lng: 97.2341, kabupaten: "Aceh Utara", kecamatan: "Nisam", jenisBencana: "Longsor", severity: "critical", korban: 5, pengungsi: 0 },
  { id: 9, lat: 4.5789, lng: 97.8923, kabupaten: "Aceh Timur", kecamatan: "Idi Rayeuk", jenisBencana: "Banjir", severity: "normal", korban: 0, pengungsi: 334 },
  { id: 10, lat: 4.4892, lng: 97.7612, kabupaten: "Aceh Timur", kecamatan: "Peureulak", jenisBencana: "Abrasi", severity: "warning", korban: 0, pengungsi: 0 },
  { id: 11, lat: 4.2341, lng: 98.0123, kabupaten: "Aceh Tamiang", kecamatan: "Karang Baru", jenisBencana: "Banjir", severity: "warning", korban: 3, pengungsi: 193 },
  { id: 12, lat: 3.6712, lng: 95.3421, kabupaten: "Aceh Jaya", kecamatan: "Sampoinet", jenisBencana: "Longsor", severity: "warning", korban: 6, pengungsi: 267 },
  { id: 13, lat: 2.6892, lng: 96.0532, kabupaten: "Simeulue", kecamatan: "Simeulue Timur", jenisBencana: "Abrasi", severity: "normal", korban: 0, pengungsi: 161 },
];

let nextId = {
  dampak: 15, pertanian: 11, penduduk: 10, orangHilang: 6, bantuan: 19, markers: 14,
};

// ── READ ──────────────────────────────────────────────────────────────────────
router.get("/bencana/summary", (_req, res) => { res.json(bencanaSummary); });
router.get("/bencana/dampak", (_req, res) => { res.json(dampakData); });
router.get("/bencana/pertanian", (_req, res) => { res.json(pertanianData); });
router.get("/bencana/pengungsi", (_req, res) => { res.json(pendudukData); });
router.get("/bencana/orang-hilang", (_req, res) => { res.json(orangHilangData); });
router.get("/bencana/bantuan", (_req, res) => { res.json(bantuanDesaData); });
router.get("/bencana/markers", (_req, res) => { res.json(markersData); });

// ── UPDATE SUMMARY ────────────────────────────────────────────────────────────
router.put("/bencana/summary", (req, res) => {
  bencanaSummary = { ...bencanaSummary, ...req.body };
  res.json(bencanaSummary);
});

// ── DAMPAK CRUD ───────────────────────────────────────────────────────────────
router.post("/bencana/dampak", (req, res) => {
  const record = { ...req.body, id: nextId.dampak++ };
  dampakData.push(record);
  res.status(201).json(record);
});
router.put("/bencana/dampak/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = dampakData.findIndex((r) => r.id === id);
  if (idx === -1) { res.status(404).json({ error: "Not found" }); return; }
  dampakData[idx] = { ...dampakData[idx], ...req.body, id };
  res.json(dampakData[idx]);
});
router.delete("/bencana/dampak/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = dampakData.length;
  dampakData = dampakData.filter((r) => r.id !== id);
  if (dampakData.length === before) { res.status(404).json({ error: "Not found" }); return; }
  res.status(204).end();
});

// ── PERTANIAN CRUD ────────────────────────────────────────────────────────────
router.post("/bencana/pertanian", (req, res) => {
  const record = { ...req.body, id: nextId.pertanian++ };
  pertanianData.push(record);
  res.status(201).json(record);
});
router.put("/bencana/pertanian/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = pertanianData.findIndex((r) => r.id === id);
  if (idx === -1) { res.status(404).json({ error: "Not found" }); return; }
  pertanianData[idx] = { ...pertanianData[idx], ...req.body, id };
  res.json(pertanianData[idx]);
});
router.delete("/bencana/pertanian/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = pertanianData.length;
  pertanianData = pertanianData.filter((r) => r.id !== id);
  if (pertanianData.length === before) { res.status(404).json({ error: "Not found" }); return; }
  res.status(204).end();
});

// ── PENDUDUK/PENGUNGSI CRUD ───────────────────────────────────────────────────
router.post("/bencana/pengungsi", (req, res) => {
  const record = { ...req.body, id: nextId.penduduk++ };
  pendudukData.push(record);
  res.status(201).json(record);
});
router.put("/bencana/pengungsi/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = pendudukData.findIndex((r) => r.id === id);
  if (idx === -1) { res.status(404).json({ error: "Not found" }); return; }
  pendudukData[idx] = { ...pendudukData[idx], ...req.body, id };
  res.json(pendudukData[idx]);
});
router.delete("/bencana/pengungsi/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = pendudukData.length;
  pendudukData = pendudukData.filter((r) => r.id !== id);
  if (pendudukData.length === before) { res.status(404).json({ error: "Not found" }); return; }
  res.status(204).end();
});

// ── ORANG HILANG CRUD ─────────────────────────────────────────────────────────
router.post("/bencana/orang-hilang", (req, res) => {
  const record = { ...req.body, id: nextId.orangHilang++ };
  orangHilangData.push(record);
  res.status(201).json(record);
});
router.put("/bencana/orang-hilang/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = orangHilangData.findIndex((r) => r.id === id);
  if (idx === -1) { res.status(404).json({ error: "Not found" }); return; }
  orangHilangData[idx] = { ...orangHilangData[idx], ...req.body, id };
  res.json(orangHilangData[idx]);
});
router.delete("/bencana/orang-hilang/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = orangHilangData.length;
  orangHilangData = orangHilangData.filter((r) => r.id !== id);
  if (orangHilangData.length === before) { res.status(404).json({ error: "Not found" }); return; }
  res.status(204).end();
});

// ── BANTUAN CRUD ──────────────────────────────────────────────────────────────
router.post("/bencana/bantuan", (req, res) => {
  const record = { ...req.body, id: nextId.bantuan++ };
  bantuanDesaData.push(record);
  res.status(201).json(record);
});
router.put("/bencana/bantuan/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = bantuanDesaData.findIndex((r) => r.id === id);
  if (idx === -1) { res.status(404).json({ error: "Not found" }); return; }
  bantuanDesaData[idx] = { ...bantuanDesaData[idx], ...req.body, id };
  res.json(bantuanDesaData[idx]);
});
router.delete("/bencana/bantuan/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = bantuanDesaData.length;
  bantuanDesaData = bantuanDesaData.filter((r) => r.id !== id);
  if (bantuanDesaData.length === before) { res.status(404).json({ error: "Not found" }); return; }
  res.status(204).end();
});

// ── MARKERS CRUD ──────────────────────────────────────────────────────────────
router.post("/bencana/markers", (req, res) => {
  const record = { ...req.body, id: nextId.markers++ };
  markersData.push(record);
  res.status(201).json(record);
});
router.put("/bencana/markers/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = markersData.findIndex((r) => r.id === id);
  if (idx === -1) { res.status(404).json({ error: "Not found" }); return; }
  markersData[idx] = { ...markersData[idx], ...req.body, id };
  res.json(markersData[idx]);
});
router.delete("/bencana/markers/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = markersData.length;
  markersData = markersData.filter((r) => r.id !== id);
  if (markersData.length === before) { res.status(404).json({ error: "Not found" }); return; }
  res.status(204).end();
});

export default router;
