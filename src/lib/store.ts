import type { 
  User, Announcement, Group, GroupMember, ProjectRecord, 
  ScriptUpdate, ScriptAccount, ScriptAccess, Notification, 
  MembershipRecord, StatsSummary, AIChatMessage
} from '@/types';

const STORAGE_KEYS = {
  users: 'progression_users',
  currentUser: 'progression_current_user',
  announcements: 'progression_announcements',
  groups: 'progression_groups',
  groupMembers: 'progression_group_members',
  projects: 'progression_projects',
  scriptUpdates: 'progression_script_updates',
  scriptAccounts: 'progression_script_accounts',
  scriptAccess: 'progression_script_access',
  notifications: 'progression_notifications',
  membershipRecords: 'progression_membership_records',
  aiChat: 'progression_ai_chat',
  hasSeenSplash: 'progression_splash_seen',
};

// Initial seed data
const seedUsers: User[] = [
  {
    id: '1',
    email: 'ceo@gmail.com',
    username: 'BON',
    password: 'olokpa888',
    profilePic: '',
    whatsapp: '',
    role: 'Admin',
    joinedAt: Date.now(),
    participationPct: 100,
    activityCount: 150,
    lastActiveAt: Date.now(),
    isActive: true,
    firstName: 'Bon',
    lastName: 'Jac',
    country: 'Nigeria',
    experienceLevel: 'expert',
    isVerified: true,
    linkedScriptEmail: 'ceo@gmail.com',
  },
  {
    id: '2',
    email: 'lawrencedaniel2491@gmail.com',
    username: 'lawrence_daniel',
    password: 'E7yFe-cZfDi-oZbFa-xL947-iiaeM',
    profilePic: '',
    whatsapp: '+2348116699059',
    role: 'member',
    joinedAt: Date.now() - 86400000 * 5,
    participationPct: 85,
    activityCount: 45,
    lastActiveAt: Date.now() - 3600000,
    isActive: true,
    isVerified: false,
  },
  {
    id: '3',
    email: 'jenkinsarthur742@gmail.com',
    username: 'jenkins_arthur',
    password: 'mPC35-Q8qLP-ecAqS-K7jqX-9zSif',
    profilePic: '',
    whatsapp: '',
    role: 'member',
    joinedAt: Date.now() - 86400000 * 10,
    participationPct: 72,
    activityCount: 32,
    lastActiveAt: Date.now() - 86400000,
    isActive: true,
    isVerified: false,
  },
  {
    id: '4',
    email: 'perebosigha@gmail.com',
    username: 'perebo_sigha',
    password: '8fAjM-5PrLc-D3FfQ-8ABeX-MGQXe',
    profilePic: '',
    whatsapp: '',
    role: 'member',
    joinedAt: Date.now() - 86400000 * 15,
    participationPct: 60,
    activityCount: 28,
    lastActiveAt: Date.now() - 86400000 * 2,
    isActive: false,
    isVerified: false,
  },
  {
    id: '5',
    email: 'obiebifabyoung@gmail.com',
    username: 'obiebi_fab',
    password: 'R5Jx5-XEtLs-EERsJ-AXkGi-wp3g9',
    profilePic: '',
    whatsapp: '',
    role: 'member',
    joinedAt: Date.now() - 86400000 * 8,
    participationPct: 90,
    activityCount: 67,
    lastActiveAt: Date.now() - 1800000,
    isActive: true,
    isVerified: false,
  },
  {
    id: '6',
    email: 'brownrogers416@gmail.com',
    username: 'brown_rogers',
    password: '7bdFC-MfzbQ-jWJ9P-6idX8-kcGfx',
    profilePic: '',
    whatsapp: '',
    role: 'member',
    joinedAt: Date.now() - 86400000 * 12,
    participationPct: 55,
    activityCount: 22,
    lastActiveAt: Date.now() - 86400000 * 3,
    isActive: false,
    isVerified: false,
  },
  {
    id: '7',
    email: 'amakayoyo26@gmail.com',
    username: 'amaka_yoyo',
    password: '3LtqM-4cALi-ZngtX-Xjaxs-46LmY',
    profilePic: '',
    whatsapp: '',
    role: 'member',
    joinedAt: Date.now() - 86400000 * 20,
    participationPct: 78,
    activityCount: 41,
    lastActiveAt: Date.now() - 43200000,
    isActive: true,
    isVerified: false,
  },
  {
    id: '8',
    email: 'c2081689@gmail.com',
    username: 'c208_user',
    password: 'gyxDC-R9r3b-7wtRr-jRr8m-jkQky',
    profilePic: '',
    whatsapp: '',
    role: 'member',
    joinedAt: Date.now() - 86400000 * 3,
    participationPct: 45,
    activityCount: 15,
    lastActiveAt: Date.now() - 86400000 * 1,
    isActive: false,
    isVerified: false,
  },
  {
    id: '9',
    email: 'pepelipepeli8@gmail.com',
    username: 'pepeli_admin',
    password: '6wK3o-yKwcj-7SaKi-X87E3-mR9Sd',
    profilePic: '',
    whatsapp: '',
    role: 'Sub_Admin',
    joinedAt: Date.now() - 86400000 * 25,
    participationPct: 95,
    activityCount: 89,
    lastActiveAt: Date.now() - 600000,
    isActive: true,
    isVerified: true,
    linkedScriptEmail: 'pepelipepeli8@gmail.com',
  },
  {
    id: '10',
    email: 'godstimeisthebest199651@gmail.com',
    username: 'godstime_best',
    password: 'F4HaE-XFg7y-m4acX-SydgN-5FjyQ',
    profilePic: '',
    whatsapp: '',
    role: 'member',
    joinedAt: Date.now() - 86400000 * 7,
    participationPct: 68,
    activityCount: 34,
    lastActiveAt: Date.now() - 7200000,
    isActive: true,
    isVerified: false,
  },
];

