import { useState, useEffect } from 'react';
import { 
  Trophy, Frown, Laugh, Heart, Star, Turtle, Plus, Edit2, Trash2, Save, X,
  TrendingUp, Medal, Search
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { store } from '@/lib/store';
import type { User, MembershipRecord } from '@/types';

interface MembershipRecordsProps {
  isAdmin?: boolean;
}

const categories = [
  { id: 'most_active', label: 'Most Active Members', icon: TrendingUp, color: 'text-green-400', bgColor: 'bg-green-500/10', desc: 'Highest participation rate' },
  { id: 'most_insultive', label: 'Most Insultive Members', icon: Frown, color: 'text-red-400', bgColor: 'bg-red-500/10', desc: 'Watch out for these ones!' },
  { id: 'most_funny', label: 'Most Funny Members', icon: Laugh, color: 'text-yellow-400', bgColor: 'bg-yellow-500/10', desc: 'Always making us laugh' },
  { id: 'most_humble', label: 'Most Humble Members', icon: Heart, color: 'text-pink-400', bgColor: 'bg-pink-500/10', desc: 'Kind and helpful to all' },
  { id: 'special', label: 'Special Members', icon: Star, color: 'text-purple-400', bgColor: 'bg-purple-500/10', desc: 'Distinguished contributors' },
  { id: 'slow_worker', label: 'Slow in Working', icon: Turtle, color: 'text-orange-400', bgColor: 'bg-orange-500/10', desc: 'Taking their time' },
] as const;

export function MembershipRecords({ isAdmin = false }: MembershipRecordsProps) {
  const [records, setRecords] = useState<MembershipRecord[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [editingRecord, setEditingRecord] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState<string | null>(null);
  const [newRecord, setNewRecord] = useState<Partial<MembershipRecord>>({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setRecords(store.getMembershipRecords());
    setUsers(store.getUsers());
  };

  const getUserById = (userId: string) => users.find(u => u.id === userId);

  const getRecordsByCategory = (category: string) => {
    return records.filter(r => r.category === category);
  };

  const handleCreate = (category: string) => {
    if (!newRecord.userId) return;
    
    store.createMembershipRecord({
      category: category as any,
      userId: newRecord.userId,
      value: newRecord.value,
      remark: newRecord.remark,
      rank: newRecord.rank ? Number(newRecord.rank) : undefined,
      percentage: newRecord.percentage ? Number(newRecord.percentage) : undefined,
    });
    
    setIsCreating(null);
    setNewRecord({});
    loadData();
  };

  const handleUpdate = (recordId: string) => {
    store.updateMembershipRecord(recordId, {
      value: newRecord.value,
      remark: newRecord.remark,
      rank: newRecord.rank ? Number(newRecord.rank) : undefined,
      percentage: newRecord.percentage ? Number(newRecord.percentage) : undefined,
    });
    
    setEditingRecord(null);
    setNewRecord({});
    loadData();
  };

  const handleDelete = (recordId: string) => {
    if (!confirm('Are you sure you want to remove this member from the list?')) return;
    store.deleteMembershipRecord(recordId);
    loadData();
  };

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 noise-bg">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="glass-panel p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 flex items-center justify-center">
                <Trophy className="w-6 h-6 md:w-7 md:h-7 text-neon-pink" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white">Membership Records</h1>
                <p className="text-xs md:text-sm text-muted-foreground">Recognizing our community members</p>
              </div>
            </div>
            
            {isAdmin && (
              <div className="md:ml-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-glass pl-9 text-sm w-full md:w-64"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => {
            const categoryRecords = getRecordsByCategory(category.id);
            const Icon = category.icon;
            
            return (
              <div key={category.id} className="glass-panel p-4 md:p-5">
                {/* Category Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 md:w-10 md:h-10 rounded-lg ${category.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 md:w-5 md:h-5 ${category.color}`} />
                    </div>
                    <div>
                      <h2 className="font-semibold text-white text-sm md:text-base">{category.label}</h2>
                      <p className="text-xs text-muted-foreground">{category.desc}</p>
                    </div>
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => {
                        setIsCreating(category.id);
                        setNewRecord({});
                      }}
                      className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-neon-pink" />
                    </button>
                  )}
                </div>

                {/* Add New Record Form */}
                {isCreating === category.id && isAdmin && (
                  <div className="mb-4 p-3 md:p-4 rounded-xl bg-white/5 space-y-3">
                    <select
                      value={newRecord.userId || ''}
                      onChange={(e) => setNewRecord({ ...newRecord, userId: e.target.value })}
                      className="input-glass w-full text-sm"
                    >
                      <option value="">Select member</option>
                      {filteredUsers.map(u => (
                        <option key={u.id} value={u.id}>{u.username}</option>
                      ))}
                    </select>
                    
                    {category.id === 'most_active' || category.id === 'slow_worker' ? (
                      <input
                        type="number"
                        placeholder="Percentage %"
                        value={newRecord.percentage || ''}
                        onChange={(e) => setNewRecord({ ...newRecord, percentage: Number(e.target.value) })}
                        className="input-glass w-full text-sm"
                      />
                    ) : category.id === 'most_funny' || category.id === 'special' ? (
                      <input
                        type="number"
                        placeholder="Rank #"
                        value={newRecord.rank || ''}
                        onChange={(e) => setNewRecord({ ...newRecord, rank: Number(e.target.value) })}
                        className="input-glass w-full text-sm"
                      />
                    ) : null}
                    
                    <input
                      type="text"
                      placeholder="Remark (optional)"
                      value={newRecord.remark || ''}
                      onChange={(e) => setNewRecord({ ...newRecord, remark: e.target.value })}
                      className="input-glass w-full text-sm"
                    />
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCreate(category.id)}
                        className="flex-1 btn-primary py-2 text-sm"
                      >
                        <Save className="w-4 h-4 inline mr-1" /> Add
                      </button>
                      <button
                        onClick={() => setIsCreating(null)}
                        className="btn-secondary py-2 px-3"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Records List */}
                <div className="space-y-2 md:space-y-3 max-h-[250px] overflow-y-auto scrollbar-thin">
                  {categoryRecords.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">No members yet</p>
                  ) : (
                    categoryRecords.map((record) => {
                      const member = getUserById(record.userId);
                      if (!member) return null;

                      const isEditing = editingRecord === record.id;

                      return (
                        <div key={record.id} className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-xl bg-white/5">
                          {isEditing ? (
                            <div className="flex-1 space-y-2">
                              {category.id === 'most_active' || category.id === 'slow_worker' ? (
                                <input
                                  type="number"
                                  defaultValue={record.percentage}
                                  onChange={(e) => setNewRecord({ ...newRecord, percentage: Number(e.target.value) })}
                                  className="input-glass w-full text-sm"
                                  placeholder="Percentage"
                                />
                              ) : category.id === 'most_funny' || category.id === 'special' ? (
                                <input
                                  type="number"
                                  defaultValue={record.rank}
                                  onChange={(e) => setNewRecord({ ...newRecord, rank: Number(e.target.value) })}
                                  className="input-glass w-full text-sm"
                                  placeholder="Rank"
                                />
                              ) : null}
                              <input
                                type="text"
                                defaultValue={record.remark}
                                onChange={(e) => setNewRecord({ ...newRecord, remark: e.target.value })}
                                className="input-glass w-full text-sm"
                                placeholder="Remark"
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleUpdate(record.id)}
                                  className="flex-1 btn-primary py-1.5 text-xs"
                                >
                                  <Save className="w-3 h-3 inline mr-1" /> Save
                                </button>
                                <button
                                  onClick={() => setEditingRecord(null)}
                                  className="btn-secondary py-1.5 px-2"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <Avatar className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex-shrink-0">
                                <AvatarImage src={member.profilePic} className="rounded-lg" />
                                <AvatarFallback className="rounded-lg bg-gradient-to-br from-neon-pink to-neon-purple text-xs">
                                  {member.username.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{member.username}</p>
                                {record.percentage !== undefined && (
                                  <p className={`text-xs ${category.color}`}>{record.percentage}%</p>
                                )}
                                {record.rank !== undefined && (
                                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Medal className="w-3 h-3" /> #{record.rank}
                                  </p>
                                )}
                                {record.remark && (
                                  <p className="text-xs text-muted-foreground truncate">{record.remark}</p>
                                )}
                              </div>

                              {isAdmin && (
                                <div className="flex gap-1 flex-shrink-0">
                                  <button
                                    onClick={() => {
                                      setEditingRecord(record.id);
                                      setNewRecord(record);
                                    }}
                                    className="p-1.5 rounded-lg hover:bg-white/5"
                                  >
                                    <Edit2 className="w-3.5 h-3.5 text-muted-foreground" />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(record.id)}
                                    className="p-1.5 rounded-lg hover:bg-red-500/10"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                                  </button>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
