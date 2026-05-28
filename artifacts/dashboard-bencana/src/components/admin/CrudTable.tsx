import { Plus, Pencil, Trash2, RefreshCw } from "lucide-react";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface Props {
  title: string;
  columns: Column[];
  data: any[];
  isLoading: boolean;
  onAdd: () => void;
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
}

export default function CrudTable({ title, columns, data, isLoading, onAdd, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
        <div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{data.length} rekaman</p>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          Tambah
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <RefreshCw className="animate-spin text-gray-400" size={24} />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-10">#</th>
                {columns.map((col) => (
                  <th key={col.key} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 2} className="text-center py-10 text-gray-400 text-sm">
                    Belum ada data
                  </td>
                </tr>
              ) : (
                data.map((row, idx) => (
                  <tr key={row.id ?? idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-400 text-xs">{idx + 1}</td>
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3 text-gray-700 whitespace-nowrap max-w-[180px] truncate">
                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onEdit(row)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => onDelete(row)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