const seedAnnouncements: Announcement[] = [
  { id: '1', text: 'Welcome to Progression! New script updates available.', order: 1, active: true, createdAt: Date.now() },
  { id: '2', text: 'Join our WhatsApp groups for daily signals and updates.', order: 2, active: true, createdAt: Date.now() - 86400000 },
];

const seedGroups: Group[] = [
  {
    id: '1',
    name: 'Progress Bar',
    image: '/group1.jpg',
    link: 'https://chat.whatsapp.com/IO3N6g3bhktIntuifZBHvs?mode=gi_t',
    membersCount: 1250,
    owner: 'BON',
    subAdmins: ['pepeli_admin'],
  },
  {
    id: '2',
    name: 'Cyber Wealth',
    image: '/group2.jpg',
    link: 'https://chat.whatsapp.com/Iv2QVHVHZem3ufKbDX03cq?mode=gi_t',
    membersCount: 890,
    owner: 'BON',
    subAdmins: ['lawrence_daniel'],
  },
  {
    id: '3',
    name: 'Private Group Chat',
    image: '/group3.jpg',
    link: 'https://chat.whatsapp.com/DSwRRGxZvEELj3jyYMLbPW?mode=hq1tcla',
    membersCount: 450,
    owner: 'BON',
    subAdmins: ['jenkins_arthur'],
  },
];

const seedProjects: ProjectRecord[] = [
  {
    id: '1',
    title: 'MOD Script v2.0',
    month: 'November',
    successCount: 47,
    topAchievement: '98% accuracy on EUR/USD pairs',
    assurancePct: 92,
    notes: 'Major update with AI integration',
  },
  {
    id: '2',
    title: 'Forex Automation Bot',
    month: 'October',
    successCount: 38,
    topAchievement: 'Automated 24/7 trading',
    assurancePct: 88,
    notes: 'Beta testing phase completed',
  },
  {
    id: '3',
    title: 'Crypto Signal Pro',
    month: 'September',
    successCount: 52,
    topAchievement: 'BTC prediction accuracy 94%',
    assurancePct: 95,
    notes: 'New features added',
  },
];

const seedScriptUpdates: ScriptUpdate[] = [
  {
    id: '1',
    title: 'MOD Script v2.5 Release',
    description: 'New features including multi-timeframe analysis and improved signal accuracy. Download now!',
    fileLink: '/scripts/mod-script-v2.5.zip',
    active: true,
    createdAt: Date.now(),
  },
  {
    id: '2',
    title: 'Security Patch Update',
    description: 'Critical security update for all linked accounts. Please update immediately.',
    active: true,
    createdAt: Date.now() - 86400000 * 2,
  },
];

