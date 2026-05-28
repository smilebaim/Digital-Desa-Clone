import {
  useGetBencanaSummary,
  useGetBencanaDampak,
  useGetBencanaPertanian,
  useGetBencanaPengungsi,
  useGetBencanaOrangHilang,
  useGetBencanaBantuan,
  useGetBencanaMarkers,
} from "@workspace/api-client-react";
import { AlertTriangle, Wheat, Users, Search, HandHeart, MapPin, Activity } from "lucide-react";

function StatCard({ label, value, icon, color }: { label: string; value: string | number; icon: React.ReactNode; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

export default function OverviewSection() {
  const { data: summary } = useGetBencanaSummary();
  const { data: dampak } = useGetBencanaDampak();
  const { data: pertanian } = useGetBencanaPertanian();
  const { data: pengungsi } = useGetBencanaPengungsi();
  const { data: orangHilang } = useGetBencanaOrangHilang();
  const { data: bantuan } = useGetBencanaBantuan();
  const { data: markers } = useGetBencanaMarkers();

  const siagaCount = dampak?.filter((d) => d.status === "Siaga").length ?? 0;
  const dicariCount = orangHilang?.filter((o) => o.status === "Dicari").length ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Ringkasan Data</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <StatCard label="Total Korban" value={summary?.totalKorban ?? "—"} icon={<Activity size={18} className="text-white" />} color="bg-red-500" />
          <StatCard label="Total Pengungsi" value={summary?.totalPengungsi?.toLocaleString() ?? "—"} icon={<Users size={18} className="text-white" />} color="bg-orange-500" />
          <StatCard label="Rumah Rusak" value={summary?.rumahRusak?.toLocaleString() ?? "—"} icon={<AlertTriangle size={18} className="text-white" />} color="bg-yellow-500" />
          <StatCard label="Kab. Terdampak" value={summary?.kabupatenTerdampak ?? "—"} icon={<MapPin size={18} className="text-white" />} color="bg-blue-500" />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Jumlah Rekaman Data</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard label="Dampak" value={dampak?.length ?? "—"} icon={<AlertTriangle size={18} className="text-white" />} color="bg-red-600" />
          <StatCard label="Pertanian" value={pertanian?.length ?? "—"} icon={<Wheat size={18} className="text-white" />} color="bg-green-600" />
          <StatCard label="Pengungsi" value={pengungsi?.length ?? "—"} icon={<Users size={18} className="text-white" />} color="bg-blue-600" />
          <StatCard label="Orang Hilang" value={orangHilang?.length ?? "—"} icon={<Search size={18} className="text-white" />} color="bg-purple-600" />
          <StatCard label="Bantuan Desa" value={bantuan?.length ?? "—"} icon={<HandHeart size={18} className="text-white" />} color="bg-teal-600" />
          <StatCard label="Map Markers" value={markers?.length ?? "—"} icon={<MapPin size={18} className="text-white" />} color="bg-indigo-600" />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Status Terkini</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">Kejadian Status Siaga</p>
            <p className="text-3xl font-bold text-red-600">{siagaCount}</p>
            <p className="text-xs text-gray-400 mt-1">dari {dampak?.length ?? 0} total kejadian</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">Orang Hilang Belum Ditemukan</p>
            <p className="text-3xl font-bold text-orange-600">{dicariCount}</p>
            <p className="text-xs text-gray-400 mt-1">dari {orangHilang?.length ?? 0} total kasus</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">Titik Marker Kritis</p>
            <p className="text-3xl font-bold text-red-700">{markers?.filter((m) => m.severity === "critical").length ?? 0}</p>
            <p className="text-xs text-gray-400 mt-1">dari {markers?.length ?? 0} total marker</p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
        <strong>Catatan:</strong> Data ini tersimpan di memori server dan akan reset saat server restart. Untuk penyimpanan permanen, diperlukan integrasi database.
      </div>
    </div>
  );
}
