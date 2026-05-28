import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetBencanaBantuan,
  useCreateBencanaBantuan,
  useUpdateBencanaBantuan,
  useDeleteBencanaBantuan,
  getGetBencanaBantuanQueryKey,
} from "@workspace/api-client-react";
import CrudTable from "../../components/admin/CrudTable";
import BantuanFormModal from "../../components/admin/BantuanFormModal";
import DeleteConfirm from "../../components/admin/DeleteConfirm";

const WARNA_LABEL: Record<string, string> = {
  kuning: "Kuning – Terdampak",
  biru: "Biru – Terancam",
  biru_keabuan: "Biru Keabuan – Waspada",
  putih: "Putih – Aman",
};

const WARNA_COLOR: Record<string, string> = {
  kuning: "bg-yellow-100 text-yellow-800",
  biru: "bg-blue-100 text-blue-800",
  biru_keabuan: "bg-slate-100 text-slate-700",
  putih: "bg-gray-100 text-gray-700",
};

export default function BantuanSection() {
  const qc = useQueryClient();
  const { data = [], isLoading } = useGetBencanaBantuan();
  const createMutation = useCreateBencanaBantuan();
  const updateMutation = useUpdateBencanaBantuan();
  const deleteMutation = useDeleteBencanaBantuan();

  const [formOpen, setFormOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const invalidate = () => qc.invalidateQueries({ queryKey: getGetBencanaBantuanQueryKey() });

  async function handleSave(values: any) {
    if (editRecord) {
      await updateMutation.mutateAsync({ id: editRecord.id, data: values });
    } else {
      await createMutation.mutateAsync({ data: values });
    }
    invalidate();
    setFormOpen(false);
    setEditRecord(null);
  }

  async function handleDelete() {
    if (deleteId == null) return;
    await deleteMutation.mutateAsync({ id: deleteId });
    invalidate();
    setDeleteId(null);
  }

  const columns = [
    { key: "desa", label: "Desa / Gampong" },
    { key: "kecamatan", label: "Kecamatan" },
    { key: "kabupaten", label: "Kabupaten" },
    {
      key: "warna", label: "Status Bantuan", render: (v: string) => (
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${WARNA_COLOR[v] ?? "bg-gray-100 text-gray-700"}`}>
          {WARNA_LABEL[v] ?? v}
        </span>
      )
    },
  ];

  return (
    <>
      <CrudTable
        title="Data Bantuan Desa"
        columns={columns}
        data={data}
        isLoading={isLoading}
        onAdd={() => { setEditRecord(null); setFormOpen(true); }}
        onEdit={(row) => { setEditRecord(row); setFormOpen(true); }}
        onDelete={(row) => setDeleteId(row.id)}
      />
      {formOpen && (
        <BantuanFormModal
          initial={editRecord}
          onClose={() => { setFormOpen(false); setEditRecord(null); }}
          onSave={handleSave}
          saving={createMutation.isPending || updateMutation.isPending}
        />
      )}
      {deleteId != null && (
        <DeleteConfirm
          onCancel={() => setDeleteId(null)}
          onConfirm={handleDelete}
          loading={deleteMutation.isPending}
        />
      )}
    </>
  );
}