const seedScriptAccounts: ScriptAccount[] = [
  { id: '1', title: 'Premium MOD Access', email: 'premium@mod.com', password: 'mod2024!', fileLink: '/scripts/premium-mod.zip' },
  { id: '2', title: 'Basic Signal Access', email: 'basic@signals.com', password: 'basic2024!', fileLink: '/scripts/basic-signals.zip' },
];

const seedMembershipRecords: MembershipRecord[] = [
  { id: '1', category: 'most_active', userId: '1', percentage: 100, createdAt: Date.now(), updatedAt: Date.now() },
  { id: '2', category: 'most_funny', userId: '5', rank: 1, remark: 'Always makes us laugh during trades', createdAt: Date.now(), updatedAt: Date.now() },
  { id: '3', category: 'most_humble', userId: '7', remark: 'Helpful to all new members', createdAt: Date.now(), updatedAt: Date.now() },
  { id: '4', category: 'special', userId: '9', rank: 1, createdAt: Date.now(), updatedAt: Date.now() },
];

class Store {
  private getItem<T>(key: string, defaultValue: T): T {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  }

  private setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Initialize store with seed data
  initialize(): void {
    if (!localStorage.getItem(STORAGE_KEYS.users)) {
      this.setItem(STORAGE_KEYS.users, seedUsers);
    }
    if (!localStorage.getItem(STORAGE_KEYS.announcements)) {
      this.setItem(STORAGE_KEYS.announcements, seedAnnouncements);
    }
    if (!localStorage.getItem(STORAGE_KEYS.groups)) {
      this.setItem(STORAGE_KEYS.groups, seedGroups);
    }
    if (!localStorage.getItem(STORAGE_KEYS.projects)) {
      this.setItem(STORAGE_KEYS.projects, seedProjects);
    }
    if (!localStorage.getItem(STORAGE_KEYS.scriptUpdates)) {
      this.setItem(STORAGE_KEYS.scriptUpdates, seedScriptUpdates);
    }
    if (!localStorage.getItem(STORAGE_KEYS.scriptAccounts)) {
      this.setItem(STORAGE_KEYS.scriptAccounts, seedScriptAccounts);
    }
    if (!localStorage.getItem(STORAGE_KEYS.scriptAccess)) {
      this.setItem(STORAGE_KEYS.scriptAccess, []);
    }
    if (!localStorage.getItem(STORAGE_KEYS.membershipRecords)) {
      this.setItem(STORAGE_KEYS.membershipRecords, seedMembershipRecords);
    }
    if (!localStorage.getItem(STORAGE_KEYS.notifications)) {
      this.setItem(STORAGE_KEYS.notifications, []);
    }
    if (!localStorage.getItem(STORAGE_KEYS.groupMembers)) {
      this.setItem(STORAGE_KEYS.groupMembers, []);
    }
    if (!localStorage.getItem(STORAGE_KEYS.aiChat)) {
      this.setItem(STORAGE_KEYS.aiChat, []);
    }
  }

  // Splash screen
  hasSeenSplash(): boolean {
    return this.getItem(STORAGE_KEYS.hasSeenSplash, false);
  }

  setSplashSeen(seen: boolean): void {
    this.setItem(STORAGE_KEYS.hasSeenSplash, seen);
  }

  // Users
  getUsers(): User[] {
    return this.getItem<User[]>(STORAGE_KEYS.users, []);
  }

  getUserByEmail(email: string): User | undefined {
    return this.getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserById(id: string): User | undefined {
    return this.getUsers().find(u => u.id === id);
  }

  createUser(user: Omit<User, 'id' | 'joinedAt' | 'participationPct' | 'activityCount' | 'lastActiveAt' | 'isActive' | 'isVerified'>): User {
    const users = this.getUsers();
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      joinedAt: Date.now(),
      participationPct: 0,
      activityCount: 0,
      lastActiveAt: Date.now(),
      isActive: false,
      isVerified: false,
    };
    this.setItem(STORAGE_KEYS.users, [...users, newUser]);
    return newUser;
  }

