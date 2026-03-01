import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { HomePage } from '@/sections/HomePage';
import { AuthPage } from '@/sections/AuthPage';
import { Dashboard } from '@/sections/Dashboard';
import { AboutPage } from '@/sections/AboutPage';
import { AdminDashboard } from '@/sections/AdminDashboard';
import { MembershipRecords } from '@/sections/MembershipRecords';
import { SettingsPage } from '@/sections/SettingsPage';
import { SplashScreen } from '@/components/SplashScreen';
import { OnboardingFlow } from '@/components/OnboardingFlow';
import { AIChat } from '@/components/AIChat';
import { NotificationCenter } from '@/components/NotificationCenter';
import { ThemeProvider } from '@/lib/theme-context';
import { useAuth } from '@/hooks/useAuth';
import { useNotifications } from '@/hooks/useNotifications';
import { store } from '@/lib/store';
import type { User, View } from '@/types';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

function AppContent() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [navOpen, setNavOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [newlyRegisteredUser, setNewlyRegisteredUser] = useState<User | null>(null);
  
  const { user, isLoading, isAuthenticated, isAdmin, logout } = useAuth();
  const { unreadCount, refresh: refreshNotifications } = useNotifications(user?.id);

  useEffect(() => {
    store.initialize();
    
    // Check if user is already logged in
    const currentUser = store.getCurrentUser();
    if (currentUser) {
      if (currentUser.role === 'Admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('dashboard');
      }
    } else if (!store.hasSeenSplash()) {
      // Show splash for new visitors
      setShowSplash(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    store.setSplashSeen(true);
  };

  const handleAuth = (authenticatedUser: User, isNewRegistration = false) => {
    if (isNewRegistration) {
      setNewlyRegisteredUser(authenticatedUser);
      setShowOnboarding(true);
    } else if (authenticatedUser.role === 'Admin') {
      setCurrentView('admin');
      toast.success(`Welcome back, ${authenticatedUser.username}!`, {
        description: 'You have admin access.',
      });
    } else {
      setCurrentView('dashboard');
      toast.success(`Welcome, ${authenticatedUser.username}!`, {
        description: 'Your dashboard is ready.',
      });
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    if (newlyRegisteredUser) {
      // Create welcome notification
      store.createNotification({
        userId: newlyRegisteredUser.id,
        type: 'welcome',
        title: 'Welcome to Progression!',
        message: `Hi ${newlyRegisteredUser.username}, welcome to the Progression community! Your account has been created successfully. Explore your dashboard to get started with our trading tools and scripts. Don't forget to link your script account for verified access!`,
        read: false,
        icon: 'welcome',
      });
      
      setCurrentView('dashboard');
      toast.success('Welcome to Progression!', {
        description: 'Your account is ready.',
      });
      setNewlyRegisteredUser(null);
    }
  };

  const handleLogout = () => {
    logout();
    setCurrentView('home');
    toast.info('You have been logged out.');
  };

  const handleViewChange = (view: View) => {
    setNavOpen(false);
    
    if ((view === 'dashboard' || view === 'script' || view === 'admin' || view === 'membership') && !isAuthenticated) {
      setCurrentView('login');
      toast.error('Please sign in to access this page.');
      return;
    }
    
    if (view === 'admin' && !isAdmin) {
      setCurrentView('dashboard');
      toast.error('You do not have admin access.');
      return;
    }
    
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleNotification = () => {
    refreshNotifications();
    toast.success('Update successful!', {
      description: 'Changes have been saved.',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-neon-pink/20 border-t-neon-pink animate-spin" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${navOpen ? 'nav-open' : ''}`}>
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: 'rgba(8, 8, 12, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'white',
          },
        }}
      />
      
      {/* Splash Screen */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      
      {/* Onboarding Flow */}
      {showOnboarding && newlyRegisteredUser && (
        <OnboardingFlow 
          user={newlyRegisteredUser} 
          onComplete={handleOnboardingComplete} 
        />
      )}

      {/* Navigation */}
      {(currentView !== 'home' || isAuthenticated) && (
        <Navigation
          user={user}
          currentView={currentView}
          onViewChange={handleViewChange}
          onLogout={handleLogout}
          unreadCount={unreadCount}
          isOpen={navOpen}
          onToggle={() => setNavOpen(!navOpen)}
          onOpenNotifications={() => setShowNotifications(true)}
        />
      )}

      {/* Notification Center */}
      {user && (
        <NotificationCenter
          userId={user.id}
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
        />
      )}

      {/* AI Chat */}
      {user && (
        <AIChat
          userId={user.id}
          isOpen={showAIChat}
          onToggle={() => setShowAIChat(!showAIChat)}
        />
      )}

      {/* Main Content */}
      <main className="relative">
        {currentView === 'home' && <HomePage onViewChange={handleViewChange} />}
        
        {currentView === 'signup' && (
          <AuthPage 
            mode="signup" 
            onViewChange={handleViewChange} 
            onAuth={(user) => handleAuth(user, true)}
          />
        )}
        
        {currentView === 'login' && (
          <AuthPage 
            mode="login" 
            onViewChange={handleViewChange} 
            onAuth={(user) => handleAuth(user, false)}
          />
        )}
        
        {currentView === 'dashboard' && isAuthenticated && user && (
          <Dashboard 
            user={user} 
            onNotification={handleNotification}
            onOpenAIChat={() => setShowAIChat(true)}
          />
        )}
        
        {currentView === 'script' && isAuthenticated && user && (
          <Dashboard 
            user={user} 
            onNotification={handleNotification}
            onOpenAIChat={() => setShowAIChat(true)}
          />
        )}
        
        {currentView === 'about' && <AboutPage />}
        
        {currentView === 'membership' && isAuthenticated && (
          <MembershipRecords isAdmin={isAdmin} />
        )}
        
        {currentView === 'settings' && isAuthenticated && user && (
          <SettingsPage 
            user={user} 
            onViewChange={handleViewChange}
            onUserUpdate={(updatedUser) => {
              // Update user state
              const users = JSON.parse(localStorage.getItem('progression_users') || '[]');
              const index = users.findIndex((u: User) => u.id === updatedUser.id);
              if (index !== -1) {
                users[index] = updatedUser;
                localStorage.setItem('progression_users', JSON.stringify(users));
              }
              localStorage.setItem('progression_current_user', JSON.stringify(updatedUser));
            }}
          />
        )}
        
        {currentView === 'admin' && isAuthenticated && isAdmin && (
          <AdminDashboard onNotification={handleNotification} />
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
