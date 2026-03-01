import { useEffect, useState, useRef } from 'react';
import { ArrowRight, Users, Shield, Terminal, Zap, ChevronDown, ChevronLeft, ChevronRight, Star, Quote, AlertTriangle, Lock, Eye } from 'lucide-react';
import type { View } from '@/types';

interface HomePageProps {
  onViewChange: (view: View) => void;
}

export function HomePage({ onViewChange }: HomePageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const testimonialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Terminal,
      title: 'Hacking Scripts',
      description: 'Access advanced penetration testing tools and exploits.',
    },
    {
      icon: Users,
      title: 'Elite Community',
      description: 'Join hackers in our private WhatsApp groups.',
    },
    {
      icon: Shield,
      title: 'Security Research',
      description: 'Learn ethical hacking and vulnerability analysis.',
    },
    {
      icon: Zap,
      title: 'Zero-Day Intel',
      description: 'Get instant notifications on new discoveries.',
    },
  ];

  const testimonials = [
    { image: '/testimonial1.jpg', name: 'Michael O.', role: 'Security Researcher', quote: 'Nice works Bon Jac! The MOD script toolkit is incredible for penetration testing!' },
    { image: '/testimonial2.jpg', name: 'Sarah K.', role: 'Bug Bounty Hunter', quote: 'Bon Jac, you are a genius! Progression helped me find my first critical bug!' },
    { image: '/testimonial3.jpg', name: 'David A.', role: 'Ethical Hacker', quote: 'Incredible work Bon Jac! The exploit scripts are always on point!' },
    { image: '/testimonial4.jpg', name: 'Grace M.', role: 'Cybersecurity Analyst', quote: 'Nice works Bon Jac! My team uses these tools daily for security audits!' },
    { image: '/testimonial5.jpg', name: 'James T.', role: 'Penetration Tester', quote: 'Bon Jac, your expertise is unmatched. Progression is the real deal for hackers!' },
    { image: '/testimonial6.jpg', name: 'Amanda P.', role: 'Security Student', quote: 'Started with nothing, now finding vulnerabilities. Nice works Bon Jac!' },
    { image: '/testimonial7.jpg', name: 'Chris B.', role: 'Red Team Operator', quote: 'The automation features are brilliant. Bon Jac, you have built something special!' },
    { image: '/testimonial8.jpg', name: 'Patricia N.', role: 'Security Engineer', quote: 'Nice works Bon Jac! The exploit accuracy is phenomenal!' },
    { image: '/testimonial9.jpg', name: 'Kevin L.', role: 'Freelance Hacker', quote: 'Even with my busy schedule, I am finding bugs. Thank you Bon Jac!' },
    { image: '/testimonial10.jpg', name: 'Victoria R.', role: 'Security Consultant', quote: 'Bon Jac, your scripts are essential for my security assessments!' },
    { image: '/testimonial11.jpg', name: 'Robert S.', role: 'CTF Player', quote: 'Nice works Bon Jac! I have recommended Progression to all my teammates!' },
    { image: '/testimonial12.jpg', name: 'Jennifer W.', role: 'Security Enthusiast', quote: 'Who knew hacking could be this accessible? Bon Jac democratized security!' },
    { image: '/testimonial13.jpg', name: 'Daniel H.', role: 'Security Auditor', quote: 'The community support combined with Bon Jac\'s tools is unbeatable!' },
    { image: '/testimonial14.jpg', name: 'Michelle C.', role: 'Network Security', quote: 'Nice works Bon Jac! Diversified my skills with ethical hacking!' },
  ];

  const cryptoAttacks = [
    { image: '/hack1.jpg', title: 'The DAO Hack', description: '50M ETH stolen through smart contract exploit', year: '2016' },
    { image: '/hack2.jpg', title: 'Wallet Drain Attack', description: 'DeFi protocol vulnerability leads to massive losses', year: '2021' },
    { image: '/hack3.jpg', title: 'Smart Contract Exploit', description: 'Flash loan attack manipulates price oracle', year: '2022' },
    { image: '/hack4.jpg', title: 'Bridge Hack', description: 'Cross-chain bridge compromised, funds stolen', year: '2023' },
  ];

  const scrollTestimonials = (direction: 'left' | 'right') => {
    if (testimonialRef.current) {
      const scrollAmount = 280;
      testimonialRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen noise-bg" style={{ pointerEvents: 'auto' }}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-16 md:pt-20 pb-12 md:pb-16">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-neon-pink/10 rounded-full blur-[100px] md:blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-neon-purple/10 rounded-full blur-[100px] md:blur-[120px]" />
        </div>

        <div className={`relative z-10 max-w-5xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Logo Display */}
          <div className="mb-6 md:mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-pink to-neon-purple rounded-2xl md:rounded-3xl blur-2xl opacity-30" />
              <div className="relative glass-panel p-1.5 md:p-2 rounded-2xl md:rounded-3xl">
                <img 
                  src="/logo.png" 
                  alt="Progression" 
                  className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 object-contain rounded-xl md:rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6">
            <span className="text-white">Welcome to </span>
            <span className="neon-text">Progression</span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-10 px-4">
            The ultimate platform for ethical hackers. Access premium exploits, join exclusive communities, 
            and master the art of cybersecurity.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-10 md:mb-16 px-4">
            <button 
              onClick={() => onViewChange('signup')}
              className="btn-primary flex items-center justify-center gap-2 text-base md:text-lg px-6 md:px-8 py-3 md:py-4 cursor-pointer"
              type="button"
            >
              Get Started
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button 
              onClick={() => onViewChange('login')}
              className="btn-secondary flex items-center justify-center gap-2 text-base md:text-lg px-6 md:px-8 py-3 md:py-4 cursor-pointer"
              type="button"
            >
              Sign In
            </button>
            <button 
              onClick={() => onViewChange('about')}
              className="btn-secondary flex items-center justify-center gap-2 text-base md:text-lg px-6 md:px-8 py-3 md:py-4 cursor-pointer"
              type="button"
            >
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-md mx-auto px-4">
            <div className="glass-card p-3 md:p-4">
              <div className="text-xl md:text-2xl lg:text-3xl font-bold neon-text">10+</div>
              <div className="text-xs md:text-sm text-muted-foreground">Hackers</div>
            </div>
            <div className="glass-card p-3 md:p-4">
              <div className="text-xl md:text-2xl lg:text-3xl font-bold neon-text">3</div>
              <div className="text-xs md:text-sm text-muted-foreground">Groups</div>
            </div>
            <div className="glass-card p-3 md:p-4">
              <div className="text-xl md:text-2xl lg:text-3xl font-bold neon-text">65%</div>
              <div className="text-xs md:text-sm text-muted-foreground">Success</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-3 md:mb-4">
            Why Choose <span className="neon-text">Progression</span>?
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8 md:mb-12 px-4 text-sm md:text-base">
            Everything you need to succeed in ethical hacking
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-2">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="glass-card p-5 md:p-6 group hover:border-neon-pink/30 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-neon-pink" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2">{feature.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Crypto Hacking Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
            <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
              <span className="text-white">Crypto </span>
              <span className="text-red-500">Attack</span>
              <span className="text-white"> Archives</span>
            </h2>
            <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
          </div>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8 md:mb-12 px-4 text-sm md:text-base">
            Learn from the biggest Ethereum hacks in history. Knowledge is power.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 px-2">
            {cryptoAttacks.map((attack) => (
              <div 
                key={attack.title}
                className="glass-card overflow-hidden group hover:border-red-500/30 transition-all duration-300"
              >
                <div className="relative h-40 md:h-48 overflow-hidden">
                  <img 
                    src={attack.image} 
                    alt={attack.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-2 md:top-3 right-2 md:right-3 px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-red-500/20 border border-red-500/30">
                    <span className="text-[10px] md:text-xs text-red-400 font-mono">{attack.year}</span>
                  </div>
                  <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 flex items-center gap-1.5 md:gap-2">
                    <Lock className="w-3 h-3 md:w-4 md:h-4 text-red-400" />
                    <span className="text-[10px] md:text-xs text-red-400">BREACH DETECTED</span>
                  </div>
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="text-sm md:text-base font-semibold text-white mb-1 md:mb-2 flex items-center gap-1.5 md:gap-2">
                    <Eye className="w-3 h-3 md:w-4 md:h-4 text-red-400" />
                    {attack.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{attack.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-3 md:mb-4">
            What Our <span className="neon-text">Hackers Say</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8 md:mb-12 px-4 text-sm md:text-base">
            Real testimonials from security professionals
          </p>

          {/* Testimonials Carousel */}
          <div className="relative px-2">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h3 className="text-sm md:text-base font-semibold text-white flex items-center gap-2">
                <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                Member Testimonials
              </h3>
              <div className="flex gap-1.5 md:gap-2">
                <button 
                  onClick={() => scrollTestimonials('left')}
                  className="p-2 md:p-3 rounded-xl glass-card hover:border-neon-pink/30 transition-colors cursor-pointer"
                  type="button"
                >
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button 
                  onClick={() => scrollTestimonials('right')}
                  className="p-2 md:p-3 rounded-xl glass-card hover:border-neon-pink/30 transition-colors cursor-pointer"
                  type="button"
                >
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>

            <div 
              ref={testimonialRef}
              className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-thin pb-4 snap-x snap-mandatory -mx-2 px-2"
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 w-72 md:w-80 snap-start"
                >
                  <div className="glass-card p-4 md:p-6 h-full flex flex-col">
                    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-neon-pink/30"
                      />
                      <div>
                        <h4 className="font-semibold text-white text-sm md:text-base">{testimonial.name}</h4>
                        <p className="text-xs md:text-sm text-neon-pink">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex-1 relative">
                      <Quote className="absolute top-0 left-0 w-4 h-4 md:w-6 md:h-6 text-neon-pink/20" />
                      <p className="text-xs md:text-sm text-muted-foreground pl-5 md:pl-8 italic leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                    </div>
                    <div className="flex gap-0.5 md:gap-1 mt-3 md:mt-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto px-2">
          <div className="glass-panel p-6 md:p-8 lg:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-pink to-neon-purple" />
            <div className="absolute -top-16 md:-top-20 -right-16 md:-right-20 w-28 h-28 md:w-40 md:h-40 bg-neon-pink/20 rounded-full blur-[50px] md:blur-[80px]" />
            <div className="absolute -bottom-16 md:-bottom-20 -left-16 md:-left-20 w-28 h-28 md:w-40 md:h-40 bg-neon-purple/20 rounded-full blur-[50px] md:blur-[80px]" />
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4 relative z-10">
              Ready to Start Hacking?
            </h2>
            <p className="text-muted-foreground mb-6 md:mb-8 max-w-lg mx-auto relative z-10 text-sm md:text-base px-4">
              Join thousands of ethical hackers who have already transformed their skills with Progression.
            </p>
            <button 
              onClick={() => onViewChange('signup')}
              className="btn-primary text-base md:text-lg px-8 md:px-10 py-3 md:py-4 relative z-10 cursor-pointer"
              type="button"
            >
              Create Free Account
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 md:py-8 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
          <div className="flex items-center gap-2 md:gap-3">
            <img src="/logo.png" alt="Progression" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
            <span className="text-white font-semibold text-sm md:text-base">Progression</span>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground">
            © 2024 Progression. All rights reserved.
          </p>
          <div className="flex gap-3 md:gap-4">
            <button 
              onClick={() => onViewChange('about')} 
              className="text-xs md:text-sm text-muted-foreground hover:text-white transition-colors cursor-pointer"
              type="button"
            >
              About
            </button>
            <button 
              onClick={() => onViewChange('login')} 
              className="text-xs md:text-sm text-muted-foreground hover:text-white transition-colors cursor-pointer"
              type="button"
            >
              Login
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
