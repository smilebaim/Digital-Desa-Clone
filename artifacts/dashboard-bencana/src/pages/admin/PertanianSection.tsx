import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetBencanaPertanian,
  useCreateBencanaPertanian,
  useUpdateBencanaPertanian,
  useDeleteBencanaPertanian,
  getGetBencanaPertanianQueryKey,
} from "@workspace/api-client-react";
import CrudTable from "../../components/admin/CrudTable";
import PertanianFormModal from "../../components/admin/PertanianFormModal";
import DeleteConfirm from "../../components/admin/DeleteConfirm";

export default function PertanianSection() {
  const qc = useQueryClient();
  const { data = [], isLoading } = useGetBencanaPertanian();
  const createMutation = useCreateBencanaPertanian();
  const updateMutation = useUpdateBencanaPertanian();
  const deleteMutation = useDeleteBencanaPertanian();

  const [formOpen, setFormOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const invalidate = () => qc.invalidateQueries({ queryKey: getGetBencanaPertanianQueryKey() });

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
    { key: "nama", label: "Nama Lahan" },
    { key: "kabupaten", label: "Kabupaten" },
    { key: "kecamatan", label: "Kecamatan" },
    { key: "volume", label: "Volume (Ha)" },
    { key: "kerugian", label: "Kerugian" },
    {
      key: "kondisi", label: "Kondisi", render: (v: string) => (
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium
          ${v === "Berat" ? "bg-red-100 text-red-700" :
            v === "Sedang" ? "bg-yellow-100 text-yellow-700" :
            "bg-green-100 text-green-700"}`}>{v}</span>
      )
    },
  ];

  return (
    <>
      <CrudTable
        title="Data Kerusakan Pertanian"
        columns={columns}
        data={data}
        isLoading={isLoading}
        onAdd={() => { setEditRecord(null); setFormOpen(true); }}
        onEdit={(row) => { setEditRecord(row); setFormOpen(true); }}
        onDelete={(row) => setDeleteId(row.id)}
      />
      {formOpen && (
        <PertanianFormModal
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
