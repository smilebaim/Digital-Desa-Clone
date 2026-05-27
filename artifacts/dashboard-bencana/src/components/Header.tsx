interface HeaderProps {
  onMenuClick: () => void;
  onRefresh: () => void;
  lastUpdate: string;
}

export default function Header({ onMenuClick, onRefresh, lastUpdate }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white shadow-md">
      <div className="container mx-auto px-4 h-[60px] md:h-[72px] flex items-center justify-between">
        
        {/* Left: Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
            <i className="fa-solid fa-shield-halved text-xl"></i>
          </div>
          <div className="flex flex-col">
            <h1 className="text-base md:text-xl font-bold leading-tight tracking-tight uppercase">Dashboard Monitoring</h1>
            <span className="text-xs md:text-sm text-red-100 font-medium tracking-wide">Hidrometeorologi Aceh</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end mr-2">
            <span className="text-xs text-red-200">Update Terakhir</span>
            <span className="text-sm font-semibold">{lastUpdate} WIB</span>
          </div>
          
          <button 
            onClick={onRefresh}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
            title="Refresh Data"
          >
            <i className="fa-solid fa-sync-alt text-sm"></i>
          </button>
          
          <button 
            onClick={onMenuClick}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center md:hidden"
          >
            <i className="fa-solid fa-bars text-sm"></i>
          </button>
        </div>
      </div>
    </header>
  );
}
