import { useState, useEffect, useRef } from 'react';
import { 
  Users, Shield, Activity, Calendar, 
  ExternalLink, Download, Lock, Unlock, Bell,
  ChevronLeft, ChevronRight, BarChart3, PieChart,
  CheckCircle, AlertCircle, Terminal, Code, Cpu
} from 'lucide-react';
import { CircularProgress } from '@/components/CircularProgress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { store } from '@/lib/store';
import type { User, Announcement, Group, ProjectRecord, ScriptUpdate, Notification } from '@/types';

interface DashboardProps {
  user: User;
  onNotification: () => void;
  onOpenAIChat: () => void;
}

export function Dashboard({ user, onNotification, onOpenAIChat }: DashboardProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [scriptUpdates, setScriptUpdates] = useState<ScriptUpdate[]>([]);
  const [members, setMembers] = useState<User[]>([]);
  const [stats, setStats] = useState({ 
    totalMembers: 0, activeMembers: 0, inactiveMembers: 0, 
    averageParticipation: 0, verifiedMembers: 0 
  });
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Script linking form
  const [linkForm, setLinkForm] = useState({ email: '', password: '' });
  const [linkError, setLinkError] = useState('');
  const [linkSuccess, setLinkSuccess] = useState('');
  const [isLinking, setIsLinking] = useState(false);

  const groupsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    store.initialize();
    loadData();
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (announcements.length > 1) {
      const interval = setInterval(() => {
        setCurrentAnnouncement((prev) => (prev + 1) % announcements.filter(a => a.active).length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [announcements]);

  const loadData = () => {
    setAnnouncements(store.getAnnouncements().filter(a => a.active));
    setGroups(store.getGroups());
    setProjects(store.getProjects());
    setScriptUpdates(store.getScriptUpdates().filter(s => s.active));
    setMembers(store.getUsers());
    setStats(store.getStats());
    setNotifications(store.getNotifications(user.id).slice(0, 3));
  };

  const handleLinkScript = async (e: React.FormEvent) => {
    e.preventDefault();
    setLinkError('');
    setLinkSuccess('');
    setIsLinking(true);

    try {
      const result = store.linkScriptToUser(user.id, linkForm.email, linkForm.password);
      
      if (result.success) {
        setLinkSuccess('Script account linked successfully! You are now verified.');
        const updatedUser = store.getUserById(user.id);
        if (updatedUser) {
          store.setCurrentUser(updatedUser);
        }
        loadData();
        onNotification();
      } else {
        setLinkError(result.error || 'Failed to link script account');
      }
    } catch (err) {
      setLinkError('An error occurred. Please try again.');
    } finally {
      setIsLinking(false);
    }
  };

  const scrollGroups = (direction: 'left' | 'right') => {
    if (groupsRef.current) {
      const scrollAmount = 280;
      groupsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const activeAnnouncements = announcements.filter(a => a.active);
  const unreadNotifications = notifications.filter(n => !n.read);

  return (
    <div className="min-h-screen pt-16 md:pt-20 pb-8 px-3 md:px-4 noise-bg">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Banner */}
        <div className="glass-panel p-4 md:p-6 mb-4 md:mb-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-pink to-neon-purple" />
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-neon-pink/10 rounded-full blur-[40px]" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3 md:gap-4">
              <Avatar className="w-12 h-12 md:w-16 md:h-16 rounded-xl border-2 border-neon-pink/30">
                <AvatarImage src={user.profilePic} className="rounded-xl" />
                <AvatarFallback className="rounded-xl bg-gradient-to-br from-neon-pink to-neon-purple text-white text-sm md:text-lg">
                  {user.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-white">
                  Welcome, {user.firstName || user.username}!
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  {user.isVerified ? (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 flex items-center gap-1 text-xs">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 flex items-center gap-1 text-xs">
                      <AlertCircle className="w-3 h-3" />
                      Not Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            {/* AI Welcome Button */}
            <button
              onClick={onOpenAIChat}
              className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl glass-card hover:border-neon-pink/30 transition-all group self-start md:self-auto"
            >
              <div className="relative">
                <img src="/ai-avatar.png" alt="Little BON" className="w-8 h-8 md:w-10 md:h-10 rounded-full" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-neon-pink rounded-full animate-ping" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-neon-pink rounded-full" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-white">Little BON</p>
                <p className="text-xs text-neon-pink">Click to chat!</p>
              </div>
            </button>
          </div>
        </div>

        {/* Notifications Preview */}
        {unreadNotifications.length > 0 && (
          <div className="glass-panel p-3 md:p-4 mb-4 md:mb-6 border-l-4 border-neon-pink">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-neon-pink flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">
                  You have {unreadNotifications.length} unread notification{unreadNotifications.length > 1 ? 's' : ''}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {unreadNotifications[0]?.title}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Announcement Ticker */}
        <div className="glass-panel p-3 md:p-4 mb-4 md:mb-6 overflow-hidden">
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 md:w-5 md:h-5 text-neon-pink flex-shrink-0" />
            <div className="flex-1 overflow-hidden min-w-0">
              {activeAnnouncements.length > 0 ? (
                <p className="text-sm text-white animate-fade-in truncate">
                  {activeAnnouncements[currentAnnouncement]?.text}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">No announcements</p>
              )}
            </div>
            {activeAnnouncements.length > 1 && (
              <div className="flex gap-1 flex-shrink-0">
                {activeAnnouncements.map((_, i) => (
                  <div 
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${i === currentAnnouncement ? 'bg-neon-pink' : 'bg-white/20'}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Groups Carousel */}
            <div className="glass-panel p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base md:text-lg font-semibold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 md:w-5 md:h-5 text-neon-pink" />
                  Our Communities
                </h2>
                <div className="flex gap-1 md:gap-2">
                  <button onClick={() => scrollGroups('left')} className="p-1.5 md:p-2 rounded-lg hover:bg-white/5">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button onClick={() => scrollGroups('right')} className="p-1.5 md:p-2 rounded-lg hover:bg-white/5">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div 
                ref={groupsRef}
                className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-thin pb-2 -mx-1 px-1"
              >
                {groups.map((group) => (
                  <a
                    key={group.id}
                    href={group.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-64 md:w-72 group"
                  >
                    <div className="relative rounded-xl overflow-hidden">
                      <img 
                        src={group.image} 
                        alt={group.name}
                        className="w-full h-32 md:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                        <h3 className="font-semibold text-white text-sm md:text-base">{group.name}</h3>
                        <p className="text-xs text-muted-foreground">{group.membersCount.toLocaleString()} members</p>
                      </div>
                      <div className="absolute top-2 right-2 p-1.5 md:p-2 rounded-lg bg-green-500/20">
                        <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Stats Charts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div className="glass-panel p-4 md:p-6">
                <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-3 md:mb-4 flex items-center gap-2">
                  <BarChart3 className="w-3 h-3 md:w-4 md:h-4" />
                  Member Overview
                </h3>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm text-muted-foreground">Total</span>
                    <span className="text-base md:text-lg font-bold text-white">{stats.totalMembers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm text-muted-foreground">Active</span>
                    <div className="flex items-center gap-2">
                      <span className="text-base md:text-lg font-bold text-green-400">{stats.activeMembers}</span>
                      <CircularProgress value={(stats.activeMembers / Math.max(stats.totalMembers, 1)) * 100} size={28} strokeWidth={3} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm text-muted-foreground">Verified</span>
                    <div className="flex items-center gap-2">
                      <span className="text-base md:text-lg font-bold text-neon-pink">{stats.verifiedMembers}</span>
                      <CircularProgress value={(stats.verifiedMembers / Math.max(stats.totalMembers, 1)) * 100} size={28} strokeWidth={3} color="#ff2f92" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-4 md:p-6">
                <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-3 md:mb-4 flex items-center gap-2">
                  <PieChart className="w-3 h-3 md:w-4 md:h-4" />
                  Participation
                </h3>
                <div className="flex items-center justify-center">
                  <CircularProgress value={stats.averageParticipation} size={80} strokeWidth={6} />
                </div>
                <p className="text-center text-xs md:text-sm text-muted-foreground mt-3 md:mt-4">
                  Average rate
                </p>
              </div>
            </div>

            {/* Hacking Tools Section */}
            <div className="glass-panel p-4 md:p-6">
              <h2 className="text-base md:text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Terminal className="w-4 h-4 md:w-5 md:h-5 text-neon-pink" />
                Hacking Tools
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {[
                  { icon: Shield, name: 'Network Scanner', desc: 'Port & vulnerability scan' },
                  { icon: Code, name: 'Exploit Kit', desc: 'POC security tools' },
                  { icon: Cpu, name: 'Crypto Analyzer', desc: 'Blockchain audit' },
                  { icon: Terminal, name: 'MOD Script', desc: 'Advanced framework' },
                ].map((tool) => (
                  <div key={tool.name} className="glass-card p-3 md:p-4 text-center">
                    <tool.icon className="w-6 h-6 md:w-8 md:h-8 text-neon-pink mx-auto mb-2" />
                    <h4 className="text-xs md:text-sm font-medium text-white">{tool.name}</h4>
                    <p className="text-xs text-muted-foreground">{tool.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Tabs */}
          <div className="glass-panel p-4 md:p-6">
            <Tabs defaultValue="members" className="w-full">
              <TabsList className="w-full grid grid-cols-4 bg-white/5 mb-4">
                <TabsTrigger value="members" className="text-[10px] md:text-xs data-[state=active]:bg-neon-pink/20 px-1">
                  <Users className="w-3 h-3 md:w-4 md:h-4 sm:mr-1" />
                  <span className="hidden sm:inline">Members</span>
                </TabsTrigger>
                <TabsTrigger value="records" className="text-[10px] md:text-xs data-[state=active]:bg-neon-pink/20 px-1">
                  <Activity className="w-3 h-3 md:w-4 md:h-4 sm:mr-1" />
                  <span className="hidden sm:inline">Records</span>
                </TabsTrigger>
                <TabsTrigger value="projects" className="text-[10px] md:text-xs data-[state=active]:bg-neon-pink/20 px-1">
                  <BarChart3 className="w-3 h-3 md:w-4 md:h-4 sm:mr-1" />
                  <span className="hidden sm:inline">Projects</span>
                </TabsTrigger>
                <TabsTrigger value="script" className="text-[10px] md:text-xs data-[state=active]:bg-neon-pink/20 px-1">
                  <Lock className="w-3 h-3 md:w-4 md:h-4 sm:mr-1" />
                  <span className="hidden sm:inline">Script</span>
                </TabsTrigger>
              </TabsList>

              {/* Members Tab */}
              <TabsContent value="members" className="space-y-3">
                <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-2">Member Status</h3>
                <div className="space-y-2 md:space-y-3 max-h-[300px] md:max-h-[500px] overflow-y-auto scrollbar-thin">
                  {members.map((member) => (
                    <div key={member.id} className="glass-card p-2 md:p-3 flex items-center gap-2 md:gap-3">
                      <Avatar className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex-shrink-0">
                        <AvatarImage src={member.profilePic} className="rounded-lg" />
                        <AvatarFallback className="rounded-lg bg-gradient-to-br from-neon-pink to-neon-purple text-xs">
                          {member.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs md:text-sm font-medium text-white truncate">{member.username}</p>
                        <p className="text-[10px] md:text-xs text-muted-foreground">
                          {new Date(member.joinedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                        <CircularProgress value={member.participationPct} size={28} strokeWidth={3} />
                        {member.isVerified ? (
                          <Badge className="bg-green-500/20 text-green-400 text-[10px] md:text-xs p-0.5">
                            <CheckCircle className="w-3 h-3" />
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-[10px] md:text-xs border-yellow-500 text-yellow-400 p-0.5">
                            Pending
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Records Tab */}
              <TabsContent value="records" className="space-y-3">
                <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-2">Groups</h3>
                <div className="space-y-2 md:space-y-3">
                  {groups.map((group) => (
                    <div key={group.id} className="glass-card p-3 md:p-4">
                      <div className="flex items-start gap-2 md:gap-3">
                        <img src={group.image} alt={group.name} className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs md:text-sm font-medium text-white truncate">{group.name}</h4>
                          <p className="text-[10px] md:text-xs text-muted-foreground">
                            {group.membersCount} members
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Projects Tab */}
              <TabsContent value="projects" className="space-y-3">
                <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-2">Projects</h3>
                <div className="space-y-2 md:space-y-3 max-h-[300px] md:max-h-[500px] overflow-y-auto scrollbar-thin">
                  {projects.map((project) => (
                    <div key={project.id} className="glass-card p-3 md:p-4">
                      <div className="flex items-start justify-between mb-1 md:mb-2">
                        <h4 className="text-xs md:text-sm font-medium text-white truncate pr-2">{project.title}</h4>
                        <CircularProgress value={project.assurancePct} size={24} strokeWidth={3} />
                      </div>
                      <div className="space-y-0.5 md:space-y-1 text-xs md:text-sm">
                        <p className="text-muted-foreground text-[10px] md:text-xs">
                          <Calendar className="w-2.5 h-2.5 md:w-3 md:h-3 inline mr-1" />
                          {project.month}
                        </p>
                        <p className="text-green-400 text-[10px] md:text-xs truncate">
                          {project.topAchievement}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Script Tab */}
              <TabsContent value="script" className="space-y-3">
                {user.isVerified ? (
                  <div className="space-y-3 md:space-y-4">
                    <div className="p-3 md:p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                      <div className="flex items-center gap-2 mb-1 md:mb-2">
                        <Unlock className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                        <span className="font-medium text-green-400 text-sm md:text-base">Access Granted</span>
                      </div>
                      <p className="text-[10px] md:text-xs text-muted-foreground truncate">
                        Linked: {user.linkedScriptEmail}
                      </p>
                    </div>
                    
                    <h3 className="text-xs md:text-sm font-medium text-muted-foreground">Available Scripts</h3>
                    <div className="space-y-2 md:space-y-3">
                      {scriptUpdates.map((update) => (
                        <div key={update.id} className="glass-card p-3 md:p-4">
                          <h4 className="text-xs md:text-sm font-medium text-white mb-1">{update.title}</h4>
                          <p className="text-[10px] md:text-sm text-muted-foreground mb-2 md:mb-3 line-clamp-2">{update.description}</p>
                          {update.fileLink && (
                            <a
                              href={update.fileLink}
                              className="inline-flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-neon-pink hover:underline"
                            >
                              <Download className="w-3 h-3 md:w-4 md:h-4" />
                              Download
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 md:space-y-4">
                    <div className="p-3 md:p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                      <div className="flex items-center gap-2 mb-1 md:mb-2">
                        <Lock className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                        <span className="font-medium text-yellow-400 text-sm md:text-base">Link Script Account</span>
                      </div>
                      <p className="text-[10px] md:text-xs text-muted-foreground">
                        Enter your script credentials to verify and access premium tools.
                      </p>
                    </div>

                    <form onSubmit={handleLinkScript} className="space-y-2 md:space-y-3">
                      <input
                        type="email"
                        placeholder="Script email"
                        value={linkForm.email}
                        onChange={(e) => setLinkForm({ ...linkForm, email: e.target.value })}
                        className="input-glass text-xs md:text-sm py-2 md:py-3"
                        required
                      />
                      <input
                        type="password"
                        placeholder="Script password"
                        value={linkForm.password}
                        onChange={(e) => setLinkForm({ ...linkForm, password: e.target.value })}
                        className="input-glass text-xs md:text-sm py-2 md:py-3"
                        required
                      />
                      
                      {linkError && (
                        <p className="text-xs md:text-sm text-red-400">{linkError}</p>
                      )}
                      {linkSuccess && (
                        <p className="text-xs md:text-sm text-green-400">{linkSuccess}</p>
                      )}
                      
                      <button 
                        type="submit" 
                        disabled={isLinking}
                        className="w-full btn-primary disabled:opacity-50 text-xs md:text-sm py-2 md:py-3"
                      >
                        {isLinking ? 'Linking...' : 'Link Account'}
                      </button>
                    </form>

                    <div className="p-2 md:p-3 rounded-lg bg-white/5 text-[10px] md:text-xs text-muted-foreground">
                      <p className="font-medium text-white mb-1">Script credentials:</p>
                      <p className="truncate">ceo@gmail.com / Hack_your_day</p>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
