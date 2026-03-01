import { useEffect } from 'react';
import { 
  Menu, X, Home, Code, Info, LogOut, Settings, 
  Users, FileText, Bell, ChevronRight, Trophy, Sun, Moon
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/lib/theme-context';
import type { User, View } from '@/types';

interface NavigationProps {
  user: User | null;
  currentView: View;
  onViewChange: (view: View) => void;
  onLogout: () => void;
  unreadCount: number;
  isOpen: boolean;
  onToggle: () => void;
  onOpenNotifications: () => void;
}

export function Navigation({ 
  user, currentView, onViewChange, onLogout, unreadCount, 
  isOpen, onToggle, onOpenNotifications 
}: NavigationProps) {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onToggle();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onToggle]);

  const navItems: { id: View; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'script', label: 'Script', icon: Code, badge: unreadCount },
    { id: 'membership', label: 'Membership Records', icon: Trophy },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'about', label: 'About', icon: Info },
  ];

  const handleNavClick = (view: View) => {
    onViewChange(view);
  };

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel rounded-none border-t-0 border-x-0">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left - Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Progression" 
                className="w-10 h-10 object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-white">Progression</h1>
              <p className="text-xs text-muted-foreground">Trade. Grow. Succeed.</p>
            </div>
          </div>

          {/* Center - Status */}
          <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              System Online
            </span>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-neon-purple" />
              )}
            </button>

            {/* Notifications */}
            {user && (
              <button 
                onClick={onOpenNotifications}
                className="relative p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-neon-pink text-white text-xs flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              </button>
            )}
            
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          onClick={onToggle}
        />
      )}

      {/* Slide-in Nav Panel */}
      <div 
        className={`fixed top-0 left-0 h-full w-[320px] max-w-[85vw] z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full glass-panel rounded-none border-l-0 flex flex-col">
          {/* Close Button */}
          <button
            onClick={onToggle}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Profile Block */}
          {user ? (
            <div className="p-6 border-b border-white/5">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16 rounded-xl border-2 border-neon-pink/30">
                  <AvatarImage src={user.profilePic} className="rounded-xl" />
                  <AvatarFallback className="rounded-xl bg-gradient-to-br from-neon-pink to-neon-purple text-white text-lg">
                    {user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-white">{user.username}</h3>
                  <p className="text-sm text-muted-foreground">ID {user.id.slice(-3)}: @{user.username}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        user.role === 'Admin' 
                          ? 'border-neon-pink text-neon-pink' 
                          : user.role === 'Sub_Admin'
                          ? 'border-neon-purple text-neon-purple'
                          : 'border-muted-foreground text-muted-foreground'
                      }`}
                    >
                      {user.role}
                    </Badge>
                    {user.isVerified && (
                      <Badge className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
                        ✓ Verified
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 flex items-center justify-center">
                  <Users className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Guest</h3>
                  <p className="text-sm text-muted-foreground">Sign in to access features</p>
                </div>
              </div>
            </div>
          )}

          {/* Tech Line */}
          <div className="tech-line mx-4" />

          {/* Nav Items */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {user?.role === 'Admin' && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                  currentView === 'admin'
                    ? 'bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 border border-neon-pink/30'
                    : 'hover:bg-white/5'
                }`}
              >
                <Settings className="w-5 h-5 text-neon-pink" />
                <span className="text-white font-medium">Admin Dashboard</span>
                <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
              </button>
            )}

            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                  currentView === item.id
                    ? 'bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 border border-neon-pink/30'
                    : 'hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-5 h-5 ${currentView === item.id ? 'text-neon-pink' : 'text-muted-foreground'}`} />
                <span className="text-white font-medium">{item.label}</span>
                {item.badge ? (
                  <span className="ml-auto min-w-[20px] h-5 px-1 rounded-full bg-neon-pink text-white text-xs flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                ) : (
                  <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
                )}
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/5 space-y-2">
            <button
              onClick={() => handleNavClick('home')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
            >
              <FileText className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground">Home</span>
            </button>
            
            {user ? (
              <button
                onClick={() => {
                  onLogout();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                <LogOut className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-medium">Logout</span>
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('login')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple cursor-pointer"
              >
                <Users className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
