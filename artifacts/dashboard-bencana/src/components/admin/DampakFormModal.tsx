import { useState } from "react";
import { FormModal, Field, FieldRow } from "./FormModal";

const EMPTY = {
  kabupaten: "", kecamatan: "", jenisKejadian: "Banjir",
  korbanJiwa: 0, korbanLuka: 0, rumahRusakBerat: 0, rumahRusakRingan: 0,
  sawahTerdampakHa: 0, tanggal: "", status: "Waspada",
};

const JENIS_OPTIONS = [
  { value: "Banjir", label: "Banjir" },
  { value: "Banjir Bandang", label: "Banjir Bandang" },
  { value: "Longsor", label: "Longsor" },
  { value: "Abrasi", label: "Abrasi" },
  { value: "Angin Puting Beliung", label: "Angin Puting Beliung" },
];

const STATUS_OPTIONS = [
  { value: "Siaga", label: "Siaga" },
  { value: "Waspada", label: "Waspada" },
  { value: "Aman", label: "Aman" },
];

export default function DampakFormModal({ initial, onClose, onSave, saving }: {
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
    <FormModal title={initial ? "Edit Data Dampak" : "Tambah Data Dampak"} onClose={onClose} onSubmit={handleSubmit} saving={saving}>
      <FieldRow>
        <Field label="Kabupaten" name="kabupaten" value={form.kabupaten} onChange={handleChange} />
        <Field label="Kecamatan" name="kecamatan" value={form.kecamatan} onChange={handleChange} />
      </FieldRow>
      <FieldRow>
        <Field label="Jenis Kejadian" name="jenisKejadian" value={form.jenisKejadian} onChange={handleChange} options={JENIS_OPTIONS} />
        <Field label="Status" name="status" value={form.status} onChange={handleChange} options={STATUS_OPTIONS} />
      </FieldRow>
      <FieldRow>
        <Field label="Korban Jiwa" name="korbanJiwa" value={form.korbanJiwa} onChange={handleChange} type="number" />
        <Field label="Korban Luka" name="korbanLuka" value={form.korbanLuka} onChange={handleChange} type="number" />
      </FieldRow>
      <FieldRow>
        <Field label="Rumah Rusak Berat" name="rumahRusakBerat" value={form.rumahRusakBerat} onChange={handleChange} type="number" />
        <Field label="Rumah Rusak Ringan" name="rumahRusakRingan" value={form.rumahRusakRingan} onChange={handleChange} type="number" />
      </FieldRow>
      <FieldRow>
        <Field label="Sawah Terdampak (Ha)" name="sawahTerdampakHa" value={form.sawahTerdampakHa} onChange={handleChange} type="number" />
        <Field label="Tanggal Kejadian" name="tanggal" value={form.tanggal} onChange={handleChange} type="date" />
      </FieldRow>
    </FormModal>
  );
}
