interface KpiCardProps {
  title: string;
  value: string | number;
  icon: string;
  colorClass: string;
  bgClass?: string;
  horizontal?: boolean;
  onClick?: () => void;
}

export default function KpiCard({
  title,
  value,
  icon,
  colorClass,
  bgClass = "bg-white",
  horizontal = false,
  onClick,
}: KpiCardProps) {
  if (horizontal) {
    return (
      <div
        className={`kpi-card flex items-center gap-3 ${bgClass}`}
        onClick={onClick}
      >
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${colorClass}`}
        >
          <i className={`fa-solid ${icon} text-sm`}></i>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide leading-tight line-clamp-1">
            {title}
          </span>
          <span className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">
            {typeof value === "number" ? value.toLocaleString() : value}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`kpi-card flex items-center gap-3 ${bgClass}`}
      onClick={onClick}
    >
      <div
        className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0 ${colorClass}`}
      >
        <i className={`fa-solid ${icon} text-base md:text-lg`}></i>
      </div>
      <div className="flex flex-col min-w-0">
        <span
          className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide leading-tight"
          style={{ wordBreak: "break-word", whiteSpace: "normal" }}
        >
          {title}
        </span>
        <span className="text-lg md:text-2xl font-bold text-gray-800 leading-tight mt-0.5">
          {typeof value === "number" ? value.toLocaleString() : value}
        </span>
      </div>
    </div>
  );
}