  updateUser(id: string, updates: Partial<User>): User | null {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;
    users[index] = { ...users[index], ...updates };
    this.setItem(STORAGE_KEYS.users, users);
    return users[index];
  }

  // Link script to user
  linkScriptToUser(userId: string, scriptEmail: string, scriptPassword: string): { success: boolean; error?: string } {
    const user = this.getUserById(userId);
    if (!user) return { success: false, error: 'User not found' };

    // Check if script credentials match any in the seed data
    const scriptUser = seedUsers.find(u => u.email.toLowerCase() === scriptEmail.toLowerCase() && u.password === scriptPassword);
    if (!scriptUser) return { success: false, error: 'Invalid script credentials' };

    this.updateUser(userId, { 
      linkedScriptEmail: scriptEmail, 
      isVerified: true,
      isActive: true 
    });

    // Create notification
    this.createNotification({
      userId,
      type: 'script_linked',
      title: 'Script Account Linked!',
      message: 'Your script account has been successfully linked. You now have verified access.',
      read: false,
      icon: 'verified',
    });

    return { success: true };
  }

  // Current User Session
  getCurrentUser(): User | null {
    return this.getItem<User | null>(STORAGE_KEYS.currentUser, null);
  }

  setCurrentUser(user: User | null): void {
    this.setItem(STORAGE_KEYS.currentUser, user);
  }

  // Announcements
  getAnnouncements(): Announcement[] {
    return this.getItem<Announcement[]>(STORAGE_KEYS.announcements, []);
  }

