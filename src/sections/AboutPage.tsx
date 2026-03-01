import { useEffect, useRef, useState } from 'react';
import { Crown, Users, Star, Award, TrendingUp, Target, Zap, Shield } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface TeamMember {
  name: string;
  role: string;
  avatar?: string;
  highlight?: boolean;
}

export function AboutPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el);
  };

  const teamMembers: TeamMember[] = [
    { name: 'BON JAC', role: 'CEO & Founder', highlight: true },
    { name: 'pepeli_admin', role: 'Sub-Admin' },
    { name: 'lawrence_daniel', role: 'Community Manager' },
    { name: 'jenkins_arthur', role: 'Signal Analyst' },
  ];

  const activeMembers = [
    { name: 'obiebi_fab', activity: '95% participation' },
    { name: 'amaka_yoyo', activity: '78% participation' },
    { name: 'godstime_best', activity: '68% participation' },
    { name: 'perebo_sigha', activity: '60% participation' },
  ];

  const achievements = [
    { icon: Target, label: '10+ Active Members', value: 'Growing Daily' },
    { icon: TrendingUp, label: 'Success Rate', value: '95% Accuracy' },
    { icon: Zap, label: 'Scripts Delivered', value: '50+ Updates' },
    { icon: Shield, label: 'Communities', value: '3 Groups' },
  ];

  return (
    <div className="min-h-screen pt-20 noise-bg">
      {/* Hero Section - CEO Spotlight */}
      <section 
        id="hero"
        ref={setRef('hero')}
        className="min-h-[80vh] flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neon-pink/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-neon-purple/10 rounded-full blur-[120px]" />
        </div>

        <div className={`relative z-10 text-center px-4 transition-all duration-1000 ${visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8 inline-block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-pink to-neon-purple rounded-full blur-2xl opacity-40 animate-pulse" />
              <div className="relative w-40 h-40 mx-auto rounded-full glass-panel flex items-center justify-center border-2 border-neon-pink/30">
                <Crown className="w-20 h-20 text-neon-pink" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-neon-pink flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="text-white">Meet </span>
            <span className="neon-text">BON JAC</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-2">Chief Executive Officer</p>
          <p className="text-lg text-neon-pink font-medium">Progression Information</p>

          <div className="mt-8 flex justify-center gap-4">
            <div className="glass-card px-6 py-3">
              <p className="text-2xl font-bold neon-text">5+</p>
              <p className="text-xs text-muted-foreground">Years Experience</p>
            </div>
            <div className="glass-card px-6 py-3">
              <p className="text-2xl font-bold neon-text">1000+</p>
              <p className="text-xs text-muted-foreground">Lives Impacted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section 
        id="mission"
        ref={setRef('mission')}
        className="py-20 px-4"
      >
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-200 ${visibleSections.has('mission') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="glass-panel p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-pink to-neon-purple" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-neon-pink/10 rounded-full blur-[80px]" />
            
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-muted-foreground text-center leading-relaxed">
              Progression was founded with a singular vision: to democratize access to advanced trading 
              tools and knowledge. Under BON JAC's leadership, we've built a community where traders 
              of all levels can access premium scripts, real-time signals, and expert guidance to 
              achieve financial freedom.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section 
        id="team"
        ref={setRef('team')}
        className="py-20 px-4"
      >
        <div className={`max-w-6xl mx-auto transition-all duration-1000 delay-300 ${visibleSections.has('team') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold text-center mb-4">
            <span className="text-white">Leadership </span>
            <span className="neon-text">Team</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Meet the visionaries behind Progression's success
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div 
                key={member.name}
                className={`glass-card p-6 text-center group hover:border-neon-pink/30 transition-all duration-300 ${member.highlight ? 'border-neon-pink/30' : ''}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${member.highlight ? 'bg-gradient-to-br from-neon-pink to-neon-purple' : 'bg-white/10'}`}>
                  <Users className={`w-10 h-10 ${member.highlight ? 'text-white' : 'text-muted-foreground'}`} />
                </div>
                <h3 className="font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-sm text-neon-pink">{member.role}</p>
                {member.highlight && (
                  <div className="mt-3 inline-flex items-center gap-1 text-xs text-yellow-400">
                    <Crown className="w-3 h-3" />
                    <span>Founder</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section 
        id="achievements"
        ref={setRef('achievements')}
        className="py-20 px-4"
      >
        <div className={`max-w-6xl mx-auto transition-all duration-1000 delay-400 ${visibleSections.has('achievements') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-white">Our </span>
            <span className="neon-text">Achievements</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((item, index) => (
              <div 
                key={item.label}
                className="glass-card p-6 text-center group hover:border-neon-pink/30"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-neon-pink" />
                </div>
                <p className="text-2xl font-bold text-white mb-1">{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Most Active Members */}
      <section 
        id="active"
        ref={setRef('active')}
        className="py-20 px-4"
      >
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-500 ${visibleSections.has('active') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold text-center mb-4">
            <span className="text-white">Most Active </span>
            <span className="neon-text">Members</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            Recognizing our community champions
          </p>

          <div className="glass-panel p-6">
            <div className="space-y-4">
              {activeMembers.map((member, index) => (
                <div 
                  key={member.name}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <Avatar className="w-12 h-12 rounded-lg">
                    <AvatarFallback className="rounded-lg bg-white/10">
                      {member.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-white">@{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.activity}</p>
                  </div>
                  <Award className={`w-6 h-6 ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-300' : index === 2 ? 'text-amber-600' : 'text-muted-foreground'}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Honorary Mentions */}
      <section 
        id="honors"
        ref={setRef('honors')}
        className="py-20 px-4"
      >
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-600 ${visibleSections.has('honors') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-white">Honorary </span>
            <span className="neon-text">Mentions</span>
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {['brown_rogers', 'c208_user'].map((name) => (
              <div key={name} className="glass-card p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 flex items-center justify-center">
                  <Star className="w-6 h-6 text-neon-purple" />
                </div>
                <div>
                  <p className="font-medium text-white">@{name}</p>
                  <p className="text-sm text-muted-foreground">Valued Community Member</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass-panel p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-pink to-neon-purple" />
            <h2 className="text-2xl font-bold text-white mb-4">Join the Progression Family</h2>
            <p className="text-muted-foreground mb-6">
              Be part of a community that's shaping the future of trading.
            </p>
            <div className="flex justify-center gap-4">
              <div className="glass-card px-6 py-3">
                <p className="text-neon-pink font-semibold">ceo@gmail.com</p>
                <p className="text-xs text-muted-foreground">Contact CEO</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Progression Information. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Founded by BON JAC with passion for trading excellence.
          </p>
        </div>
      </footer>
    </div>
  );
}
