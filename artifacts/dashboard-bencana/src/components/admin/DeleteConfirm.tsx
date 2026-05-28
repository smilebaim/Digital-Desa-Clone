import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  onCancel: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export default function DeleteConfirm({ onCancel, onConfirm, loading }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm p-6">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle size={24} className="text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Hapus Data?</h3>
          <p className="text-sm text-gray-500">Tindakan ini tidak dapat dibatalkan. Data akan dihapus secara permanen.</p>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? <RefreshCw size={14} className="animate-spin" /> : null}
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
