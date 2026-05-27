interface KpiCardProps {
  title: string;
  value: string | number;
  icon: string;
  colorClass: string;
  bgClass?: string;
  onClick?: () => void;
}

export default function KpiCard({ title, value, icon, colorClass, bgClass = "bg-white dark:bg-card", onClick }: KpiCardProps) {
  return (
    <div className={`kpi-card flex items-start gap-4 ${bgClass}`} onClick={onClick}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${colorClass}`}>
        <i className={`fa-solid ${icon} text-lg`}></i>
      </div>
      <div className="flex flex-col overflow-hidden">
        <span className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider truncate" title={title}>{title}</span>
        <span className="text-xl md:text-2xl font-bold text-foreground truncate mt-0.5">{value.toLocaleString()}</span>
      </div>
    </div>
  );
}
