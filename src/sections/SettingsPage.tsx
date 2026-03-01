import { useState, useRef } from 'react';
import { 
  User as UserIcon, Lock, Camera, Save, AlertCircle, Check, 
  Eye, EyeOff, Mail, ArrowLeft, Shield, Trash2 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { store } from '@/lib/store';
import type { User, View } from '@/types';
import { toast } from 'sonner';

interface SettingsPageProps {
  user: User;
  onViewChange: (view: View) => void;
  onUserUpdate: (user: User) => void;
}

export function SettingsPage({ user, onViewChange, onUserUpdate }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [profilePic, setProfilePic] = useState(user.profilePic || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile form state
  const [profileData, setProfileData] = useState({
    username: user.username || '',
    email: user.email || '',
    whatsapp: user.whatsapp || '',
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    country: user.country || '',
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setProfilePic(result);
        toast.success('Profile picture updated! Click Save to apply changes.');
      }
    };
    reader.onerror = () => {
      toast.error('Failed to read image file');
    };
    reader.readAsDataURL(file);
  };

  const validateProfile = () => {
    const newErrors: Record<string, string> = {};
    
    if (!profileData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!profileData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors: Record<string, string> = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = async () => {
    if (!validateProfile()) return;
    
    setIsLoading(true);
    
    try {
      // Check if email is already taken by another user
      const users = store.getUsers();
      const existingUser = users.find(
        u => u.email.toLowerCase() === profileData.email.toLowerCase() && u.id !== user.id
      );
      
      if (existingUser) {
        toast.error('Email is already taken by another user');
        setIsLoading(false);
        return;
      }
      
      const updates: Partial<User> = {
        username: profileData.username,
        email: profileData.email,
        whatsapp: profileData.whatsapp,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        country: profileData.country,
        profilePic: profilePic,
      };
      
      const updatedUser = store.updateUser(user.id, updates);
      
      if (updatedUser) {
        // Update current user in localStorage
        localStorage.setItem('progression_current_user', JSON.stringify(updatedUser));
        onUserUpdate(updatedUser);
        toast.success('Profile updated successfully!');
      } else {
        toast.error('Failed to update profile');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!validatePassword()) return;
    
    setIsLoading(true);
    
    try {
      // Verify current password
      if (user.password !== passwordData.currentPassword) {
        toast.error('Current password is incorrect');
        setIsLoading(false);
        return;
      }
      
      const updatedUser = store.updateUser(user.id, { password: passwordData.newPassword });
      
      if (updatedUser) {
        localStorage.setItem('progression_current_user', JSON.stringify(updatedUser));
        onUserUpdate(updatedUser);
        toast.success('Password changed successfully!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        toast.error('Failed to change password');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePhoto = () => {
    setProfilePic('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.info('Photo removed. Click Save to apply changes.');
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 noise-bg">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="glass-panel p-4 md:p-6 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onViewChange('dashboard')}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">Settings</h1>
              <p className="text-xs md:text-sm text-muted-foreground">Manage your account preferences</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="glass-panel p-1 mb-6 flex gap-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-neon-pink to-neon-purple text-white'
                : 'text-muted-foreground hover:text-white hover:bg-white/5'
            }`}
          >
            <UserIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Profile</span>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all ${
              activeTab === 'security'
                ? 'bg-gradient-to-r from-neon-pink to-neon-purple text-white'
                : 'text-muted-foreground hover:text-white hover:bg-white/5'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Security</span>
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="glass-panel p-6 space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="relative">
                <Avatar 
                  className="w-28 h-28 rounded-2xl border-2 border-white/10"
                >
                  {profilePic ? (
                    <AvatarImage 
                      src={profilePic} 
                      className="rounded-2xl object-cover w-full h-full" 
                      alt="Profile"
                    />
                  ) : (
                    <AvatarFallback className="rounded-2xl bg-gradient-to-br from-neon-pink to-neon-purple text-2xl font-bold">
                      {user.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                
                {/* Change photo button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-neon-pink text-white text-xs font-medium flex items-center gap-1 hover:bg-neon-pink/80 transition-colors"
                >
                  <Camera className="w-3 h-3" />
                  Change
                </button>
                
                {/* Remove photo button */}
                {profilePic && (
                  <button
                    onClick={handleRemovePhoto}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors"
                    title="Remove photo"
                  >
                    <Trash2 className="w-3 h-3 text-white" />
                  </button>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Click to upload a new profile picture (max 5MB)
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Username
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={profileData.username}
                    onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                    className={`input-glass pl-10 ${errors.username ? 'border-red-500' : ''}`}
                    placeholder="Your username"
                  />
                </div>
                {errors.username && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.username}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className={`input-glass pl-10 ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  WhatsApp (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">+</span>
                  <input
                    type="tel"
                    value={profileData.whatsapp}
                    onChange={(e) => setProfileData({ ...profileData, whatsapp: e.target.value })}
                    className="input-glass pl-8"
                    placeholder="1234567890"
                  />
                </div>
              </div>

              {/* First & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    First Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    className="input-glass"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Last Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    className="input-glass"
                    placeholder="Last name"
                  />
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Country (Optional)
                </label>
                <input
                  type="text"
                  value={profileData.country}
                  onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                  className="input-glass"
                  placeholder="Your country"
                />
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveProfile}
              disabled={isLoading}
              className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </span>
              )}
            </button>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="glass-panel p-6 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-neon-pink/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-neon-pink" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Change Password</h3>
                <p className="text-xs text-muted-foreground">Update your account password</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className={`input-glass pl-10 pr-10 ${errors.currentPassword ? 'border-red-500' : ''}`}
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
                  >
                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.currentPassword && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.currentPassword}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className={`input-glass pl-10 pr-10 ${errors.newPassword ? 'border-red-500' : ''}`}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.newPassword}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className={`input-glass pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    placeholder="Confirm new password"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Change Password Button */}
            <button
              onClick={handleChangePassword}
              disabled={isLoading}
              className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Changing...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" />
                  Change Password
                </span>
              )}
            </button>

            {/* Account Info */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="text-sm font-medium text-white mb-4">Account Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Role</span>
                  <span className="text-white capitalize">{user.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member Since</span>
                  <span className="text-white">
                    {new Date(user.joinedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Verified Status</span>
                  <span className={user.isVerified ? 'text-green-400' : 'text-yellow-400'}>
                    {user.isVerified ? 'Verified' : 'Not Verified'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
