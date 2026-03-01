import { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, Save, X, Bell, Code, Users, 
  Folder, TrendingUp, Shield, Send
} from 'lucide-react';
import { CircularProgress } from '@/components/CircularProgress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { store } from '@/lib/store';
import type { 
  User, Announcement, Group, ProjectRecord, 
  ScriptUpdate, ScriptAccount, ScriptAccess 
} from '@/types';

interface AdminDashboardProps {
  onNotification: () => void;
}

export function AdminDashboard({ onNotification }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('announcements');
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [scriptUpdates, setScriptUpdates] = useState<ScriptUpdate[]>([]);
  const [scriptAccounts, setScriptAccounts] = useState<ScriptAccount[]>([]);
  const [members, setMembers] = useState<User[]>([]);
  const [scriptAccesses, setScriptAccesses] = useState<ScriptAccess[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setAnnouncements(store.getAnnouncements());
    setGroups(store.getGroups());
    setProjects(store.getProjects());
    setScriptUpdates(store.getScriptUpdates());
    setScriptAccounts(store.getScriptAccounts());
    setMembers(store.getUsers());
    setScriptAccesses(store.getScriptAccess());
  };

  // Generic handlers
  const handleCreate = (type: string, data: any) => {
    switch (type) {
      case 'announcement':
        store.createAnnouncement(data);
        break;
      case 'group':
        store.createGroup(data);
        break;
      case 'project':
        store.createProject(data);
        break;
      case 'script':
        store.createScriptUpdate(data);
        break;
      case 'scriptAccount':
        store.createScriptAccount(data);
        break;
    }
    loadData();
    setIsCreating(false);
    onNotification();
  };

  const handleUpdate = (type: string, id: string, data: any) => {
    switch (type) {
      case 'announcement':
        store.updateAnnouncement(id, data);
        break;
      case 'group':
        store.updateGroup(id, data);
        break;
      case 'project':
        store.updateProject(id, data);
        break;
      case 'script':
        store.updateScriptUpdate(id, data);
        break;
      case 'scriptAccount':
        store.updateScriptAccount(id, data);
        break;
      case 'member':
        store.updateUser(id, data);
        break;
    }
    loadData();
    setEditingItem(null);
    onNotification();
  };

  const handleDelete = (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    switch (type) {
      case 'announcement':
        store.deleteAnnouncement(id);
        break;
      case 'group':
        store.deleteGroup(id);
        break;
      case 'project':
        store.deleteProject(id);
        break;
      case 'script':
        store.deleteScriptUpdate(id);
        break;
      case 'scriptAccount':
        store.deleteScriptAccount(id);
        break;
      case 'scriptAccess':
        store.revokeScriptAccess(id);
        break;
    }
    loadData();
    onNotification();
  };

  const sendNotificationToUser = (userId: string, title: string, message: string) => {
    store.createNotification({
      userId,
      type: 'announcement',
      title,
      message,
      read: false,
    });
    onNotification();
    alert('Notification sent!');
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 noise-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="glass-panel p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Shield className="w-6 h-6 text-neon-pink" />
                Admin Dashboard
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage announcements, scripts, groups, and members
              </p>
            </div>
            <Badge className="bg-neon-pink/20 text-neon-pink border-neon-pink/30">
              Admin Access
            </Badge>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-7 bg-white/5 mb-6 overflow-x-auto">
            <TabsTrigger value="announcements" className="text-xs data-[state=active]:bg-neon-pink/20">
              <Bell className="w-4 h-4 mr-1" />
              Announcements
            </TabsTrigger>
            <TabsTrigger value="scripts" className="text-xs data-[state=active]:bg-neon-pink/20">
              <Code className="w-4 h-4 mr-1" />
              Scripts
            </TabsTrigger>
            <TabsTrigger value="scriptAccounts" className="text-xs data-[state=active]:bg-neon-pink/20">
              <Shield className="w-4 h-4 mr-1" />
              Accounts
            </TabsTrigger>
            <TabsTrigger value="groups" className="text-xs data-[state=active]:bg-neon-pink/20">
              <Users className="w-4 h-4 mr-1" />
              Groups
            </TabsTrigger>
            <TabsTrigger value="projects" className="text-xs data-[state=active]:bg-neon-pink/20">
              <Folder className="w-4 h-4 mr-1" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="members" className="text-xs data-[state=active]:bg-neon-pink/20">
              <TrendingUp className="w-4 h-4 mr-1" />
              Members
            </TabsTrigger>
            <TabsTrigger value="scriptAccess" className="text-xs data-[state=active]:bg-neon-pink/20">
              <Shield className="w-4 h-4 mr-1" />
              Access
            </TabsTrigger>
          </TabsList>

          {/* Announcements Tab */}
          <TabsContent value="announcements" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Announcements</h2>
              <button 
                onClick={() => setIsCreating(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add New
              </button>
            </div>

            {isCreating && (
              <CreateAnnouncementForm 
                onSubmit={(data) => handleCreate('announcement', data)}
                onCancel={() => setIsCreating(false)}
              />
            )}

            <div className="space-y-3">
              {announcements.map((item) => (
                <div key={item.id} className="glass-panel p-4">
                  {editingItem?.id === item.id ? (
                    <EditAnnouncementForm 
                      item={item}
                      onSubmit={(data) => handleUpdate('announcement', item.id, data)}
                      onCancel={() => setEditingItem(null)}
                    />
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-white">{item.text}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge variant={item.active ? 'default' : 'secondary'}>
                            {item.active ? 'Active' : 'Inactive'}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Order: {item.order}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setEditingItem(item)}
                          className="p-2 rounded-lg hover:bg-white/5"
                        >
                          <Edit2 className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button 
                          onClick={() => handleDelete('announcement', item.id)}
                          className="p-2 rounded-lg hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Scripts Tab */}
          <TabsContent value="scripts" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Script Updates</h2>
              <button 
                onClick={() => setIsCreating(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Update
              </button>
            </div>

            {isCreating && (
              <CreateScriptForm 
                onSubmit={(data) => handleCreate('script', data)}
                onCancel={() => setIsCreating(false)}
              />
            )}

            <div className="space-y-3">
              {scriptUpdates.map((item) => (
                <div key={item.id} className="glass-panel p-4">
                  {editingItem?.id === item.id ? (
                    <EditScriptForm 
                      item={item}
                      onSubmit={(data) => handleUpdate('script', item.id, data)}
                      onCancel={() => setEditingItem(null)}
                    />
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-white">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        {item.fileLink && (
                          <p className="text-xs text-neon-pink mt-2">File: {item.fileLink}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setEditingItem(item)}
                          className="p-2 rounded-lg hover:bg-white/5"
                        >
                          <Edit2 className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button 
                          onClick={() => handleDelete('script', item.id)}
                          className="p-2 rounded-lg hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Script Accounts Tab */}
          <TabsContent value="scriptAccounts" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Script Accounts</h2>
              <button 
                onClick={() => setIsCreating(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Account
              </button>
            </div>

            {isCreating && (
              <CreateScriptAccountForm 
                onSubmit={(data) => handleCreate('scriptAccount', data)}
                onCancel={() => setIsCreating(false)}
              />
            )}

            <div className="space-y-3">
              {scriptAccounts.map((item) => (
                <div key={item.id} className="glass-panel p-4">
                  {editingItem?.id === item.id ? (
                    <EditScriptAccountForm 
                      item={item}
                      onSubmit={(data) => handleUpdate('scriptAccount', item.id, data)}
                      onCancel={() => setEditingItem(null)}
                    />
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-white">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.email}</p>
                        {item.fileLink && (
                          <p className="text-xs text-neon-pink">{item.fileLink}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setEditingItem(item)}
                          className="p-2 rounded-lg hover:bg-white/5"
                        >
                          <Edit2 className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button 
                          onClick={() => handleDelete('scriptAccount', item.id)}
                          className="p-2 rounded-lg hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Groups Tab */}
          <TabsContent value="groups" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Groups</h2>
              <button 
                onClick={() => setIsCreating(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Group
              </button>
            </div>

            {isCreating && (
              <CreateGroupForm 
                onSubmit={(data) => handleCreate('group', data)}
                onCancel={() => setIsCreating(false)}
              />
            )}

            <div className="space-y-3">
              {groups.map((item) => (
                <div key={item.id} className="glass-panel p-4">
                  {editingItem?.id === item.id ? (
                    <EditGroupForm 
                      item={item}
                      onSubmit={(data) => handleUpdate('group', item.id, data)}
                      onCancel={() => setEditingItem(null)}
                    />
                  ) : (
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <h3 className="font-medium text-white">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.membersCount} members</p>
                        <p className="text-xs text-neon-pink truncate">{item.link}</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setEditingItem(item)}
                          className="p-2 rounded-lg hover:bg-white/5"
                        >
                          <Edit2 className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button 
                          onClick={() => handleDelete('group', item.id)}
                          className="p-2 rounded-lg hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Projects</h2>
              <button 
                onClick={() => setIsCreating(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Project
              </button>
            </div>

            {isCreating && (
              <CreateProjectForm 
                onSubmit={(data) => handleCreate('project', data)}
                onCancel={() => setIsCreating(false)}
              />
            )}

            <div className="space-y-3">
              {projects.map((item) => (
                <div key={item.id} className="glass-panel p-4">
                  {editingItem?.id === item.id ? (
                    <EditProjectForm 
                      item={item}
                      onSubmit={(data) => handleUpdate('project', item.id, data)}
                      onCancel={() => setEditingItem(null)}
                    />
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-medium text-white">{item.title}</h3>
                          <CircularProgress value={item.assurancePct} size={28} strokeWidth={3} />
                        </div>
                        <p className="text-sm text-muted-foreground">{item.month} • {item.successCount} successes</p>
                        <p className="text-xs text-green-400">{item.topAchievement}</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setEditingItem(item)}
                          className="p-2 rounded-lg hover:bg-white/5"
                        >
                          <Edit2 className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button 
                          onClick={() => handleDelete('project', item.id)}
                          className="p-2 rounded-lg hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Member Management</h2>
            <div className="space-y-3">
              {members.map((item) => (
                <div key={item.id} className="glass-panel p-4">
                  {editingItem?.id === item.id ? (
                    <EditMemberForm 
                      item={item}
                      onSubmit={(data) => handleUpdate('member', item.id, data)}
                      onCancel={() => setEditingItem(null)}
                    />
                  ) : (
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12 rounded-lg">
                        <AvatarImage src={item.profilePic} className="rounded-lg" />
                        <AvatarFallback className="rounded-lg bg-gradient-to-br from-neon-pink to-neon-purple">
                          {item.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-white">{item.username}</h3>
                          <Badge className={`text-xs ${item.role === 'Admin' ? 'bg-neon-pink/20 text-neon-pink' : item.role === 'Sub_Admin' ? 'bg-neon-purple/20 text-neon-purple' : ''}`}>
                            {item.role}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.email}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <CircularProgress value={item.participationPct} size={36} strokeWidth={3} />
                          <p className="text-xs text-muted-foreground">Participation</p>
                        </div>
                        <button 
                          onClick={() => sendNotificationToUser(item.id, 'Message from Admin', 'You have a new update from the admin team.')}
                          className="p-2 rounded-lg hover:bg-white/5"
                          title="Send Notification"
                        >
                          <Send className="w-4 h-4 text-neon-pink" />
                        </button>
                        <button 
                          onClick={() => setEditingItem(item)}
                          className="p-2 rounded-lg hover:bg-white/5"
                        >
                          <Edit2 className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Script Access Tab */}
          <TabsContent value="scriptAccess" className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Script Access Tokens</h2>
            <div className="space-y-3">
              {scriptAccesses.map((item) => {
                const user = members.find(m => m.id === item.userId);
                const script = scriptUpdates.find(s => s.id === item.scriptId);
                return (
                  <div key={item.id} className="glass-panel p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">{user?.username || 'Unknown'}</p>
                        <p className="text-sm text-muted-foreground">Script: {script?.title || 'Unknown'}</p>
                        <p className="text-xs text-neon-pink font-mono mt-1">
                          {item.apiKey.slice(0, 40)}...
                        </p>
                      </div>
                      <button 
                        onClick={() => handleDelete('scriptAccess', item.id)}
                        className="p-2 rounded-lg hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                );
              })}
              {scriptAccesses.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No active script access tokens</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Form Components
function CreateAnnouncementForm({ onSubmit, onCancel }: { onSubmit: (data: any) => void; onCancel: () => void }) {
  const [text, setText] = useState('');
  const [order, setOrder] = useState(1);
  return (
    <div className="glass-panel p-4 space-y-3">
      <textarea
        placeholder="Announcement text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="input-glass w-full h-20 resize-none"
      />
      <input
        type="number"
        placeholder="Order"
        value={order}
        onChange={(e) => setOrder(Number(e.target.value))}
        className="input-glass w-full"
      />
      <div className="flex gap-2">
        <button onClick={() => onSubmit({ text, order, active: true })} className="btn-primary flex-1">
          <Save className="w-4 h-4 inline mr-1" /> Save
        </button>
        <button onClick={onCancel} className="btn-secondary">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function EditAnnouncementForm({ item, onSubmit, onCancel }: { item: Announcement; onSubmit: (data: any) => void; onCancel: () => void }) {
  const [text, setText] = useState(item.text);
  const [order, setOrder] = useState(item.order);
  const [active, setActive] = useState(item.active);
  return (
    <div className="space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="input-glass w-full h-20 resize-none"
      />
      <div className="flex gap-2">
        <input
          type="number"
          value={order}
          onChange={(e) => setOrder(Number(e.target.value))}
          className="input-glass flex-1"
        />
        <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 cursor-pointer">
          <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
          <span className="text-sm">Active</span>
        </label>
      </div>
      <div className="flex gap-2">
        <button onClick={() => onSubmit({ text, order, active })} className="btn-primary flex-1">
          <Save className="w-4 h-4 inline mr-1" /> Update
        </button>
        <button onClick={onCancel} className="btn-secondary">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function CreateScriptForm({ onSubmit, onCancel }: { onSubmit: (data: any) => void; onCancel: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileLink, setFileLink] = useState('');
  return (
    <div className="glass-panel p-4 space-y-3">
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="input-glass w-full" />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="input-glass w-full h-20 resize-none" />
      <input placeholder="File Link (optional)" value={fileLink} onChange={(e) => setFileLink(e.target.value)} className="input-glass w-full" />
      <div className="flex gap-2">
        <button onClick={() => onSubmit({ title, description, fileLink, active: true })} className="btn-primary flex-1">
          <Save className="w-4 h-4 inline mr-1" /> Save
        </button>
        <button onClick={onCancel} className="btn-secondary">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function EditScriptForm({ item, onSubmit, onCancel }: { item: ScriptUpdate; onSubmit: (data: any) => void; onCancel: () => void }) {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [fileLink, setFileLink] = useState(item.fileLink || '');
  const [active, setActive] = useState(item.active);
  return (
    <div className="space-y-3">
      <input value={title} onChange={(e) => setTitle(e.target.value)} className="input-glass w-full" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="input-glass w-full h-20 resize-none" />
      <input value={fileLink} onChange={(e) => setFileLink(e.target.value)} className="input-glass w-full" placeholder="File Link" />
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
        <span className="text-sm">Active</span>
      </label>
      <div className="flex gap-2">
        <button onClick={() => onSubmit({ title, description, fileLink, active })} className="btn-primary flex-1">
          <Save className="w-4 h-4 inline mr-1" /> Update
        </button>
        <button onClick={onCancel} className="btn-secondary">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function CreateScriptAccountForm({ onSubmit, onCancel }: { onSubmit: (data: any) => void; onCancel: () => void }) {
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fileLink, setFileLink] = useState('');
  return (
    <div className="glass-panel p-4 space-y-3">
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="input-glass w-full" />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-glass w-full" />
      <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-glass w-full" />
      <input placeholder="File Link" value={fileLink} onChange={(e) => setFileLink(e.target.value)} className="input-glass w-full" />
      <div className="flex gap-2">
        <button onClick={() => onSubmit({ title, email, password, fileLink })} className="btn-primary flex-1">
          <Save className="w-4 h-4 inline mr-1" /> Save
        </button>
        <button onClick={onCancel} className="btn-secondary">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function EditScriptAccountForm({ item, onSubmit, onCancel }: { item: ScriptAccount; onSubmit: (data: any) => void; onCancel: () => void }) {
  const [title, setTitle] = useState(item.title);
  const [email, setEmail] = useState(item.email || '');
  const [password, setPassword] = useState(item.password || '');
  const [fileLink, setFileLink] = useState(item.fileLink || '');
  return (
    <div className="space-y-3">
      <input value={title} onChange={(e) => setTitle(e.target.value)} className="input-glass w-full" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} className="input-glass w-full" placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} className="input-glass w-full" placeholder="Password" />
      <input value={fileLink} onChange={(e) => setFileLink(e.target.value)} className="input-glass w-full" placeholder="File Link" />
      <div className="flex gap-2">
        <button onClick={() => onSubmit({ title, email, password, fileLink })} className="btn-primary flex-1">
          <Save className="w-4 h-4 inline mr-1" /> Update
        </button>
        <button onClick={onCancel} className="btn-secondary">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function CreateGroupForm({ onSubmit, onCancel }: { onSubmit: (data: any) => void; onCancel: () => void }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [link, setLink] = useState('');
  const [membersCount, setMembersCount] = useState(0);
  return (
    <div className="glass-panel p-4 space-y-3">
      <input placeholder="Group Name" value={name} onChange={(e) => setName(e.target.value)} className="input-glass w-full" />
      <input placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} className="input-glass w-full" />
      <input placeholder="WhatsApp Link" value={link} onChange={(e) => setLink(e.target.value)} className="input-glass w-full" />
      <input type="number" placeholder="Members Count" value={membersCount} onChange={(e) => setMembersCount(Number(e.target.value))} className="input-glass w-full" />
      <div className="flex gap-2">
        <button onClick={() => onSubmit({ name, image, link, membersCount, owner: 'BON', subAdmins: [] })} className="btn-primary flex-1">
          <Save className="w-4 h-4 inline mr-1" /> Save
        </button>
        <button onClick={onCancel} className="btn-secondary">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function EditGroupForm({ item, onSubmit, onCancel }: { item: Group; onSubmit: (data: any) => void; onCancel: () => void }) {
  const [name, setName] = useState(item.name);
  const [image, setImage] = useState(item.image);
  const [link, setLink] = useState(item.link);
  const [membersCount, setMembersCount] = useState(item.membersCount);
  return (
    <div className="space-y-3">
      <input value={name} onChange={(e) => setName(e.target.value)} className="input-glass w-full" />
      <input value={image} onChange={(e) => setImage(e.target.value)} className="input-glass w-full" placeholder="Image URL" />
      <input value={link} onChange={(e) => setLink(e.target.value)} className="input-glass w-full" placeholder="Link" />
      <input type="number" value={membersCount} onChange={(e) => setMembersCount(Number(e.target.value))} className="input-glass w-full" />
      <div className="flex gap-2">
        <button onClick={() => onSubmit({ name, image, link, membersCount })} className="btn-primary flex-1">
          <Save className="w-4 h-4 inline mr-1" /> Update
        </button>
        <button onClick={onCancel} className="btn-secondary">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function CreateProjectForm({ onSubmit, onCancel }: { onSubmit: (data: any) => void; onCancel: () => void }) {
  const [title, setTitle] = useState('');
  const [month, setMonth] = useState('');
  const [successCount, setSuccessCount] = useState(0);
  const [topAchievement, setTopAchievement] = useState('');
  const [assurancePct, setAssurancePct] = useState(0);
  return (
    <div className="glass-panel p-4 space-y-3">
      <input placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} className="input-glass w-full" />
      <input placeholder="Month" value={month} onChange={(e) => setMonth(e.target.value)} className="input-glass w-full" />
      <input type="number" placeholder="Success Count" value={successCount} onChange={(e) => setSuccessCount(Number(e.target.value))} className="input-glass w-full" />
      <input placeholder="Top Achievement" value={topAchievement} onChange={(e) => setTopAchievement(e.target.value)} className="input-glass w-full" />
      <input type="number" placeholder="Assurance %" value={assurancePct} onChange={(e) => setAssurancePct(Number(e.target.value))} className="input-glass w-full" />
      <div className="flex gap-2">
        <button onClick={() => onSubmit({ title, month, successCount, topAchievement, assurancePct })} className="btn-primary flex-1">
          <Save className="w-4 h-4 inline mr-1" /> Save
        </button>
        <button onClick={onCancel} className="btn-secondary">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function EditProjectForm({ item, onSubmit, onCancel }: { item: ProjectRecord; onSubmit: (data: any) => void; onCancel: () => void }) {
  const [title, setTitle] = useState(item.title);
  const [month, setMonth] = useState(item.month);
  const [successCount, setSuccessCount] = useState(item.successCount);
  const [topAchievement, setTopAchievement] = useState(item.topAchievement);
  const [assurancePct, setAssurancePct] = useState(item.assurancePct);
  return (
    <div className="space-y-3">
      <input value={title} onChange={(e) => setTitle(e.target.value)} className="input-glass w-full" />
      <input value={month} onChange={(e) => setMonth(e.target.value)} className="input-glass w-full" />
      <input type="number" value={successCount} onChange={(e) => setSuccessCount(Number(e.target.value))} className="input-glass w-full" />
      <input value={topAchievement} onChange={(e) => setTopAchievement(e.target.value)} className="input-glass w-full" />
      <input type="number" value={assurancePct} onChange={(e) => setAssurancePct(Number(e.target.value))} className="input-glass w-full" />
      <div className="flex gap-2">
        <button onClick={() => onSubmit({ title, month, successCount, topAchievement, assurancePct })} className="btn-primary flex-1">
          <Save className="w-4 h-4 inline mr-1" /> Update
        </button>
        <button onClick={onCancel} className="btn-secondary">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function EditMemberForm({ item, onSubmit, onCancel }: { item: User; onSubmit: (data: any) => void; onCancel: () => void }) {
  const [username, setUsername] = useState(item.username);
  const [role, setRole] = useState(item.role);
  const [participationPct, setParticipationPct] = useState(item.participationPct);
  const [activityCount, setActivityCount] = useState(item.activityCount);
  const [isActive, setIsActive] = useState(item.isActive);
  return (
    <div className="space-y-3">
      <input value={username} onChange={(e) => setUsername(e.target.value)} className="input-glass w-full" />
      <select value={role} onChange={(e) => setRole(e.target.value as any)} className="input-glass w-full">
        <option value="member">Member</option>
        <option value="Sub_Admin">Sub-Admin</option>
        <option value="Admin">Admin</option>
      </select>
      <input type="number" value={participationPct} onChange={(e) => setParticipationPct(Number(e.target.value))} className="input-glass w-full" placeholder="Participation %" />
      <input type="number" value={activityCount} onChange={(e) => setActivityCount(Number(e.target.value))} className="input-glass w-full" placeholder="Activity Count" />
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
        <span className="text-sm">Active</span>
      </label>
      <div className="flex gap-2">
        <button onClick={() => onSubmit({ username, role, participationPct, activityCount, isActive })} className="btn-primary flex-1">
          <Save className="w-4 h-4 inline mr-1" /> Update
        </button>
        <button onClick={onCancel} className="btn-secondary">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
