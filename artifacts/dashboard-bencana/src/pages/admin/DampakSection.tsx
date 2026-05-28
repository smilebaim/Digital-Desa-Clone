import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetBencanaDampak,
  useCreateBencanaDampak,
  useUpdateBencanaDampak,
  useDeleteBencanaDampak,
  getGetBencanaDampakQueryKey,
} from "@workspace/api-client-react";
import CrudTable from "../../components/admin/CrudTable";
import DampakFormModal from "../../components/admin/DampakFormModal";
import DeleteConfirm from "../../components/admin/DeleteConfirm";

export default function DampakSection() {
  const qc = useQueryClient();
  const { data = [], isLoading } = useGetBencanaDampak();
  const createMutation = useCreateBencanaDampak();
  const updateMutation = useUpdateBencanaDampak();
  const deleteMutation = useDeleteBencanaDampak();

  const [formOpen, setFormOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const invalidate = () => qc.invalidateQueries({ queryKey: getGetBencanaDampakQueryKey() });

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
    { key: "kecamatan", label: "Kecamatan" },
    { key: "jenisKejadian", label: "Jenis" },
    {
      key: "status", label: "Status", render: (v: string) => (
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium
          ${v === "Siaga" ? "bg-red-100 text-red-700" :
            v === "Waspada" ? "bg-yellow-100 text-yellow-700" :
            "bg-green-100 text-green-700"}`}>{v}</span>
      )
    },
    { key: "korbanJiwa", label: "Korban Jiwa" },
    { key: "rumahRusakBerat", label: "Rusak Berat" },
    { key: "tanggal", label: "Tanggal" },
  ];

  return (
    <>
      <CrudTable
        title="Data Dampak Bencana"
        columns={columns}
        data={data}
        isLoading={isLoading}
        onAdd={() => { setEditRecord(null); setFormOpen(true); }}
        onEdit={(row) => { setEditRecord(row); setFormOpen(true); }}
        onDelete={(row) => setDeleteId(row.id)}
      />
      {formOpen && (
        <DampakFormModal
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
