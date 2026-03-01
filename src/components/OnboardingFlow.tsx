import { useState, useRef, useEffect } from 'react';
import { ChevronRight, User as UserIcon, Calendar, Globe, Award } from 'lucide-react';
import { store } from '@/lib/store';
import type { User } from '@/types';

interface OnboardingFlowProps {
  user: User;
  onComplete: () => void;
}

type OnboardingStep = 'personal' | 'video' | 'complete';

const countries = [
  'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'United States', 'United Kingdom',
  'Canada', 'Australia', 'Germany', 'France', 'India', 'Other'
];

const membershipDurations = [
  'Less than 1 month',
  '1-3 months',
  '3-6 months',
  '6-12 months',
  'Over 1 year'
];

export function OnboardingFlow({ user, onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState<OnboardingStep>('personal');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    country: '',
    membershipDuration: '',
    experienceLevel: '' as 'beginner' | 'expert' | '',
  });
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Video animation effect
  useEffect(() => {
    if (step !== 'video') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId: number;
    let frame = 0;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw progress bar particles
      const centerY = canvas.height / 2;
      const progressWidth = (progress / 100) * canvas.width * 0.6;
      const startX = canvas.width * 0.2;

      // Progress bar background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(startX, centerY - 10, canvas.width * 0.6, 20);

      // Progress bar fill
      const gradient = ctx.createLinearGradient(startX, 0, startX + progressWidth, 0);
      gradient.addColorStop(0, '#ff2f92');
      gradient.addColorStop(1, '#7b3bff');
      ctx.fillStyle = gradient;
      ctx.fillRect(startX, centerY - 10, progressWidth, 20);

      // Glow effect
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#ff2f92';
      ctx.fillRect(startX, centerY - 10, progressWidth, 20);
      ctx.shadowBlur = 0;

      // Particles
      for (let i = 0; i < 5; i++) {
        const x = startX + progressWidth + Math.random() * 50;
        const y = centerY + (Math.random() - 0.5) * 40;
        const size = Math.random() * 4 + 2;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 47, 146, ${Math.random()})`;
        ctx.fill();
      }

      frame++;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setStep('complete'), 500);
          return 100;
        }
        return p + 2;
      });
    }, 100);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(progressInterval);
    };
  }, [step]);

  // Complete and redirect
  useEffect(() => {
    if (step === 'complete') {
      const timer = setTimeout(onComplete, 2000);
      return () => clearTimeout(timer);
    }
  }, [step, onComplete]);

  const handleSubmit = () => {
    if (!formData.firstName || !formData.lastName || !formData.country || !formData.experienceLevel) {
      return;
    }
    
    // Save user data
    store.updateUser(user.id, {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
      country: formData.country,
      membershipDuration: formData.membershipDuration,
      experienceLevel: formData.experienceLevel,
    });

    setStep('video');
  };

  if (step === 'video') {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
        <canvas ref={canvasRef} className="absolute inset-0" />
        
        <div className="relative z-10 text-center">
          <div className="mb-8">
            <div className="text-6xl font-bold neon-text mb-2">{progress}%</div>
            <p className="text-muted-foreground">Preparing your dashboard...</p>
          </div>
          
          <div className="max-w-md mx-auto space-y-2 text-sm text-muted-foreground">
            <p className={progress > 20 ? 'text-white' : ''}>✓ Initializing profile</p>
            <p className={progress > 40 ? 'text-white' : ''}>✓ Loading trading modules</p>
            <p className={progress > 60 ? 'text-white' : ''}>✓ Connecting to community</p>
            <p className={progress > 80 ? 'text-white' : ''}>✓ Setting up notifications</p>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
          Universal Infinity - Becoming the best community
        </div>
      </div>
    );
  }

  if (step === 'complete') {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center">
            <Award className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Aboard!</h2>
          <p className="text-muted-foreground">Your dashboard is ready</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 pt-24 noise-bg">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-pink/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-neon-pink flex items-center justify-center text-white text-sm font-bold">1</div>
            <span className="text-sm text-white">Profile</span>
          </div>
          <div className="w-12 h-0.5 bg-white/20" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-muted-foreground text-sm font-bold">2</div>
            <span className="text-sm text-muted-foreground">Setup</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="glass-panel p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 flex items-center justify-center">
              <UserIcon className="w-8 h-8 text-neon-pink" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Complete Your Profile</h1>
            <p className="text-sm text-muted-foreground">Tell us a bit about yourself</p>
          </div>

          <div className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="John"
                  className="input-glass w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Doe"
                  className="input-glass w-full"
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className="input-glass w-full"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Country
              </label>
              <select
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="input-glass w-full"
              >
                <option value="">Select your country</option>
                {countries.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Membership Duration */}
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">
                How long have you been a member?
              </label>
              <select
                value={formData.membershipDuration}
                onChange={(e) => setFormData({ ...formData, membershipDuration: e.target.value })}
                className="input-glass w-full"
              >
                <option value="">Select duration</option>
                {membershipDurations.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">
                Your Trading Experience
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, experienceLevel: 'beginner' })}
                  className={`p-4 rounded-xl border transition-all ${
                    formData.experienceLevel === 'beginner'
                      ? 'border-neon-pink bg-neon-pink/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="text-2xl mb-2">🌱</div>
                  <div className="font-medium text-white">Beginner</div>
                  <div className="text-xs text-muted-foreground">Just starting out</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, experienceLevel: 'expert' })}
                  className={`p-4 rounded-xl border transition-all ${
                    formData.experienceLevel === 'expert'
                      ? 'border-neon-pink bg-neon-pink/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="text-2xl mb-2">🚀</div>
                  <div className="font-medium text-white">Expert</div>
                  <div className="text-xs text-muted-foreground">Experienced trader</div>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!formData.firstName || !formData.lastName || !formData.country || !formData.experienceLevel}
              className="w-full btn-primary py-4 mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Continue
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
