
import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';

interface ChatProps {
  recipientName: string;
  bookTitle: string;
  bookImage?: string;
  onComplete?: () => void;
}

const Chat: React.FC<ChatProps> = ({ recipientName, bookTitle, bookImage, onComplete }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', senderId: 'other', text: `Hi! I saw your request for ${bookTitle}. I have a copy you can borrow.`, timestamp: new Date() },
    { id: '2', senderId: 'me', text: "That would be amazing! When can we meet?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      text: input,
      timestamp: new Date()
    };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="bg-white dark:bg-gray-800 p-3 border-b dark:border-gray-700 flex items-center justify-between sticky top-0 z-10 transition-colors duration-200 shadow-sm">
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold border-2 border-white dark:border-gray-700 shadow-sm">
              {recipientName[0]}
            </div>
            {bookImage && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-md border-2 border-white dark:border-gray-800 overflow-hidden shadow-sm bg-gray-200">
                <img src={bookImage} alt="Book" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          <div className="overflow-hidden">
            <h4 className="font-bold text-sm text-gray-900 dark:text-white truncate">{recipientName}</h4>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">Book: {bookTitle}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
           <button 
            onClick={onComplete}
            className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-bold px-2 py-1.5 rounded-lg border border-green-200 dark:border-green-800 flex items-center"
           >
             <i className="fas fa-check mr-1"></i> Done
           </button>
           <button className="text-blue-600 dark:text-blue-400 shrink-0"><i className="fas fa-info-circle"></i></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              m.senderId === 'me' ? 'bg-blue-600 dark:bg-blue-700 text-white rounded-br-none' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-700 rounded-bl-none shadow-sm'
            }`}>
              {m.text}
              <div className={`text-[9px] mt-1 ${m.senderId === 'me' ? 'text-blue-200 dark:text-blue-300' : 'text-gray-400'}`}>
                {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700 flex space-x-2 items-center transition-colors duration-200">
        <button className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"><i className="fas fa-paperclip"></i></button>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="flex-1 bg-gray-100 dark:bg-gray-700 border-none rounded-full px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button 
          onClick={handleSend}
          className="w-10 h-10 bg-blue-600 dark:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition"
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default Chat;
