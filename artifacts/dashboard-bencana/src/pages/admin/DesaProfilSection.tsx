"use client";

import { useState } from "react";
import { useGetDesaProfil, useCreateDesaProfil, useUpdateDesaProfil, useDeleteDesaProfil } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { getGetDesaProfilQueryKey } from "@workspace/api-client-react";

const BLANK = { nama: "", kecamatan: "Sekernan", kabupaten: "Muaro Jambi", luas_ha: 0, jumlah_penduduk: 0, jumlah_kk: 0, kepala_desa: "", jenis_desa: "Berkembang", lat: -1.62, lng: 103.56, tahun_berdiri: 1950 };
const STATUS = ["Mandiri", "Maju", "Berkembang", "Tertinggal", "Sangat Tertinggal"];
const STATUS_COLORS: Record<string, string> = { Mandiri: "bg-green-100 text-green-800", Maju: "bg-blue-100 text-blue-800", Berkembang: "bg-yellow-100 text-yellow-800", Tertinggal: "bg-orange-100 text-orange-800", "Sangat Tertinggal": "bg-red-100 text-red-800" };

export default function DesaProfilSection() {
  const qc = useQueryClient();
  const { data: items = [] } = useGetDesaProfil();
  const createMutation = useCreateDesaProfil();
  const updateMutation = useUpdateDesaProfil();
  const deleteMutation = useDeleteDesaProfil();

  const [modal, setModal] = useState<{ open: boolean; editing: any | null }>({ open: false, editing: null });
  const [form, setForm] = useState<any>(BLANK);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const invalidate = () => qc.invalidateQueries({ queryKey: getGetDesaProfilQueryKey() });

  const openAdd = () => { setForm(BLANK); setModal({ open: true, editing: null }); };
  const openEdit = (row: any) => { setForm({ ...row }); setModal({ open: true, editing: row }); };

  const handleSave = async () => {
    const payload = { ...form, luas_ha: Number(form.luas_ha), jumlah_penduduk: Number(form.jumlah_penduduk), jumlah_kk: Number(form.jumlah_kk), lat: Number(form.lat), lng: Number(form.lng), tahun_berdiri: Number(form.tahun_berdiri) };
    if (modal.editing) {
      await updateMutation.mutateAsync({ id: modal.editing.id, data: payload });
    } else {
      await createMutation.mutateAsync({ data: payload });
    }
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
        <h3 className="font-semibold text-gray-800">Profil Desa ({items.length})</h3>
        <button onClick={openAdd} className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition flex items-center gap-1.5">
          <i className="fas fa-plus"></i> Tambah
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-3">Nama Gampong</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Kepala Desa</th>
                <th className="text-right px-4 py-3">Penduduk</th>
                <th className="text-center px-4 py-3">Status</th>
                <th className="text-center px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((row: any) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{row.nama}</td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{row.kepala_desa}</td>
                  <td className="px-4 py-3 text-right">{row.jumlah_penduduk.toLocaleString("id-ID")}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[row.jenis_desa] ?? "bg-gray-100 text-gray-700"}`}>{row.jenis_desa}</span>
                  </td>
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

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h4 className="font-semibold text-gray-800">{modal.editing ? "Edit" : "Tambah"} Profil Desa</h4>
              <button onClick={() => setModal({ open: false, editing: null })}><i className="fas fa-times text-gray-500"></i></button>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              {[
                { label: "Nama Gampong", key: "nama", col: 2 },
                { label: "Kecamatan", key: "kecamatan" },
                { label: "Kabupaten", key: "kabupaten" },
                { label: "Kepala Desa", key: "kepala_desa", col: 2 },
                { label: "Luas (Ha)", key: "luas_ha", type: "number" },
                { label: "Tahun Berdiri", key: "tahun_berdiri", type: "number" },
                { label: "Jml Penduduk", key: "jumlah_penduduk", type: "number" },
                { label: "Jml KK", key: "jumlah_kk", type: "number" },
                { label: "Latitude", key: "lat", type: "number" },
                { label: "Longitude", key: "lng", type: "number" },
              ].map(({ label, key, type, col }) => (
                <div key={key} className={col === 2 ? "col-span-2" : ""}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                  <input type={type ?? "text"} value={form[key] ?? ""} onChange={(e) => f(key, e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" step="any" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Status IDM</label>
                <select value={form.jenis_desa} onChange={(e) => f("jenis_desa", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500">
                  {STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t">
              <button onClick={() => setModal({ open: false, editing: null })} className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">Batal</button>
              <button onClick={handleSave} className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700">Simpan</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <p className="font-semibold text-gray-800 mb-2">Hapus rekaman ini?</p>
            <p className="text-sm text-gray-500 mb-4">Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">Batal</button>
              <button onClick={handleDelete} className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
