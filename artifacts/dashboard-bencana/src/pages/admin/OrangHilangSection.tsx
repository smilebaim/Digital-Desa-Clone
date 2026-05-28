import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetBencanaOrangHilang,
  useCreateBencanaOrangHilang,
  useUpdateBencanaOrangHilang,
  useDeleteBencanaOrangHilang,
  getGetBencanaOrangHilangQueryKey,
} from "@workspace/api-client-react";
import CrudTable from "../../components/admin/CrudTable";
import OrangHilangFormModal from "../../components/admin/OrangHilangFormModal";
import DeleteConfirm from "../../components/admin/DeleteConfirm";

export default function OrangHilangSection() {
  const qc = useQueryClient();
  const { data = [], isLoading } = useGetBencanaOrangHilang();
  const createMutation = useCreateBencanaOrangHilang();
  const updateMutation = useUpdateBencanaOrangHilang();
  const deleteMutation = useDeleteBencanaOrangHilang();

  const [formOpen, setFormOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const invalidate = () => qc.invalidateQueries({ queryKey: getGetBencanaOrangHilangQueryKey() });

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
    { key: "nama", label: "Nama" },
    { key: "usia", label: "Usia" },
    { key: "kecamatan", label: "Kecamatan" },
    { key: "kabupaten", label: "Kabupaten" },
    {
      key: "status", label: "Status", render: (v: string) => (
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium
          ${v === "Dicari" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>{v}</span>
      )
    },
    { key: "tanggal", label: "Tanggal" },
  ];

  return (
    <>
      <CrudTable
        title="Data Orang Hilang"
        columns={columns}
        data={data}
        isLoading={isLoading}
        onAdd={() => { setEditRecord(null); setFormOpen(true); }}
        onEdit={(row) => { setEditRecord(row); setFormOpen(true); }}
        onDelete={(row) => setDeleteId(row.id)}
      />
      {formOpen && (
        <OrangHilangFormModal
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
