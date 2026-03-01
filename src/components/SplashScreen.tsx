import { useEffect, useState, useRef } from 'react';
import { Terminal, Cpu, Shield, Zap, Lock, Globe, Code, Radio } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [step, setStep] = useState(0);
  const [text, setText] = useState('');
  const [showSkip, setShowSkip] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const messages = [
    'Initializing BON TECH systems...',
    'Loading secure protocols...',
    'Connecting to global networks...',
    'Decrypting trading algorithms...',
    'Accessing encrypted databases...',
    'Establishing secure channels...',
    'Welcome to BON TECH',
  ];

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = step < 6 ? '#ff2f92' : '#7b3bff';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, [step]);

  // Typewriter effect
  useEffect(() => {
    if (step >= messages.length) {
      setTimeout(onComplete, 1500);
      return;
    }

    const message = messages[step];
    let i = 0;
    setText('');

    const typeInterval = setInterval(() => {
      if (i <= message.length) {
        setText(message.slice(0, i));
        i++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setStep(s => s + 1), 800);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [step, onComplete]);

  // Show skip button after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowSkip(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const icons = [Terminal, Cpu, Shield, Zap, Lock, Globe, Code, Radio];
  const CurrentIcon = icons[step % icons.length];

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">
      {/* Matrix Rain Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 opacity-30"
      />

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
      }} />

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-pink/20 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '0.5s' }} />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        {/* Logo Animation */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-pink to-neon-purple rounded-full blur-2xl opacity-50 animate-pulse" />
          <div className="relative w-32 h-32 mx-auto rounded-full border-2 border-neon-pink/50 flex items-center justify-center animate-float">
            <CurrentIcon className="w-16 h-16 text-neon-pink" />
          </div>
        </div>

        {/* Tech Interface */}
        <div className="max-w-lg mx-auto">
          {/* Progress Bar */}
          <div className="h-1 w-full bg-white/10 rounded-full mb-6 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-neon-pink to-neon-purple transition-all duration-500"
              style={{ width: `${((step + 1) / messages.length) * 100}%` }}
            />
          </div>

          {/* Terminal Window */}
          <div className="glass-panel p-6 rounded-xl border border-neon-pink/30">
            <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2">bon_tech@terminal:~</span>
            </div>
            
            <p className="text-lg md:text-xl font-mono text-white">
              <span className="text-neon-pink">$</span> {text}
              <span className="animate-pulse">_</span>
            </p>
          </div>

          {/* Status Indicators */}
          <div className="flex justify-center gap-4 mt-6">
            {['ENCRYPTED', 'SECURE', 'ACTIVE'].map((label, i) => (
              <div 
                key={label}
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
                  i <= step / 2 ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-muted-foreground'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${i <= step / 2 ? 'bg-green-400 animate-pulse' : 'bg-muted-foreground'}`} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Welcome Message (final step) */}
        {step >= 6 && (
          <div className="mt-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="neon-text">BON TECH</span>
            </h1>
            <p className="text-muted-foreground mt-2">Progression Trading Platform</p>
          </div>
        )}
      </div>

      {/* Skip Button */}
      {showSkip && step < 6 && (
        <button
          onClick={onComplete}
          className="absolute bottom-8 right-8 px-4 py-2 rounded-lg glass-panel text-sm text-muted-foreground hover:text-white transition-colors"
        >
          Skip Intro →
        </button>
      )}

      {/* Corner Decorations */}
      <div className="absolute top-4 left-4 text-xs font-mono text-neon-pink/50">
        SYS.STATUS: ONLINE
      </div>
      <div className="absolute top-4 right-4 text-xs font-mono text-neon-purple/50">
        v2.5.0-BETA
      </div>
      <div className="absolute bottom-4 left-4 text-xs font-mono text-muted-foreground">
        {new Date().toISOString()}
      </div>
    </div>
  );
}
