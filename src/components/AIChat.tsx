import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, Minimize2, Maximize2, Brain } from 'lucide-react';
import { store } from '@/lib/store';
import { generateStructuredResponse } from '@/lib/ai-responses';
import type { AIChatMessage } from '@/types';

interface AIChatProps {
  userId: string;
  isOpen: boolean;
  onToggle: () => void;
}

interface MessageWithThinking extends AIChatMessage {
  showThinking?: boolean;
}

export function AIChat({ userId, isOpen, onToggle }: AIChatProps) {
  const [messages, setMessages] = useState<MessageWithThinking[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentThinking, setCurrentThinking] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = store.getAIChatMessages(userId);
    if (saved.length === 0) {
      const welcome: MessageWithThinking = {
        id: 'welcome',
        userId,
        role: 'assistant',
        content: "Yo! I'm Little BON, your hacking assistant. Welcome to the dark side... just kidding! 😄\n\nAsk me anything about:\n• Ethical hacking & security\n• Our scripts and tools\n• How to get verified\n• Joining our communities\n• About BON JAC (our founder)\n\nWhat can I help you hack today?",
        timestamp: Date.now(),
      };
      store.addAIChatMessage(welcome);
      setMessages([welcome]);
    } else {
      setMessages(saved);
    }
  }, [userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentThinking]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: MessageWithThinking = {
      id: Date.now().toString(),
      userId,
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    store.addAIChatMessage(userMessage);
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setCurrentThinking('');

    // Generate AI response
    const { thinking, response } = generateStructuredResponse(userMessage.content);
    
    // Show thinking phase
    const thinkDelay = Math.min(300 + thinking.length * 10, 800);
    
    // Animate thinking text
    let thinkingIndex = 0;
    const thinkingInterval = setInterval(() => {
      if (thinkingIndex <= thinking.length) {
        setCurrentThinking(thinking.slice(0, thinkingIndex));
        thinkingIndex++;
      } else {
        clearInterval(thinkingInterval);
      }
    }, 20);

    setTimeout(() => {
      clearInterval(thinkingInterval);
      setCurrentThinking('');
      
      const aiResponse: MessageWithThinking = {
        id: (Date.now() + 1).toString(),
        userId,
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
        showThinking: true,
      };
      store.addAIChatMessage(aiResponse);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, thinkDelay + thinking.length * 20);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-neon-pink rounded-full animate-ping" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-neon-pink rounded-full" />
          
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-neon-pink/50 shadow-lg shadow-neon-pink/30 transition-transform group-hover:scale-110">
            <img 
              src="/ai-avatar.png" 
              alt="Little BON" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 rounded-lg glass-panel whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-sm text-white">Chat with Little BON</span>
          </div>
        </div>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop blur */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onToggle}
      />
      
      {/* Chat Window */}
      <div 
        className={`fixed right-4 z-50 transition-all duration-300 ${
          isMinimized 
            ? 'bottom-4 w-auto' 
            : 'bottom-4 w-[calc(100%-2rem)] max-w-[450px] md:max-w-[500px]'
        }`}
      >
        {isMinimized ? (
          <button
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl glass-panel border border-neon-pink/30 hover:border-neon-pink/50 transition-colors"
          >
            <img src="/ai-avatar.png" alt="Little BON" className="w-10 h-10 rounded-full" />
            <span className="text-white font-medium">Little BON</span>
            <Maximize2 className="w-4 h-4 text-muted-foreground" />
          </button>
        ) : (
          <div className="rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl shadow-neon-pink/10">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src="/ai-avatar.png" alt="Little BON" className="w-10 h-10 rounded-full" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Little BON</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-neon-pink" />
                    AI Hacking Assistant
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(true)}
                  className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <Minimize2 className="w-4 h-4 text-muted-foreground" />
                </button>
                <button 
                  onClick={onToggle}
                  className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[350px] md:h-[400px] overflow-y-auto p-4 space-y-4 scrollbar-thin bg-black/20">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'assistant' 
                      ? 'bg-gradient-to-br from-neon-pink to-neon-purple' 
                      : 'bg-white/10'
                  }`}>
                    {message.role === 'assistant' ? (
                      <Bot className="w-4 h-4 text-white" />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className={`max-w-[80%] ${
                    message.role === 'assistant'
                      ? 'bg-white/10 text-white rounded-2xl rounded-tl-sm'
                      : 'bg-gradient-to-r from-neon-pink to-neon-purple text-white rounded-2xl rounded-tr-sm'
                  }`}>
                    {message.role === 'assistant' && message.showThinking && (
                      <div className="px-3 py-1.5 border-b border-white/5 rounded-t-2xl bg-white/5">
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Brain className="w-3 h-3" />
                          Thinking...
                        </p>
                      </div>
                    )}
                    <div className="px-4 py-2.5 text-sm whitespace-pre-wrap">
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Live thinking indicator */}
              {isTyping && currentThinking && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white animate-pulse" />
                  </div>
                  <div className="max-w-[80%] px-4 py-2.5 rounded-2xl bg-white/10 rounded-tl-sm">
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                      <Brain className="w-3 h-3 animate-pulse" />
                      Thinking...
                    </p>
                    <p className="text-sm text-white/70 italic">{currentThinking}</p>
                  </div>
                </div>
              )}
              
              {/* Typing dots when waiting */}
              {isTyping && !currentThinking && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-white/10 rounded-tl-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/5 bg-black/20">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Little BON anything..."
                  disabled={isTyping}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-muted-foreground focus:outline-none focus:border-neon-pink/50 disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-center text-xs text-muted-foreground mt-2">
                Little BON AI • Created by BON JAC
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
