
import React, { useState, useEffect, useRef } from 'react';
import { getBuddyResponse } from '../services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

const Buddy: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'start', role: 'model', text: "Hey! I'm Buddy, your coordination assistant. 📚 Ready to help you arrange a safe and quick book handover on campus. How can I help?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const suggestionChips = [
    "Safe meeting spots?",
    "Handover tips",
    "Sharing contact info?",
    "Verify student ID"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || isTyping) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: messageText };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await getBuddyResponse(messageText, history);
    
    setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', text: responseText }]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-blue-50/30 dark:bg-gray-900 transition-colors duration-200">
      <div className="bg-white dark:bg-gray-800 p-4 border-b dark:border-gray-700 flex items-center space-x-3 shadow-sm z-10">
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
          <i className="fas fa-handshake text-xl"></i>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white">Buddy</h4>
          <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">AI Coordination Assistant</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
              m.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-700 rounded-bl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-bl-none border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggestion Chips */}
      <div className="px-4 py-2 flex space-x-2 overflow-x-auto scrollbar-hide border-t dark:border-gray-800 bg-white/50 dark:bg-gray-900/50">
        {suggestionChips.map((chip) => (
          <button
            key={chip}
            onClick={() => handleSend(chip)}
            className="whitespace-nowrap px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-900 bg-white dark:bg-gray-800 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
          >
            {chip}
          </button>
        ))}
      </div>

      <div className="p-4 bg-white dark:bg-gray-800 flex space-x-2 items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask Buddy to help coordinate..."
          className="flex-1 bg-gray-100 dark:bg-gray-700 border-none rounded-full px-5 py-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
        <button 
          onClick={() => handleSend()}
          disabled={isTyping || !input.trim()}
          className="w-11 h-11 bg-blue-600 dark:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all disabled:opacity-50"
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default Buddy;
