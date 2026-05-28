import { useState } from "react";
import { FormModal, Field, FieldRow } from "./FormModal";

const EMPTY = { nama: "", kabupaten: "", kecamatan: "", volume: 0, kerugian: "", kondisi: "Berat" };

const KONDISI_OPTIONS = [
  { value: "Berat", label: "Berat" },
  { value: "Sedang", label: "Sedang" },
  { value: "Ringan", label: "Ringan" },
];

export default function PertanianFormModal({ initial, onClose, onSave, saving }: {
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
    <FormModal title={initial ? "Edit Data Pertanian" : "Tambah Data Pertanian"} onClose={onClose} onSubmit={handleSubmit} saving={saving}>
      <Field label="Nama Lahan / Komoditas" name="nama" value={form.nama} onChange={handleChange} />
      <FieldRow>
        <Field label="Kabupaten" name="kabupaten" value={form.kabupaten} onChange={handleChange} />
        <Field label="Kecamatan" name="kecamatan" value={form.kecamatan} onChange={handleChange} />
      </FieldRow>
      <FieldRow>
        <Field label="Volume (Ha)" name="volume" value={form.volume} onChange={handleChange} type="number" />
        <Field label="Kondisi Kerusakan" name="kondisi" value={form.kondisi} onChange={handleChange} options={KONDISI_OPTIONS} />
      </FieldRow>
      <Field label="Estimasi Kerugian (contoh: Rp 427.500.000)" name="kerugian" value={form.kerugian} onChange={handleChange} />
    </FormModal>
  );
}
