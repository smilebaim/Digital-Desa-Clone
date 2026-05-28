import { useState } from "react";
import { FormModal, Field, FieldRow } from "./FormModal";

const EMPTY = { nama: "", usia: 0, kecamatan: "", kabupaten: "", status: "Dicari", tanggal: "" };

const STATUS_OPTIONS = [
  { value: "Dicari", label: "Dicari" },
  { value: "Ditemukan", label: "Ditemukan" },
  { value: "Meninggal", label: "Meninggal" },
];

export default function OrangHilangFormModal({ initial, onClose, onSave, saving }: {
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
    <FormModal title={initial ? "Edit Data Orang Hilang" : "Tambah Data Orang Hilang"} onClose={onClose} onSubmit={handleSubmit} saving={saving}>
      <FieldRow>
        <Field label="Nama Lengkap" name="nama" value={form.nama} onChange={handleChange} />
        <Field label="Usia" name="usia" value={form.usia} onChange={handleChange} type="number" />
      </FieldRow>
      <FieldRow>
        <Field label="Kabupaten" name="kabupaten" value={form.kabupaten} onChange={handleChange} />
        <Field label="Kecamatan" name="kecamatan" value={form.kecamatan} onChange={handleChange} />
      </FieldRow>
      <FieldRow>
        <Field label="Status" name="status" value={form.status} onChange={handleChange} options={STATUS_OPTIONS} />
        <Field label="Tanggal Hilang" name="tanggal" value={form.tanggal} onChange={handleChange} type="date" />
      </FieldRow>
    </FormModal>
  );
}
