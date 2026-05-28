import { X, RefreshCw } from "lucide-react";

interface Props {
  title: string;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  saving: boolean;
  children: React.ReactNode;
}

export function FormModal({ title, onClose, onSubmit, saving, children }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl my-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-base font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6">
          <div className="space-y-4">{children}</div>
          <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {saving ? <RefreshCw size={14} className="animate-spin" /> : null}
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function FieldRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>;
}

export function Field({
  label, name, value, onChange, type = "text", required = true, options,
}: {
  label: string; name: string; value: string | number; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  type?: string; required?: boolean; options?: { value: string; label: string }[];
}) {
  const cls = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent";
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {options ? (
        <select name={name} value={value} onChange={onChange} required={required} className={cls}>
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} required={required} className={cls} />
      )}
    </div>
  );
}
