interface HeaderProps {
  onMenuClick: () => void;
  onRefresh: () => void;
  lastUpdate: string;
}

export default function Header({ onMenuClick, onRefresh, lastUpdate }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white shadow-lg sticky top-0 z-50">
      <div className="px-2 md:px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
            <div className="bg-white/20 p-1.5 md:p-2 rounded-lg flex-shrink-0">
              <i className="fas fa-shield-alt text-lg md:text-2xl"></i>
            </div>
            <div>
              <h1 className="text-sm md:text-lg font-bold truncate">Dashboard Monitoring</h1>
              <p className="text-xs text-red-200 hidden md:block">Hidrometeorologi</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-red-200">Update Terakhir</p>
              <p className="text-xs md:text-sm font-medium">{lastUpdate}</p>
            </div>
            
            <button 
              onClick={onRefresh}
              className="bg-white/20 hover:bg-white/30 p-1.5 md:p-2 rounded-lg transition"
              title="Refresh Data"
              data-testid="button-refresh"
            >
              <i className="fas fa-sync-alt text-sm md:text-base"></i>
            </button>
            
            <button 
              onClick={onMenuClick}
              className="md:hidden bg-white/20 hover:bg-white/30 p-1.5 rounded-lg transition"
              data-testid="button-mobile-menu"
            >
              <i className="fas fa-bars text-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}