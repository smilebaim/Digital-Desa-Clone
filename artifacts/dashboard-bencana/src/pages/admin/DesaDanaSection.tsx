import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetDesaDana, useCreateDesaDana, useUpdateDesaDana, useDeleteDesaDana, getGetDesaDanaQueryKey } from "@workspace/api-client-react";

const BLANK = { desa_id: 1, nama_desa: "", tahun: 2024, alokasi: 0, realisasi: 0, persen_realisasi: 0, infra_pct: 55, pemberdayaan_pct: 30, operasional_pct: 15, sumber: "DD+ADD" };

function rp(n: number) { return n >= 1e9 ? `Rp ${(n/1e9).toFixed(2)} M` : `Rp ${(n/1e6).toFixed(0)} Jt`; }

export default function DesaDanaSection() {
  const qc = useQueryClient();
  const { data: items = [] } = useGetDesaDana();
  const createMutation = useCreateDesaDana();
  const updateMutation = useUpdateDesaDana();
  const deleteMutation = useDeleteDesaDana();

  const [modal, setModal] = useState<{ open: boolean; editing: any | null }>({ open: false, editing: null });
  const [form, setForm] = useState<any>(BLANK);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const invalidate = () => qc.invalidateQueries({ queryKey: getGetDesaDanaQueryKey() });
  const openAdd = () => { setForm(BLANK); setModal({ open: true, editing: null }); };
  const openEdit = (row: any) => { setForm({ ...row }); setModal({ open: true, editing: row }); };

  const handleSave = async () => {
    const payload = { ...form, desa_id: Number(form.desa_id), tahun: Number(form.tahun), alokasi: Number(form.alokasi), realisasi: Number(form.realisasi), persen_realisasi: Number(form.persen_realisasi), infra_pct: Number(form.infra_pct), pemberdayaan_pct: Number(form.pemberdayaan_pct), operasional_pct: Number(form.operasional_pct) };
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

  const sortedItems = [...items].sort((a: any, b: any) => b.persen_realisasi - a.persen_realisasi);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Dana Desa ({items.length})</h3>
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
                <th className="text-right px-4 py-3 hidden md:table-cell">Alokasi</th>
                <th className="text-right px-4 py-3 hidden md:table-cell">Realisasi</th>
                <th className="text-right px-4 py-3">%</th>
                <th className="text-center px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sortedItems.map((row: any) => {
                const pct = row.persen_realisasi;
                const color = pct >= 90 ? "text-green-700" : pct >= 75 ? "text-yellow-700" : "text-red-700";
                return (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{row.nama_desa.replace("Gampong ", "")}</td>
                    <td className="px-4 py-3 text-right text-gray-600 hidden md:table-cell">{rp(row.alokasi)}</td>
                    <td className="px-4 py-3 text-right text-gray-700 hidden md:table-cell">{rp(row.realisasi)}</td>
                    <td className={`px-4 py-3 text-right font-bold ${color}`}>{pct.toFixed(1)}%</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => openEdit(row)} className="text-blue-600 hover:text-blue-800"><i className="fas fa-edit"></i></button>
                        <button onClick={() => setDeleteId(row.id)} className="text-red-500 hover:text-red-700"><i className="fas fa-trash"></i></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {modal.open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h4 className="font-semibold text-gray-800">{modal.editing ? "Edit" : "Tambah"} Dana Desa</h4>
              <button onClick={() => setModal({ open: false, editing: null })}><i className="fas fa-times text-gray-500"></i></button>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              {[
                { label: "Nama Desa", key: "nama_desa", col: 2 },
                { label: "Tahun", key: "tahun", type: "number" },
                { label: "Sumber Dana", key: "sumber" },
                { label: "Alokasi (Rp)", key: "alokasi", type: "number" },
                { label: "Realisasi (Rp)", key: "realisasi", type: "number" },
                { label: "% Realisasi", key: "persen_realisasi", type: "number" },
                { label: "% Infrastruktur", key: "infra_pct", type: "number" },
                { label: "% Pemberdayaan", key: "pemberdayaan_pct", type: "number" },
                { label: "% Operasional", key: "operasional_pct", type: "number" },
              ].map(({ label, key, type, col }) => (
                <div key={key} className={col === 2 ? "col-span-2" : ""}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                  <input type={type ?? "text"} value={form[key] ?? ""} onChange={(e) => f(key, e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" step="any" />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 p-4 border-t">
              <button onClick={() => setModal({ open: false, editing: null })} className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">Batal</button>
              <button onClick={handleSave} className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700">Simpan</button>
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
