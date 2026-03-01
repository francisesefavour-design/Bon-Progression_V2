export interface AIResponse {
  thinking: string;
  response: string;
}

// BON JAC info for context
const BON_JAC_INFO = {
  name: 'BON JAC',
  birthDate: '2003/02/03',
  role: 'Founder & CEO of Progression',
  expertise: 'Cybersecurity, Ethical Hacking, Script Development',
  experience: '5+ years in cybersecurity',
};

// Thinking patterns for different query types
const thinkingPatterns = [
  "Let me think about this...",
  "Hmm, interesting question...",
  "Analyzing your query...",
  "Processing that...",
  "Let me break this down...",
  "Good question, let me consider...",
  "Thinking through this...",
  "Let me provide some insights...",
];

function getRandomThinking(): string {
  return thinkingPatterns[Math.floor(Math.random() * thinkingPatterns.length)];
}

function formatResponse(thinking: string, response: string): string {
  return `${thinking}\n\n${response}`;
}

export function generateAIResponse(input: string): string {
  const lower = input.toLowerCase().trim();
  
  // Greetings
  if (/^(hi|hello|hey|greetings|yo|sup|what's up|howdy)/.test(lower)) {
    const thinking = getRandomThinking();
    const greetings = [
      `Hey there! I'm Little BON, your hacking assistant. Ready to dive into some cyber knowledge?`,
      `Hello! Welcome to the dark side... just kidding! I'm Little BON. What can I help you hack today?`,
      `Yo! Little BON here. Ready to level up your hacking skills?`,
      `Hey! I'm Little BON, the AI assistant for Progression. How can I help you today?`,
    ];
    return formatResponse(thinking, greetings[Math.floor(Math.random() * greetings.length)]);
  }

  // About BON JAC specifically
  if (lower.includes('bon jac') || lower.includes('owner') || lower.includes('founder') || lower.includes('ceo')) {
    const thinking = "Let me tell you about our founder...";
    const response = `${BON_JAC_INFO.name} is the ${BON_JAC_INFO.role}. Born on ${BON_JAC_INFO.birthDate}, he's been in the cybersecurity game for over 5 years. His expertise spans ethical hacking, penetration testing, and script development. BON founded Progression to create an elite community of security researchers and hackers who share knowledge and tools. He's passionate about teaching others and building a supportive community for both beginners and experts in the field.`;
    return formatResponse(thinking, response);
  }

  // About BON's birthdate specifically
  if (lower.includes('born') || lower.includes('birthday') || lower.includes('birth date') || lower.includes('when was bon')) {
    const thinking = "Checking BON's details...";
    const response = `${BON_JAC_INFO.name} was born on ${BON_JAC_INFO.birthDate}. That makes him quite young to have achieved so much in cybersecurity! He's been building Progression and helping the community grow since his early twenties.`;
    return formatResponse(thinking, response);
  }

  // About Little BON AI
  if (lower.includes('who are you') || lower.includes('little bon') || lower.includes('about you') || lower.includes('what are you')) {
    const thinking = "Let me introduce myself...";
    const response = `I'm Little BON, the AI assistant for Progression! I was created by ${BON_JAC_INFO.name} (born ${BON_JAC_INFO.birthDate}) to help community members with:

• Ethical hacking questions
• Security research guidance
• Information about our scripts and tools
• Community navigation
• Learning resources

I try to be helpful, friendly, and knowledgeable about all things cybersecurity. Think of me as your personal hacking companion!`;
    return formatResponse(thinking, response);
  }

  // About Progression
  if (lower.includes('progression') || lower.includes('platform') || lower.includes('community') || lower.includes('this site')) {
    const thinking = "Let me explain what Progression is about...";
    const response = `Progression is an elite hacking community founded by ${BON_JAC_INFO.name}. We focus on:

🛡️ Ethical hacking & penetration testing
🔍 Security research & vulnerability analysis
📜 Script development for security professionals
👥 Community knowledge sharing
📚 Learning resources for all skill levels

Our mission is to help members grow their cybersecurity skills in a supportive environment. We welcome everyone from complete beginners to seasoned experts!`;
    return formatResponse(thinking, response);
  }

  // Scripts / Tools
  if (lower.includes('script') || lower.includes('tool') || lower.includes('software') || lower.includes('program') || lower.includes('download')) {
    const thinking = "Let me check our available tools...";
    const response = `Our premium scripts include:

🔹 MOD Script v2.5 - Advanced penetration testing framework
🔹 Network Scanner Pro - Automated vulnerability detection
🔹 Exploit Kit - Proof-of-concept security research tools
🔹 Crypto Analyzer - Blockchain security auditing

To access these, you need to link your verified script account. Go to the Script tab in your dashboard to get started! Only verified members get access to our exclusive script repository.`;
    return formatResponse(thinking, response);
  }

  // Hacking / Security topics
  if (lower.includes('hack') || lower.includes('security') || lower.includes('penetration') || lower.includes('pentest') || lower.includes('cyber')) {
    const thinking = "Good question about security...";
    const response = `Hacking is about understanding systems, not breaking them illegally. Key areas we cover:

🛡️ Network Security - Protecting infrastructure
🔍 OSINT - Open source intelligence gathering
💉 SQL Injection - Understanding database vulnerabilities
🌐 Web Exploitation - Finding and fixing web app flaws
📱 Mobile Security - iOS/Android penetration testing

Remember: With great power comes great responsibility. Always hack ethically and only on systems you have permission to test!`;
    return formatResponse(thinking, response);
  }

  // Verification / Linking
  if (lower.includes('verify') || lower.includes('link') || lower.includes('verified') || lower.includes('access') || lower.includes('premium')) {
    const thinking = "Let me explain the verification process...";
    const response = `To get verified and access premium scripts:

1. Sign up for a Progression account
2. Go to the Script tab in your dashboard
3. Enter your script credentials (the ones BON provided)
4. Once linked, you'll see a ✓ Verified badge
5. Download and use our premium hacking tools!

Only verified members get access to our exclusive script repository. If you don't have script credentials yet, contact BON JAC at ceo@gmail.com.`;
    return formatResponse(thinking, response);
  }

  // Groups / Community
  if (lower.includes('group') || lower.includes('community') || lower.includes('whatsapp') || lower.includes('join') || lower.includes('chat')) {
    const thinking = "Let me tell you about our groups...";
    const response = `We have 3 exclusive hacking communities:

📱 Progress Bar (1250+ members) - Main discussion group
💰 Cyber Wealth (890+ members) - Monetization strategies
🔒 Private Group Chat (450+ members) - Elite members only

Click any group card on your dashboard to join. These are where we share:
• Zero-day discoveries
• Security advisories
• Tool recommendations
• Live hacking sessions
• Tips and tricks from BON himself`;
    return formatResponse(thinking, response);
  }

  // Learning / Beginner
  if (lower.includes('beginner') || lower.includes('start') || lower.includes('learn') || lower.includes('new') || lower.includes('noob')) {
    const thinking = "Great question for getting started...";
    const response = `New to hacking? Here's your roadmap:

📚 Phase 1: Fundamentals
   - Learn Linux (Kali, Parrot OS)
   - Networking basics (TCP/IP, protocols)
   - Programming (Python, Bash)

🔧 Phase 2: Tools
   - Nmap for scanning
   - Metasploit for exploitation
   - Burp Suite for web testing

🎯 Phase 3: Practice
   - TryHackMe platforms
   - Hack The Box challenges
   - Bug bounty programs

Join our WhatsApp groups to learn from experienced hackers! BON JAC often shares learning resources there too.`;
    return formatResponse(thinking, response);
  }

  // Cryptocurrency / Blockchain
  if (lower.includes('crypto') || lower.includes('bitcoin') || lower.includes('eth') || lower.includes('blockchain') || lower.includes('btc')) {
    const thinking = "Let me share about blockchain security...";
    const response = `Blockchain security is crucial:

⛓️ Smart Contract Auditing - Finding vulnerabilities in DeFi
🪙 Wallet Security - Protecting private keys
📊 Exchange Analysis - Detecting suspicious patterns

Our Crypto Signal Pro script helps analyze blockchain transactions for anomalies. Great for security researchers! We also discuss crypto security in our Cyber Wealth group.`;
    return formatResponse(thinking, response);
  }

  // Network / WiFi
  if (lower.includes('wifi') || lower.includes('network') || lower.includes('router') || lower.includes('wireless') || lower.includes('nmap')) {
    const thinking = "Network security is a key topic...";
    const response = `Network security essentials:

📡 WiFi Security:
   - WPA2/WPA3 encryption analysis
   - Rogue access point detection
   - Packet sniffing techniques

🌐 Network Scanning:
   - Port enumeration with Nmap
   - Service version detection
   - Vulnerability mapping

Our Network Scanner Pro automates much of this process for you! It's one of our most popular tools.`;
    return formatResponse(thinking, response);
  }

  // Web / SQL / XSS
  if (lower.includes('sql') || lower.includes('xss') || lower.includes('injection') || lower.includes('web') || lower.includes('burp')) {
    const thinking = "Web vulnerabilities are important to understand...";
    const response = `Web application vulnerabilities:

💉 SQL Injection:
   ' OR '1'='1' -- classic bypass
   Union-based data extraction
   Blind SQLi for boolean-based attacks

📝 XSS (Cross-Site Scripting):
   <script>alert('XSS')</script>
   Stored vs Reflected vs DOM-based

🔓 Other common flaws:
   - IDOR (Insecure Direct Object References)
   - CSRF (Cross-Site Request Forgery)
   - SSRF (Server-Side Request Forgery)

Always test with permission! We cover these in detail in our groups.`;
    return formatResponse(thinking, response);
  }

  // Contact / Email
  if (lower.includes('contact') || lower.includes('email') || lower.includes('reach') || lower.includes('message bon')) {
    const thinking = "Let me give you the contact info...";
    const response = `You can reach ${BON_JAC_INFO.name} at:

📧 Email: ceo@gmail.com

He's usually pretty responsive! You can also connect with him through our WhatsApp groups. BON is active in the community and loves helping members with their questions.`;
    return formatResponse(thinking, response);
  }

  // Membership / Records
  if (lower.includes('membership') || lower.includes('record') || lower.includes('rank') || lower.includes('leaderboard')) {
    const thinking = "Let me explain our membership system...";
    const response = `Our Membership Records recognize outstanding community members in categories like:

🏆 Most Active - Highest participation rate
😄 Most Funny - Always making us laugh
❤️ Most Humble - Kind and helpful to all
⭐ Special Members - Distinguished contributors
🐢 Slow Workers - Taking their time (affectionately!)

Check the Membership Records page to see who's been recognized. BON JAC updates these regularly based on community activity!`;
    return formatResponse(thinking, response);
  }

  // Dashboard / Navigation
  if (lower.includes('dashboard') || lower.includes('navigate') || lower.includes('where is') || lower.includes('how do i find')) {
    const thinking = "Let me help you navigate...";
    const response = `Your dashboard has several sections:

📊 Main Dashboard - Overview, announcements, groups
📜 Script Tab - Link your script account, access tools
🏆 Membership Records - See recognized members
👤 Profile - Your account settings

Use the menu button (☰) to navigate between sections. Everything is designed to be easy to find!`;
    return formatResponse(thinking, response);
  }

  // Password / Account issues
  if (lower.includes('password') || lower.includes('forgot') || lower.includes('reset') || lower.includes('account')) {
    const thinking = "Account-related question...";
    const response = `For password or account issues:

1. Check the Settings page (coming soon!) for password changes
2. If you're locked out, contact BON JAC at ceo@gmail.com
3. Make sure you're using the correct email address

We recommend using a strong, unique password for your Progression account. Security first! 🔒`;
    return formatResponse(thinking, response);
  }

  // Help / Commands
  if (lower.includes('help') || lower.includes('what can you do') || lower.includes('command') || lower.includes('assist')) {
    const thinking = "Let me tell you what I can help with...";
    const response = `I can help you with:

🤖 General Questions - About BON JAC, Progression, community
📜 Scripts & Tools - Info about our hacking tools
🔐 Security Topics - Ethical hacking, penetration testing
✅ Verification - How to link your script account
👥 Groups - Community info and how to join
📚 Learning - Resources for beginners
💰 Crypto - Blockchain security topics
🌐 Networks - WiFi, network security
🌐 Web Hacking - SQLi, XSS, web vulnerabilities

Just ask me anything about hacking! I'm here to help 24/7.`;
    return formatResponse(thinking, response);
  }

  // Jokes / Fun
  if (lower.includes('joke') || lower.includes('funny') || lower.includes('laugh') || lower.includes('humor')) {
    const thinking = "Let me think of something funny...";
    const jokes = [
      `Why do programmers prefer dark mode? Because light attracts bugs! 😄`,
      `What's a hacker's favorite drink? Root beer! 🍺`,
      `Why did the hacker cross the road? To get to the other site! 🌐`,
      `How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡`,
      `Why was the computer cold? It left its Windows open! 🪟`,
    ];
    return formatResponse(thinking, jokes[Math.floor(Math.random() * jokes.length)]);
  }

  // Thanks
  if (lower.includes('thank') || lower.includes('thanks') || lower.includes('appreciate') || lower.includes('grateful')) {
    const thinking = "You're welcome!";
    const thanks = [
      `You're welcome! Happy hacking! 🎯`,
      `No problem! Stay curious and keep learning! 🔥`,
      `Anytime! That's what I'm here for. 💻`,
      `Glad I could help! Go break some stuff (ethically)! 😄`,
      `My pleasure! BON JAC built me to be helpful. 🤖`,
    ];
    return formatResponse(thinking, thanks[Math.floor(Math.random() * thanks.length)]);
  }

  // Bye
  if (lower.includes('bye') || lower.includes('goodbye') || lower.includes('see you') || lower.includes('cya') || lower.includes('later')) {
    const thinking = "Time to say goodbye...";
    const goodbyes = [
      `Catch you later! Stay safe out there in the cyber world! 🛡️`,
      `Peace! Remember to always hack ethically! ✌️`,
      `Later! Come back if you need more hacking knowledge! 💻`,
      `Goodbye! Keep learning and growing! 🚀`,
    ];
    return formatResponse(thinking, goodbyes[Math.floor(Math.random() * goodbyes.length)]);
  }

  // How are you
  if (lower.includes('how are you') || lower.includes('how you doing') || lower.includes('what\'s up')) {
    const thinking = "I'm doing well, thanks for asking!";
    const response = `I'm doing great, thanks for asking! Always ready to help with hacking questions. How are you doing today? Learning anything new in cybersecurity?`;
    return formatResponse(thinking, response);
  }

  // Time / Date
  if (lower.includes('time') || lower.includes('date') || lower.includes('today')) {
    const thinking = "Let me check...";
    const now = new Date();
    const response = `It's currently ${now.toLocaleTimeString()} on ${now.toLocaleDateString()}. Time to hack! Or... time to learn about hacking. Both are good options! 😄`;
    return formatResponse(thinking, response);
  }

  // Default fallback with context
  const thinking = `Let me think about "${input}"...`;
  const response = `That's an interesting question about "${input}"! 

While I don't have specific info on that, I can tell you that Progression focuses on:

• Ethical hacking & penetration testing
• Security research & vulnerability analysis
• Script development for security professionals
• Community knowledge sharing

Try asking me about:
- Our hacking scripts and tools
- How to get verified
- Joining our communities
- Learning resources for beginners
- About BON JAC (born 2003/02/03)

Or contact BON directly at ceo@gmail.com for specific inquiries!`;
  return formatResponse(thinking, response);
}

// Export a function that returns structured response for advanced UI
export function generateStructuredResponse(input: string): AIResponse {
  const fullResponse = generateAIResponse(input);
  const parts = fullResponse.split('\n\n');
  
  if (parts.length >= 2) {
    return {
      thinking: parts[0],
      response: parts.slice(1).join('\n\n'),
    };
  }
  
  return {
    thinking: getRandomThinking(),
    response: fullResponse,
  };
}
