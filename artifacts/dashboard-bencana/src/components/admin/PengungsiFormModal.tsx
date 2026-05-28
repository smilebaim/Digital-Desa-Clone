import { useState } from "react";
import { FormModal, Field, FieldRow } from "./FormModal";

const EMPTY = { kabupaten: "", penduduk: 0, kk: 0, disabilitas: 0, pengungsi: 0 };

export default function PengungsiFormModal({ initial, onClose, onSave, saving }: {
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
    <FormModal title={initial ? "Edit Data Pengungsi" : "Tambah Data Pengungsi"} onClose={onClose} onSubmit={handleSubmit} saving={saving}>
      <Field label="Kabupaten" name="kabupaten" value={form.kabupaten} onChange={handleChange} />
      <FieldRow>
        <Field label="Jumlah Penduduk" name="penduduk" value={form.penduduk} onChange={handleChange} type="number" />
        <Field label="Jumlah KK" name="kk" value={form.kk} onChange={handleChange} type="number" />
      </FieldRow>
      <FieldRow>
        <Field label="Penyandang Disabilitas" name="disabilitas" value={form.disabilitas} onChange={handleChange} type="number" />
        <Field label="Jumlah Pengungsi" name="pengungsi" value={form.pengungsi} onChange={handleChange} type="number" />
      </FieldRow>
    </FormModal>
  );
}
