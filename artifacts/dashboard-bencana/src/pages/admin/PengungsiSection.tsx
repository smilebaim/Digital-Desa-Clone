import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetBencanaPengungsi,
  useCreateBencanaPengungsi,
  useUpdateBencanaPengungsi,
  useDeleteBencanaPengungsi,
  getGetBencanaPengungsiQueryKey,
} from "@workspace/api-client-react";
import CrudTable from "../../components/admin/CrudTable";
import PengungsiFormModal from "../../components/admin/PengungsiFormModal";
import DeleteConfirm from "../../components/admin/DeleteConfirm";

export default function PengungsiSection() {
  const qc = useQueryClient();
  const { data = [], isLoading } = useGetBencanaPengungsi();
  const createMutation = useCreateBencanaPengungsi();
  const updateMutation = useUpdateBencanaPengungsi();
  const deleteMutation = useDeleteBencanaPengungsi();

  const [formOpen, setFormOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const invalidate = () => qc.invalidateQueries({ queryKey: getGetBencanaPengungsiQueryKey() });

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
    { key: "kabupaten", label: "Kabupaten" },
    { key: "penduduk", label: "Penduduk", render: (v: number) => v.toLocaleString() },
    { key: "kk", label: "KK", render: (v: number) => v.toLocaleString() },
    { key: "disabilitas", label: "Disabilitas", render: (v: number) => v.toLocaleString() },
    { key: "pengungsi", label: "Pengungsi", render: (v: number) => v.toLocaleString() },
  ];

  return (
    <>
      <CrudTable
        title="Data Penduduk & Pengungsi"
        columns={columns}
        data={data}
        isLoading={isLoading}
        onAdd={() => { setEditRecord(null); setFormOpen(true); }}
        onEdit={(row) => { setEditRecord(row); setFormOpen(true); }}
        onDelete={(row) => setDeleteId(row.id)}
      />
      {formOpen && (
        <PengungsiFormModal
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
