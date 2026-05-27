import { Router } from "express";

const router = Router();

const bencanaSummary = {
  totalKorban: 47,
  totalPengungsi: 3842,
  titikPengungsian: 23,
  rumahRusak: 1256,
  sawahHa: 847.5,
  kabupatenTerdampak: 8,
  lastUpdate: "27 Mei 2025, 14:30 WIB",
};

const dampakData = [
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

const pengungsiData = [
  { id: 1, kabupaten: "Pidie Jaya", lokasi: "Gedung SDN 01 Bandar Baru", jumlahKepalaKeluarga: 145, jumlahJiwa: 612, lakiLaki: 298, perempuan: 314, anakAnak: 185, lansia: 42, status: "Aktif" },
  { id: 2, kabupaten: "Pidie Jaya", lokasi: "Masjid Agung Bandar Baru", jumlahKepalaKeluarga: 98, jumlahJiwa: 423, lakiLaki: 205, perempuan: 218, anakAnak: 127, lansia: 31, status: "Aktif" },
  { id: 3, kabupaten: "Aceh Besar", lokasi: "Balai Desa Kuta Baro", jumlahKepalaKeluarga: 67, jumlahJiwa: 287, lakiLaki: 140, perempuan: 147, anakAnak: 88, lansia: 19, status: "Aktif" },
  { id: 4, kabupaten: "Pidie", lokasi: "Posko BPBD Padang Tiji", jumlahKepalaKeluarga: 89, jumlahJiwa: 378, lakiLaki: 183, perempuan: 195, anakAnak: 112, lansia: 28, status: "Aktif" },
  { id: 5, kabupaten: "Bireuen", lokasi: "GOR Kota Juang", jumlahKepalaKeluarga: 112, jumlahJiwa: 476, lakiLaki: 231, perempuan: 245, anakAnak: 143, lansia: 35, status: "Aktif" },
  { id: 6, kabupaten: "Aceh Utara", lokasi: "Meunasah Gampong Sawang", jumlahKepalaKeluarga: 54, jumlahJiwa: 231, lakiLaki: 112, perempuan: 119, anakAnak: 69, lansia: 17, status: "Aktif" },
  { id: 7, kabupaten: "Aceh Timur", lokasi: "Gedung Serbaguna Idi", jumlahKepalaKeluarga: 78, jumlahJiwa: 334, lakiLaki: 162, perempuan: 172, anakAnak: 100, lansia: 24, status: "Aktif" },
  { id: 8, kabupaten: "Aceh Tamiang", lokasi: "Kantor Camat Karang Baru", jumlahKepalaKeluarga: 45, jumlahJiwa: 193, lakiLaki: 94, perempuan: 99, anakAnak: 58, lansia: 14, status: "Aktif" },
  { id: 9, kabupaten: "Aceh Jaya", lokasi: "Posko Terpadu Sampoinet", jumlahKepalaKeluarga: 62, jumlahJiwa: 267, lakiLaki: 130, perempuan: 137, anakAnak: 80, lansia: 18, status: "Aktif" },
  { id: 10, kabupaten: "Simeulue", lokasi: "Balai Pertemuan Simeulue Timur", jumlahKepalaKeluarga: 38, jumlahJiwa: 161, lakiLaki: 78, perempuan: 83, anakAnak: 48, lansia: 12, status: "Aktif" },
];

const bantuanData = [
  { id: 1, kabupaten: "Pidie Jaya", jenisLogistik: "Sembako", jumlah: 500, satuan: "Paket", sumberBantuan: "BNPB Pusat", tanggalDistribusi: "2025-05-24", status: "Disalurkan" },
  { id: 2, kabupaten: "Pidie Jaya", jenisLogistik: "Tenda", jumlah: 50, satuan: "Unit", sumberBantuan: "BPBD Aceh", tanggalDistribusi: "2025-05-24", status: "Disalurkan" },
  { id: 3, kabupaten: "Pidie Jaya", jenisLogistik: "Selimut", jumlah: 300, satuan: "Lembar", sumberBantuan: "PMI Aceh", tanggalDistribusi: "2025-05-24", status: "Disalurkan" },
  { id: 4, kabupaten: "Pidie", jenisLogistik: "Sembako", jumlah: 350, satuan: "Paket", sumberBantuan: "BNPB Pusat", tanggalDistribusi: "2025-05-23", status: "Disalurkan" },
  { id: 5, kabupaten: "Pidie", jenisLogistik: "Matras", jumlah: 200, satuan: "Lembar", sumberBantuan: "BPBD Aceh", tanggalDistribusi: "2025-05-23", status: "Disalurkan" },
  { id: 6, kabupaten: "Aceh Besar", jenisLogistik: "Sembako", jumlah: 250, satuan: "Paket", sumberBantuan: "Baznas Aceh", tanggalDistribusi: "2025-05-23", status: "Disalurkan" },
  { id: 7, kabupaten: "Bireuen", jenisLogistik: "Air Bersih", jumlah: 10000, satuan: "Liter", sumberBantuan: "PDAM Bireuen", tanggalDistribusi: "2025-05-22", status: "Proses" },
  { id: 8, kabupaten: "Bireuen", jenisLogistik: "P3K", jumlah: 80, satuan: "Kotak", sumberBantuan: "Dinkes Bireuen", tanggalDistribusi: "2025-05-22", status: "Disalurkan" },
  { id: 9, kabupaten: "Aceh Utara", jenisLogistik: "Sembako", jumlah: 180, satuan: "Paket", sumberBantuan: "Pemkab Aceh Utara", tanggalDistribusi: "2025-05-21", status: "Disalurkan" },
  { id: 10, kabupaten: "Aceh Utara", jenisLogistik: "Tenda", jumlah: 25, satuan: "Unit", sumberBantuan: "BPBD Aceh", tanggalDistribusi: "2025-05-21", status: "Proses" },
  { id: 11, kabupaten: "Aceh Timur", jenisLogistik: "Sembako", jumlah: 300, satuan: "Paket", sumberBantuan: "Pemkab Aceh Timur", tanggalDistribusi: "2025-05-20", status: "Disalurkan" },
  { id: 12, kabupaten: "Aceh Tamiang", jenisLogistik: "Selimut", jumlah: 120, satuan: "Lembar", sumberBantuan: "PMI Tamiang", tanggalDistribusi: "2025-05-19", status: "Disalurkan" },
  { id: 13, kabupaten: "Aceh Jaya", jenisLogistik: "Matras", jumlah: 150, satuan: "Lembar", sumberBantuan: "BNPB Pusat", tanggalDistribusi: "2025-05-18", status: "Proses" },
  { id: 14, kabupaten: "Simeulue", jenisLogistik: "Air Bersih", jumlah: 5000, satuan: "Liter", sumberBantuan: "PDAM Simeulue", tanggalDistribusi: "2025-05-17", status: "Disalurkan" },
];

const markersData = [
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

router.get("/bencana/summary", (req, res) => {
  res.json(bencanaSummary);
});

router.get("/bencana/dampak", (req, res) => {
  res.json(dampakData);
});

router.get("/bencana/pengungsi", (req, res) => {
  res.json(pengungsiData);
});

router.get("/bencana/bantuan", (req, res) => {
  res.json(bantuanData);
});

router.get("/bencana/markers", (req, res) => {
  res.json(markersData);
});

export default router;
