import { useState } from "react";
import { FormModal, Field, FieldRow } from "./FormModal";

const EMPTY = { lat: 0, lng: 0, kabupaten: "", kecamatan: "", jenisBencana: "Banjir", severity: "warning", korban: 0, pengungsi: 0 };

const JENIS_OPTIONS = [
  { value: "Banjir", label: "Banjir" },
  { value: "Banjir Bandang", label: "Banjir Bandang" },
  { value: "Longsor", label: "Longsor" },
  { value: "Abrasi", label: "Abrasi" },
  { value: "Angin Puting Beliung", label: "Angin Puting Beliung" },
];

const SEVERITY_OPTIONS = [
  { value: "critical", label: "Critical (Merah)" },
  { value: "warning", label: "Warning (Oranye)" },
  { value: "normal", label: "Normal (Hijau)" },
];

export default function MarkerFormModal({ initial, onClose, onSave, saving }: {
  initial: any; onClose: () => void; onSave: (v: any) => void; saving: boolean;
}) {
  const [form, setForm] = useState({ ...EMPTY, ...initial });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    setForm((p: any) => ({ ...p, [name]: type === "number" ? Number(value) : value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <FormModal title={initial ? "Edit Map Marker" : "Tambah Map Marker"} onClose={onClose} onSubmit={handleSubmit} saving={saving}>
      <FieldRow>
        <Field label="Kabupaten" name="kabupaten" value={form.kabupaten} onChange={handleChange} />
        <Field label="Kecamatan" name="kecamatan" value={form.kecamatan} onChange={handleChange} />
      </FieldRow>
      <FieldRow>
        <Field label="Jenis Bencana" name="jenisBencana" value={form.jenisBencana} onChange={handleChange} options={JENIS_OPTIONS} />
        <Field label="Tingkat Keparahan" name="severity" value={form.severity} onChange={handleChange} options={SEVERITY_OPTIONS} />
      </FieldRow>
      <FieldRow>
        <Field label="Latitude (contoh: 5.1839)" name="lat" value={form.lat} onChange={handleChange} type="number" />
        <Field label="Longitude (contoh: 96.5084)" name="lng" value={form.lng} onChange={handleChange} type="number" />
      </FieldRow>
      <FieldRow>
        <Field label="Jumlah Korban" name="korban" value={form.korban} onChange={handleChange} type="number" />
        <Field label="Jumlah Pengungsi" name="pengungsi" value={form.pengungsi} onChange={handleChange} type="number" />
      </FieldRow>
    </FormModal>
  );
}
