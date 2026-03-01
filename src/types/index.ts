export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  profilePic?: string;
  whatsapp?: string;
  role: 'Admin' | 'Sub_Admin' | 'member';
  joinedAt: number;
  participationPct: number;
  activityCount: number;
  lastActiveAt: number;
  isActive: boolean;
  // New onboarding fields
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  country?: string;
  membershipDuration?: string;
  experienceLevel?: 'beginner' | 'expert';
  // Script linking
  linkedScriptEmail?: string;
  isVerified: boolean;
}

export interface Announcement {
  id: string;
  text: string;
  order: number;
  active: boolean;
  createdAt: number;
}

export interface Group {
  id: string;
  name: string;
  image: string;
  link: string;
  membersCount: number;
  owner?: string;
  subAdmins?: string[];
}

export interface GroupMember {
  id: string;
  userId: string;
  groupId: string;
  profilePic?: string;
  phoneNumber?: string;
  joinedAt: number;
}

export interface ProjectRecord {
  id: string;
  title: string;
  month: string;
  successCount: number;
  topAchievement: string;
  assurancePct: number;
  notes?: string;
  attachments?: string[];
}

export interface ScriptUpdate {
  id: string;
  title: string;
  description: string;
  fileLink?: string;
  active: boolean;
  createdAt: number;
}

export interface ScriptAccount {
  id: string;
  title: string;
  email?: string;
  password?: string;
  fileLink?: string;
}

export interface ScriptAccess {
  id: string;
  userId: string;
  scriptId: string;
  apiKey: string;
  createdAt: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'script_update' | 'announcement' | 'broadcast' | 'welcome' | 'script_linked';
  title: string;
  message: string;
  read: boolean;
  createdAt: number;
  icon?: string;
}

export interface MembershipRecord {
  id: string;
  category: 'most_active' | 'most_insultive' | 'most_funny' | 'most_humble' | 'special' | 'slow_worker';
  userId: string;
  value?: string;
  remark?: string;
  rank?: number;
  percentage?: number;
  createdAt: number;
  updatedAt: number;
}

export interface AIChatMessage {
  id: string;
  userId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface StatsSummary {
  totalMembers: number;
  activeMembers: number;
  inactiveMembers: number;
  totalProjects: number;
  averageParticipation: number;
  verifiedMembers: number;
}

export type View = 'home' | 'signup' | 'login' | 'dashboard' | 'script' | 'about' | 'admin' | 'membership' | 'onboarding' | 'settings';
export type DashboardTab = 'members' | 'records' | 'projects' | 'script';
export type AdminTab = 'announcements' | 'scripts' | 'scriptAccounts' | 'groups' | 'projects' | 'members' | 'scriptAccess' | 'membership';
export type OnboardingStep = 'splash' | 'personal' | 'video' | 'complete';
