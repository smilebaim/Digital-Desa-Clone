import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetDesaPelayanan, useCreateDesaPelayanan, useUpdateDesaPelayanan, useDeleteDesaPelayanan, getGetDesaPelayananQueryKey } from "@workspace/api-client-react";

const BLANK = { nama_desa: "", jenis: "Kesehatan", nama_fasilitas: "", status: "Aktif", pengguna_bulan: 0, keterangan: "" };
const JENIS_LIST = ["Pendidikan", "Kesehatan", "Ekonomi", "Administrasi"];
const JENIS_COLORS: Record<string, string> = { Pendidikan: "bg-blue-100 text-blue-800", Kesehatan: "bg-red-100 text-red-800", Ekonomi: "bg-yellow-100 text-yellow-800", Administrasi: "bg-green-100 text-green-800" };

export default function DesaPelayananSection() {
  const qc = useQueryClient();
  const { data: items = [] } = useGetDesaPelayanan();
  const createMutation = useCreateDesaPelayanan();
  const updateMutation = useUpdateDesaPelayanan();
  const deleteMutation = useDeleteDesaPelayanan();

  const [modal, setModal] = useState<{ open: boolean; editing: any | null }>({ open: false, editing: null });
  const [form, setForm] = useState<any>(BLANK);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const invalidate = () => qc.invalidateQueries({ queryKey: getGetDesaPelayananQueryKey() });
  const openAdd = () => { setForm(BLANK); setModal({ open: true, editing: null }); };
  const openEdit = (row: any) => { setForm({ ...row }); setModal({ open: true, editing: row }); };

  const handleSave = async () => {
    const payload = { ...form, pengguna_bulan: Number(form.pengguna_bulan) };
    if (modal.editing) await updateMutation.mutateAsync({ id: modal.editing.id, data: payload });
    else await createMutation.mutateAsync({ data: payload });
    invalidate(); setModal({ open: false, editing: null });
  };

  const handleDelete = async () => {
    if (deleteId === null) return;
    await deleteMutation.mutateAsync({ id: deleteId });
    invalidate(); setDeleteId(null);
  };

  const f = (k: string, v: any) => setForm((p: any) => ({ ...p, [k]: v }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Pelayanan Desa ({items.length})</h3>
        <button onClick={openAdd} className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-700 flex items-center gap-1.5">
          <i className="fas fa-plus"></i> Tambah
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-3">Nama Fasilitas</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Gampong</th>
                <th className="text-center px-4 py-3">Kategori</th>
                <th className="text-center px-4 py-3">Status</th>
                <th className="text-right px-4 py-3 hidden sm:table-cell">Pengguna/Bln</th>
                <th className="text-center px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((row: any) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{row.nama_fasilitas}</td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{row.nama_desa.replace("Gampong ", "")}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${JENIS_COLORS[row.jenis] ?? "bg-gray-100 text-gray-700"}`}>{row.jenis}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.status === "Aktif" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700"}`}>{row.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right hidden sm:table-cell">{row.pengguna_bulan.toLocaleString("id-ID")}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => openEdit(row)} className="text-blue-600 hover:text-blue-800"><i className="fas fa-edit"></i></button>
                      <button onClick={() => setDeleteId(row.id)} className="text-red-500 hover:text-red-700"><i className="fas fa-trash"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal.open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h4 className="font-semibold text-gray-800">{modal.editing ? "Edit" : "Tambah"} Pelayanan</h4>
              <button onClick={() => setModal({ open: false, editing: null })}><i className="fas fa-times text-gray-500"></i></button>
            </div>
            <div className="p-4 space-y-3">
              {[
                { label: "Nama Fasilitas", key: "nama_fasilitas" },
                { label: "Nama Desa", key: "nama_desa" },
                { label: "Pengguna/Bulan", key: "pengguna_bulan", type: "number" },
                { label: "Keterangan", key: "keterangan" },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                  <input type={type ?? "text"} value={form[key] ?? ""} onChange={(e) => f(key, e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Kategori</label>
                <select value={form.jenis} onChange={(e) => f("jenis", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500">
                  {JENIS_LIST.map((j) => <option key={j} value={j}>{j}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
                <select value={form.status} onChange={(e) => f("status", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500">
                  <option value="Aktif">Aktif</option>
                  <option value="Tidak Aktif">Tidak Aktif</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t">
              <button onClick={() => setModal({ open: false, editing: null })} className="px-4 py-2 text-sm border rounded-lg">Batal</button>
              <button onClick={handleSave} className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg">Simpan</button>
            </div>
          </div>
        </div>
      )}

      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <p className="font-semibold text-gray-800 mb-2">Hapus rekaman ini?</p>
            <p className="text-sm text-gray-500 mb-4">Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm border rounded-lg">Batal</button>
              <button onClick={handleDelete} className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
