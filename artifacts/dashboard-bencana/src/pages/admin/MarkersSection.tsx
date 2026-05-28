import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetBencanaMarkers,
  useCreateBencanaMarker,
  useUpdateBencanaMarker,
  useDeleteBencanaMarker,
  getGetBencanaMarkersQueryKey,
} from "@workspace/api-client-react";
import CrudTable from "../../components/admin/CrudTable";
import MarkerFormModal from "../../components/admin/MarkerFormModal";
import DeleteConfirm from "../../components/admin/DeleteConfirm";

export default function MarkersSection() {
  const qc = useQueryClient();
  const { data = [], isLoading } = useGetBencanaMarkers();
  const createMutation = useCreateBencanaMarker();
  const updateMutation = useUpdateBencanaMarker();
  const deleteMutation = useDeleteBencanaMarker();

  const [formOpen, setFormOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const invalidate = () => qc.invalidateQueries({ queryKey: getGetBencanaMarkersQueryKey() });

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

  const SEVERITY_STYLE: Record<string, string> = {
    critical: "bg-red-100 text-red-700",
    warning: "bg-yellow-100 text-yellow-700",
    normal: "bg-green-100 text-green-700",
  };

  const columns = [
    { key: "kabupaten", label: "Kabupaten" },
    { key: "kecamatan", label: "Kecamatan" },
    { key: "jenisBencana", label: "Jenis Bencana" },
    {
      key: "severity", label: "Severity", render: (v: string) => (
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${SEVERITY_STYLE[v] ?? "bg-gray-100 text-gray-700"}`}>{v}</span>
      )
    },
    { key: "korban", label: "Korban" },
    { key: "pengungsi", label: "Pengungsi" },
    { key: "lat", label: "Lat" },
    { key: "lng", label: "Lng" },
  ];

  return (
    <>
      <CrudTable
        title="Data Peta Marker"
        columns={columns}
        data={data}
        isLoading={isLoading}
        onAdd={() => { setEditRecord(null); setFormOpen(true); }}
        onEdit={(row) => { setEditRecord(row); setFormOpen(true); }}
        onDelete={(row) => setDeleteId(row.id)}
      />
      {formOpen && (
        <MarkerFormModal
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
