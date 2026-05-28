import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetBencanaSummary,
  useUpdateBencanaSummary,
  getGetBencanaSummaryQueryKey,
} from "@workspace/api-client-react";
import { Save, RefreshCw } from "lucide-react";

function Field({ label, name, value, onChange, type = "text" }: {
  label: string; name: string; value: string | number; onChange: (name: string, value: any) => void; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(name, type === "number" ? Number(e.target.value) : e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
      />
    </div>
  );
}

export default function RingkasanSection() {
  const qc = useQueryClient();
  const { data, isLoading } = useGetBencanaSummary();
  const updateMutation = useUpdateBencanaSummary();

  const [form, setForm] = useState<Record<string, any>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data) setForm(data as Record<string, any>);
  }, [data]);

  function handleChange(name: string, value: any) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    await updateMutation.mutateAsync({ data: form as any });
    qc.invalidateQueries({ queryKey: getGetBencanaSummaryQueryKey() });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (isLoading) {
    return <div className="flex justify-center py-12"><RefreshCw className="animate-spin text-gray-400" size={24} /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-700 mb-4">KPI Utama Dashboard</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <Field label="Total Korban Jiwa" name="totalKorban" value={form.totalKorban ?? 0} onChange={handleChange} type="number" />
          <Field label="Total Pengungsi" name="totalPengungsi" value={form.totalPengungsi ?? 0} onChange={handleChange} type="number" />
          <Field label="Titik Pengungsian" name="titikPengungsian" value={form.titikPengungsian ?? 0} onChange={handleChange} type="number" />
          <Field label="Rumah Rusak" name="rumahRusak" value={form.rumahRusak ?? 0} onChange={handleChange} type="number" />
          <Field label="Sawah Terdampak (Ha)" name="sawahHa" value={form.sawahHa ?? 0} onChange={handleChange} type="number" />
          <Field label="Kabupaten Terdampak" name="kabupatenTerdampak" value={form.kabupatenTerdampak ?? 0} onChange={handleChange} type="number" />
          <Field label="Fasum Rusak" name="fasumRusak" value={form.fasumRusak ?? 0} onChange={handleChange} type="number" />
          <Field label="Kebun Terdampak (Ha)" name="kebunHa" value={form.kebunHa ?? 0} onChange={handleChange} type="number" />
          <Field label="Tambak Terdampak (Ha)" name="tambakHa" value={form.tambakHa ?? 0} onChange={handleChange} type="number" />
          <Field label="Update Terakhir" name="lastUpdate" value={form.lastUpdate ?? ""} onChange={handleChange} />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-700 mb-4">Rekap Cluster Kerugian</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Total Kerusakan" name="_kerusakan" value={form.rekapCluster?.kerusakan ?? ""} onChange={(_, v) => setForm((p) => ({ ...p, rekapCluster: { ...p.rekapCluster, kerusakan: v } }))} />
          <Field label="Total Kerugian" name="_kerugian" value={form.rekapCluster?.kerugian ?? ""} onChange={(_, v) => setForm((p) => ({ ...p, rekapCluster: { ...p.rekapCluster, kerugian: v } }))} />
          <Field label="Grand Total" name="_total" value={form.rekapCluster?.total ?? ""} onChange={(_, v) => setForm((p) => ({ ...p, rekapCluster: { ...p.rekapCluster, total: v } }))} />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-700 mb-4">Fasilitas Kesehatan</h3>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Puskesmas" name="_puskesmas" value={form.faskes?.puskesmas ?? 0} onChange={(_, v) => setForm((p) => ({ ...p, faskes: { ...p.faskes, puskesmas: Number(v) } }))} type="number" />
          <Field label="RSUD" name="_rsud" value={form.faskes?.rsud ?? 0} onChange={(_, v) => setForm((p) => ({ ...p, faskes: { ...p.faskes, rsud: Number(v) } }))} type="number" />
          <Field label="Fasyankes" name="_fasyankes" value={form.faskes?.fasyankes ?? 0} onChange={(_, v) => setForm((p) => ({ ...p, faskes: { ...p.faskes, fasyankes: Number(v) } }))} type="number" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-700 mb-4">Status Bantuan Desa</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <Field label="Total Desa" name="_totalDesa" value={form.bantuan?.totalDesa ?? 0} onChange={(_, v) => setForm((p) => ({ ...p, bantuan: { ...p.bantuan, totalDesa: Number(v) } }))} type="number" />
          <Field label="Kuning (Terdampak)" name="_kuning" value={form.bantuan?.kuning ?? 0} onChange={(_, v) => setForm((p) => ({ ...p, bantuan: { ...p.bantuan, kuning: Number(v) } }))} type="number" />
          <Field label="Biru (Terancam)" name="_biru" value={form.bantuan?.biru ?? 0} onChange={(_, v) => setForm((p) => ({ ...p, bantuan: { ...p.bantuan, biru: Number(v) } }))} type="number" />
          <Field label="Abu (Waspada)" name="_abu" value={form.bantuan?.abu ?? 0} onChange={(_, v) => setForm((p) => ({ ...p, bantuan: { ...p.bantuan, abu: Number(v) } }))} type="number" />
          <Field label="Putih (Aman)" name="_putih" value={form.bantuan?.putih ?? 0} onChange={(_, v) => setForm((p) => ({ ...p, bantuan: { ...p.bantuan, putih: Number(v) } }))} type="number" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={updateMutation.isPending}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-60"
        >
          {updateMutation.isPending ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
          {updateMutation.isPending ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
        {saved && <span className="text-sm text-green-600 font-medium">✓ Tersimpan!</span>}
      </div>
    </div>
  );
}