  createAnnouncement(announcement: Omit<Announcement, 'id' | 'createdAt'>): Announcement {
    const announcements = this.getAnnouncements();
    const newAnnouncement: Announcement = {
      ...announcement,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    this.setItem(STORAGE_KEYS.announcements, [...announcements, newAnnouncement]);
    return newAnnouncement;
  }

  updateAnnouncement(id: string, updates: Partial<Announcement>): void {
    const announcements = this.getAnnouncements();
    const index = announcements.findIndex(a => a.id === id);
    if (index !== -1) {
      announcements[index] = { ...announcements[index], ...updates };
      this.setItem(STORAGE_KEYS.announcements, announcements);
    }
  }

  deleteAnnouncement(id: string): void {
    const announcements = this.getAnnouncements().filter(a => a.id !== id);
    this.setItem(STORAGE_KEYS.announcements, announcements);
  }

  // Groups
  getGroups(): Group[] {
    return this.getItem<Group[]>(STORAGE_KEYS.groups, []);
  }

  createGroup(group: Omit<Group, 'id'>): Group {
    const groups = this.getGroups();
    const newGroup: Group = { ...group, id: Date.now().toString() };
    this.setItem(STORAGE_KEYS.groups, [...groups, newGroup]);
    return newGroup;
  }

  updateGroup(id: string, updates: Partial<Group>): void {
    const groups = this.getGroups();
    const index = groups.findIndex(g => g.id === id);
    if (index !== -1) {
      groups[index] = { ...groups[index], ...updates };
      this.setItem(STORAGE_KEYS.groups, groups);
    }
  }

  deleteGroup(id: string): void {
    const groups = this.getGroups().filter(g => g.id !== id);
    this.setItem(STORAGE_KEYS.groups, groups);
  }

  // Group Members
  getGroupMembers(groupId?: string): GroupMember[] {
    const members = this.getItem<GroupMember[]>(STORAGE_KEYS.groupMembers, []);
    return groupId ? members.filter(m => m.groupId === groupId) : members;
  }

  addGroupMember(member: Omit<GroupMember, 'id' | 'joinedAt'>): GroupMember {
    const members = this.getGroupMembers();
    const newMember: GroupMember = {
      ...member,
      id: Date.now().toString(),
      joinedAt: Date.now(),
    };
    this.setItem(STORAGE_KEYS.groupMembers, [...members, newMember]);
    return newMember;
  }

  updateGroupMember(id: string, updates: Partial<GroupMember>): void {
    const members = this.getGroupMembers();
    const index = members.findIndex(m => m.id === id);
    if (index !== -1) {
      members[index] = { ...members[index], ...updates };
      this.setItem(STORAGE_KEYS.groupMembers, members);
    }
  }

  deleteGroupMember(id: string): void {
    const members = this.getGroupMembers().filter(m => m.id !== id);
    this.setItem(STORAGE_KEYS.groupMembers, members);
  }

  // Projects
  getProjects(): ProjectRecord[] {
    return this.getItem<ProjectRecord[]>(STORAGE_KEYS.projects, []);
  }

  createProject(project: Omit<ProjectRecord, 'id'>): ProjectRecord {
    const projects = this.getProjects();
    const newProject: ProjectRecord = { ...project, id: Date.now().toString() };
    this.setItem(STORAGE_KEYS.projects, [...projects, newProject]);
    return newProject;
  }

  updateProject(id: string, updates: Partial<ProjectRecord>): void {
    const projects = this.getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...updates };
      this.setItem(STORAGE_KEYS.projects, projects);
    }
  }

  deleteProject(id: string): void {
    const projects = this.getProjects().filter(p => p.id !== id);
    this.setItem(STORAGE_KEYS.projects, projects);
  }

  // Script Updates
  getScriptUpdates(): ScriptUpdate[] {
    return this.getItem<ScriptUpdate[]>(STORAGE_KEYS.scriptUpdates, []);
  }

  createScriptUpdate(update: Omit<ScriptUpdate, 'id' | 'createdAt'>): ScriptUpdate {
    const updates = this.getScriptUpdates();
    const newUpdate: ScriptUpdate = {
      ...update,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    this.setItem(STORAGE_KEYS.scriptUpdates, [...updates, newUpdate]);
    return newUpdate;
  }

  updateScriptUpdate(id: string, updates: Partial<ScriptUpdate>): void {
    const scriptUpdates = this.getScriptUpdates();
    const index = scriptUpdates.findIndex(s => s.id === id);
    if (index !== -1) {
      scriptUpdates[index] = { ...scriptUpdates[index], ...updates };
      this.setItem(STORAGE_KEYS.scriptUpdates, scriptUpdates);
    }
  }

  deleteScriptUpdate(id: string): void {
    const updates = this.getScriptUpdates().filter(s => s.id !== id);
    this.setItem(STORAGE_KEYS.scriptUpdates, updates);
  }

  // Script Accounts
  getScriptAccounts(): ScriptAccount[] {
    return this.getItem<ScriptAccount[]>(STORAGE_KEYS.scriptAccounts, []);
  }

  createScriptAccount(account: Omit<ScriptAccount, 'id'>): ScriptAccount {
    const accounts = this.getScriptAccounts();
    const newAccount: ScriptAccount = { ...account, id: Date.now().toString() };
    this.setItem(STORAGE_KEYS.scriptAccounts, [...accounts, newAccount]);
    return newAccount;
  }

  updateScriptAccount(id: string, updates: Partial<ScriptAccount>): void {
    const accounts = this.getScriptAccounts();
    const index = accounts.findIndex(a => a.id === id);
    if (index !== -1) {
      accounts[index] = { ...accounts[index], ...updates };
      this.setItem(STORAGE_KEYS.scriptAccounts, accounts);
    }
  }

  deleteScriptAccount(id: string): void {
    const accounts = this.getScriptAccounts().filter(a => a.id !== id);
    this.setItem(STORAGE_KEYS.scriptAccounts, accounts);
  }

  // Script Access
  getScriptAccess(): ScriptAccess[] {
    return this.getItem<ScriptAccess[]>(STORAGE_KEYS.scriptAccess, []);
  }

  claimScript(userId: string, scriptId: string): ScriptAccess {
    const accesses = this.getScriptAccess();
    const apiKey = `prog_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newAccess: ScriptAccess = {
      id: Date.now().toString(),
      userId,
      scriptId,
      apiKey,
      createdAt: Date.now(),
    };
    this.setItem(STORAGE_KEYS.scriptAccess, [...accesses, newAccess]);
    return newAccess;
  }

  getUserScriptAccess(userId: string): ScriptAccess | undefined {
    return this.getScriptAccess().find(a => a.userId === userId);
  }

  revokeScriptAccess(id: string): void {
    const accesses = this.getScriptAccess().filter(a => a.id !== id);
    this.setItem(STORAGE_KEYS.scriptAccess, accesses);
  }

  // Membership Records
  getMembershipRecords(category?: string): MembershipRecord[] {
    const records = this.getItem<MembershipRecord[]>(STORAGE_KEYS.membershipRecords, []);
    return category ? records.filter(r => r.category === category) : records;
  }

  createMembershipRecord(record: Omit<MembershipRecord, 'id' | 'createdAt' | 'updatedAt'>): MembershipRecord {
    const records = this.getMembershipRecords();
    const newRecord: MembershipRecord = {
      ...record,
      id: Date.now().toString(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.setItem(STORAGE_KEYS.membershipRecords, [...records, newRecord]);
    return newRecord;
  }

  updateMembershipRecord(id: string, updates: Partial<MembershipRecord>): void {
    const records = this.getMembershipRecords();
    const index = records.findIndex(r => r.id === id);
    if (index !== -1) {
      records[index] = { ...records[index], ...updates, updatedAt: Date.now() };
      this.setItem(STORAGE_KEYS.membershipRecords, records);
    }
  }

  deleteMembershipRecord(id: string): void {
    const records = this.getMembershipRecords().filter(r => r.id !== id);
    this.setItem(STORAGE_KEYS.membershipRecords, records);
  }

  // Notifications
  getNotifications(userId: string): Notification[] {
    return this.getItem<Notification[]>(STORAGE_KEYS.notifications, [])
      .filter(n => n.userId === userId)
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  getUnreadCount(userId: string): number {
    return this.getNotifications(userId).filter(n => !n.read).length;
  }

  createNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Notification {
    const notifications = this.getItem<Notification[]>(STORAGE_KEYS.notifications, []);
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    this.setItem(STORAGE_KEYS.notifications, [...notifications, newNotification]);
    return newNotification;
  }

  markNotificationRead(id: string): void {
    const notifications = this.getItem<Notification[]>(STORAGE_KEYS.notifications, []);
    const index = notifications.findIndex(n => n.id === id);
    if (index !== -1) {
      notifications[index].read = true;
      this.setItem(STORAGE_KEYS.notifications, notifications);
    }
  }

  markAllNotificationsRead(userId: string): void {
    const notifications = this.getItem<Notification[]>(STORAGE_KEYS.notifications, []);
    notifications.forEach(n => {
      if (n.userId === userId) n.read = true;
    });
    this.setItem(STORAGE_KEYS.notifications, notifications);
  }

  // AI Chat
  getAIChatMessages(userId: string): AIChatMessage[] {
    return this.getItem<AIChatMessage[]>(STORAGE_KEYS.aiChat, [])
      .filter(m => m.userId === userId)
      .sort((a, b) => a.timestamp - b.timestamp);
  }

  addAIChatMessage(message: Omit<AIChatMessage, 'id' | 'timestamp'>): AIChatMessage {
    const messages = this.getItem<AIChatMessage[]>(STORAGE_KEYS.aiChat, []);
    const newMessage: AIChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    this.setItem(STORAGE_KEYS.aiChat, [...messages, newMessage]);
    return newMessage;
  }

  clearAIChat(userId: string): void {
    const messages = this.getItem<AIChatMessage[]>(STORAGE_KEYS.aiChat, []);
    const filtered = messages.filter(m => m.userId !== userId);
    this.setItem(STORAGE_KEYS.aiChat, filtered);
  }

  // Stats
  getStats(): StatsSummary {
    const users = this.getUsers();
    const activeUsers = users.filter(u => u.isActive);
    const verifiedUsers = users.filter(u => u.isVerified);
    const projects = this.getProjects();
    
    const totalParticipation = users.reduce((sum, u) => sum + u.participationPct, 0);
    const averageParticipation = users.length > 0 ? Math.round(totalParticipation / users.length) : 0;
    
    return {
      totalMembers: users.length,
      activeMembers: activeUsers.length,
      inactiveMembers: users.length - activeUsers.length,
      totalProjects: projects.length,
      averageParticipation,
      verifiedMembers: verifiedUsers.length,
    };
  }

  // Clear all data (for testing)
  clear(): void {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  }
}

export const store = new Store();
