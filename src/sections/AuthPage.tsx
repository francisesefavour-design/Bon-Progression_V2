import { useState, useRef } from 'react';
import { Eye, EyeOff, Upload, ArrowLeft, User as UserIcon, Mail, Phone, Lock, Check, Camera, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { User, View } from '@/types';

interface AuthPageProps {
  mode: 'signup' | 'login';
  onViewChange: (view: View) => void;
  onAuth: (user: User, isNewRegistration?: boolean) => void;
}

export function AuthPage({ mode, onViewChange, onAuth }: AuthPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [profilePic, setProfilePic] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    whatsapp: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }
    
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setProfilePic(result);
        setError(''); // Clear any previous errors
        console.log('Profile picture loaded successfully');
      }
    };
    
    reader.onerror = () => {
      setError('Failed to read image file. Please try again.');
      console.error('FileReader error');
    };
    
    reader.onabort = () => {
      console.log('File reading aborted');
    };
    
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProfilePic('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      if (mode === 'signup') {
        // Check if email exists
        const users = JSON.parse(localStorage.getItem('progression_users') || '[]');
        const existingUser = users.find((u: User) => u.email.toLowerCase() === formData.email.toLowerCase());
        
        if (existingUser) {
          setError('Email already registered');
          setIsLoading(false);
          return;
        }

        // Create new user
        const newUser: User = {
          id: Date.now().toString(),
          email: formData.email,
          username: formData.username,
          password: formData.password,
          profilePic: profilePic,
          whatsapp: formData.whatsapp,
          role: 'member',
          joinedAt: Date.now(),
          participationPct: 0,
          activityCount: 0,
          lastActiveAt: Date.now(),
          isActive: false,
          isVerified: false,
        };

        users.push(newUser);
        localStorage.setItem('progression_users', JSON.stringify(users));
        localStorage.setItem('progression_current_user', JSON.stringify(newUser));
        onAuth(newUser, true);
      } else {
        // Login - ONLY check main user credentials, NOT script accounts
        const users = JSON.parse(localStorage.getItem('progression_users') || '[]');
        const user = users.find((u: User) => u.email.toLowerCase() === formData.email.toLowerCase());
        
        if (!user || user.password !== formData.password) {
          setError('Invalid email or password');
          setIsLoading(false);
          return;
        }

        localStorage.setItem('progression_current_user', JSON.stringify(user));
        onAuth(user, false);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isSignup = mode === 'signup';

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 noise-bg">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-pink/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back Button */}
        <button
          onClick={() => onViewChange('home')}
          className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Card */}
        <div className="glass-panel p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 flex items-center justify-center">
              <img src="/logo.png" alt="Progression" className="w-12 h-12 object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {isSignup ? 'Join the Elite' : 'Welcome Back'}
            </h1>
            <p className="text-muted-foreground text-sm">
              {isSignup 
                ? 'Become part of the hacking community' 
                : 'Sign in to access your dashboard'}
            </p>
          </div>

          {/* Profile Picture Upload (Signup only) */}
          {isSignup && (
            <div className="flex justify-center mb-6">
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="relative cursor-pointer group"
                >
                  <Avatar 
                    className="w-28 h-28 rounded-2xl border-2 border-dashed border-white/20 group-hover:border-neon-pink/50 transition-all overflow-hidden"
                  >
                    {profilePic ? (
                      <AvatarImage 
                        src={profilePic} 
                        className="rounded-2xl object-cover w-full h-full" 
                        alt="Profile preview"
                      />
                    ) : (
                      <AvatarFallback className="rounded-2xl bg-white/5 flex flex-col items-center justify-center">
                        <Camera className="w-8 h-8 text-muted-foreground mb-1" />
                        <span className="text-xs text-muted-foreground">Add Photo</span>
                      </AvatarFallback>
                    )}
                  </Avatar>
                  
                  {/* Upload overlay - shown on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Success indicator */}
                  {profilePic && (
                    <>
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center border-2 border-background">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      {/* Remove button */}
                      <button
                        onClick={handleRemovePhoto}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center border-2 border-background hover:bg-red-600 transition-colors"
                        title="Remove photo"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                    </>
                  )}
                </div>
                <p className="text-center text-xs text-muted-foreground mt-3">
                  {profilePic ? 'Click to change photo' : 'Click to upload photo (max 5MB)'}
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-glass pl-10"
                required
              />
            </div>

            {/* Username (Signup only) */}
            {isSignup && (
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="input-glass pl-10"
                  required
                />
              </div>
            )}

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input-glass pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* WhatsApp (Signup only) */}
            {isSignup && (
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="tel"
                  placeholder="WhatsApp (optional)"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="input-glass pl-10"
                />
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isSignup ? 'Creating Account...' : 'Signing In...'}
                </span>
              ) : (
                isSignup ? 'Create Account' : 'Sign In'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}
              <button
                onClick={() => onViewChange(isSignup ? 'login' : 'signup')}
                className="ml-1 text-neon-pink hover:underline"
              >
                {isSignup ? 'Sign In' : 'Create One'}
              </button>
            </p>
          </div>

          {/* Admin Login Hint */}
          {!isSignup && (
            <div className="mt-4 p-3 rounded-lg bg-white/5 text-xs text-muted-foreground text-center">
              <p>Admin: ceo@gmail.com / What_is_your_dream [hack it]</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
