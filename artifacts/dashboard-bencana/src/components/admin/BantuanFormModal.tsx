import { useState } from "react";
import { FormModal, Field, FieldRow } from "./FormModal";

const EMPTY = { desa: "", kecamatan: "", kabupaten: "", satuan: "", warna: "kuning" };

const WARNA_OPTIONS = [
  { value: "kuning", label: "Kuning – Terdampak" },
  { value: "biru", label: "Biru – Terancam" },
  { value: "biru_keabuan", label: "Biru Keabuan – Waspada" },
  { value: "putih", label: "Putih – Aman" },
];

export default function BantuanFormModal({ initial, onClose, onSave, saving }: {
  initial: any; onClose: () => void; onSave: (v: any) => void; saving: boolean;
}) {
  const [form, setForm] = useState({ ...EMPTY, ...initial });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((p: any) => ({ ...p, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <FormModal title={initial ? "Edit Bantuan Desa" : "Tambah Bantuan Desa"} onClose={onClose} onSubmit={handleSubmit} saving={saving}>
      <Field label="Nama Desa / Gampong" name="desa" value={form.desa} onChange={handleChange} />
      <FieldRow>
        <Field label="Kabupaten" name="kabupaten" value={form.kabupaten} onChange={handleChange} />
        <Field label="Kecamatan" name="kecamatan" value={form.kecamatan} onChange={handleChange} />
      </FieldRow>
      <FieldRow>
        <Field label="Satuan Wilayah" name="satuan" value={form.satuan} onChange={handleChange} />
        <Field label="Status Bantuan (Warna)" name="warna" value={form.warna} onChange={handleChange} options={WARNA_OPTIONS} />
      </FieldRow>
    </FormModal>
  );
}
