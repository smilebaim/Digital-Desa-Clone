"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetDesaIDM, useCreateDesaIDM, useUpdateDesaIDM, useDeleteDesaIDM, getGetDesaIDMQueryKey } from "@workspace/api-client-react";

const BLANK = { desa_id: 1, nama_desa: "", tahun: 2024, skor_idm: 0.65, status_idm: "Berkembang", iks: 0.65, ike: 0.65, ikl: 0.65, skor_sebelumnya: 0.62, delta: 0.03 };
const STATUS = ["Mandiri", "Maju", "Berkembang", "Tertinggal", "Sangat Tertinggal"];
const STATUS_COLORS: Record<string, string> = { Mandiri: "bg-green-100 text-green-800", Maju: "bg-blue-100 text-blue-800", Berkembang: "bg-yellow-100 text-yellow-800", Tertinggal: "bg-orange-100 text-orange-800", "Sangat Tertinggal": "bg-red-100 text-red-800" };

export default function DesaIDMSection() {
  const qc = useQueryClient();
  const { data: items = [] } = useGetDesaIDM();
  const createMutation = useCreateDesaIDM();
  const updateMutation = useUpdateDesaIDM();
  const deleteMutation = useDeleteDesaIDM();

  const [modal, setModal] = useState<{ open: boolean; editing: any | null }>({ open: false, editing: null });
  const [form, setForm] = useState<any>(BLANK);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const invalidate = () => qc.invalidateQueries({ queryKey: getGetDesaIDMQueryKey() });
  const openAdd = () => { setForm(BLANK); setModal({ open: true, editing: null }); };
  const openEdit = (row: any) => { setForm({ ...row }); setModal({ open: true, editing: row }); };

  const handleSave = async () => {
    const payload = { ...form, desa_id: Number(form.desa_id), tahun: Number(form.tahun), skor_idm: Number(form.skor_idm), iks: Number(form.iks), ike: Number(form.ike), ikl: Number(form.ikl), skor_sebelumnya: Number(form.skor_sebelumnya), delta: Number(form.delta) };
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
  const sorted = [...items].sort((a: any, b: any) => b.skor_idm - a.skor_idm);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Data IDM ({items.length})</h3>
        <button onClick={openAdd} className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-700 flex items-center gap-1.5">
          <i className="fas fa-plus"></i> Tambah
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-3">Gampong</th>
                <th className="text-center px-4 py-3">Status</th>
                <th className="text-right px-4 py-3">Skor IDM</th>
                <th className="text-right px-4 py-3 hidden md:table-cell">IKS</th>
                <th className="text-right px-4 py-3 hidden md:table-cell">IKE</th>
                <th className="text-right px-4 py-3 hidden md:table-cell">IKL</th>
                <th className="text-right px-4 py-3">Δ</th>
                <th className="text-center px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sorted.map((row: any) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{row.nama_desa.replace("Gampong ", "")}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[row.status_idm] ?? "bg-gray-100 text-gray-700"}`}>{row.status_idm}</span>
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-green-700">{row.skor_idm.toFixed(4)}</td>
                  <td className="px-4 py-3 text-right text-gray-600 hidden md:table-cell">{row.iks.toFixed(4)}</td>
                  <td className="px-4 py-3 text-right text-gray-600 hidden md:table-cell">{row.ike.toFixed(4)}</td>
                  <td className="px-4 py-3 text-right text-gray-600 hidden md:table-cell">{row.ikl.toFixed(4)}</td>
                  <td className="px-4 py-3 text-right text-green-600 font-semibold">+{row.delta.toFixed(4)}</td>
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
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h4 className="font-semibold text-gray-800">{modal.editing ? "Edit" : "Tambah"} Data IDM</h4>
              <button onClick={() => setModal({ open: false, editing: null })}><i className="fas fa-times text-gray-500"></i></button>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              {[
                { label: "Nama Desa", key: "nama_desa", col: 2 },
                { label: "Tahun", key: "tahun", type: "number" },
                { label: "Skor IDM", key: "skor_idm", type: "number" },
                { label: "IKS (Sosial)", key: "iks", type: "number" },
                { label: "IKE (Ekonomi)", key: "ike", type: "number" },
                { label: "IKL (Ekologi)", key: "ikl", type: "number" },
                { label: "Skor Sebelumnya", key: "skor_sebelumnya", type: "number" },
                { label: "Delta (Kenaikan)", key: "delta", type: "number" },
              ].map(({ label, key, type, col }) => (
                <div key={key} className={col === 2 ? "col-span-2" : ""}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                  <input type={type ?? "text"} value={form[key] ?? ""} onChange={(e) => f(key, e.target.value)} step="any"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Status IDM</label>
                <select value={form.status_idm} onChange={(e) => f("status_idm", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500">
                  {STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
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
