
import React, { useState, useEffect } from 'react';
import { ExchangeMode, BookCondition } from '../types';
import { getFairPriceSuggestion } from '../services/geminiService';

interface ListingFormProps {
  onPost: (data: any) => void;
}

const ListingForm: React.FC<ListingFormProps> = ({ onPost }) => {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState<ExchangeMode | null>(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [subject, setSubject] = useState('');
  const [condition, setCondition] = useState<BookCondition>('Good');
  const [mrp, setMrp] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [aiSuggestion, setAiSuggestion] = useState<{ suggestedPrice: number, advice: string } | null>(null);
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);

  useEffect(() => {
    if (step === 3 && mode === 'Buy' && mrp && Number(mrp) > 0) {
      const timer = setTimeout(async () => {
        setLoadingSuggestion(true);
        const suggestion = await getFairPriceSuggestion(Number(mrp), condition, title);
        setAiSuggestion(suggestion);
        setPrice(suggestion.suggestedPrice.toString());
        setLoadingSuggestion(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [mrp, condition, step, mode]);

  const conditions: { label: BookCondition, desc: string }[] = [
    { label: 'New', desc: 'Unopened / Pristine' },
    { label: 'Good', desc: 'Minimal wear' },
    { label: 'Used', desc: 'Visible wear' },
    { label: 'Highlighted', desc: 'Notes/Markings' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPost({
      title,
      author,
      subject,
      condition,
      mode: mode === 'Buy' ? 'Buy' : 'Donate',
      mrp: Number(mrp),
      price: mode === 'Buy' ? Number(price) : 0,
      image: 'https://images.unsplash.com/photo-1544640808-32ca72ac7f67?auto=format&fit=crop&q=80&w=400' // Placeholder for UI
    });
  };

  if (step === 1) {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">Listing Assistant</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Hey there! Ready to clear your shelf? Choose how you want to help a fellow student.</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => { setMode('Buy'); setStep(2); }}
            className="group relative bg-white dark:bg-gray-800 p-6 rounded-3xl border-2 border-transparent hover:border-blue-500 shadow-sm hover:shadow-xl transition-all text-left overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <i className="fas fa-tags text-6xl text-blue-600"></i>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                <i className="fas fa-dollar-sign text-xl"></i>
              </div>
              <div>
                <h4 className="font-black text-gray-900 dark:text-white">Sell Book</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Recover costs at a student-friendly price.</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => { setMode('Donate'); setStep(2); }}
            className="group relative bg-white dark:bg-gray-800 p-6 rounded-3xl border-2 border-transparent hover:border-green-500 shadow-sm hover:shadow-xl transition-all text-left overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <i className="fas fa-gift text-6xl text-green-600"></i>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400">
                <i className="fas fa-heart text-xl"></i>
              </div>
              <div>
                <h4 className="font-black text-gray-900 dark:text-white">Donate Book</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Give back to the campus community.</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 pb-24">
      <div className="flex items-center space-x-2">
        <button onClick={() => setStep(step - 1)} className="text-gray-400 p-2"><i className="fas fa-arrow-left"></i></button>
        <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Step {step - 1} of 2</span>
      </div>

      {step === 2 && (
        <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Book Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Modern Physics"
              className="w-full p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Author Name</label>
            <input
              type="text"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. Richard Feynman"
              className="w-full p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Subject / Course</label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. PHY201"
              className="w-full p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Condition</label>
            <div className="grid grid-cols-2 gap-3">
              {conditions.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => setCondition(c.label)}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    condition === c.label 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800'
                  }`}
                >
                  <p className={`text-sm font-bold ${condition === c.label ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>{c.label}</p>
                  <p className="text-[10px] text-gray-400">{c.desc}</p>
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => setStep(3)}
            disabled={!title || !author}
            className="w-full bg-blue-600 dark:bg-blue-700 text-white py-4 rounded-2xl font-black shadow-lg active:scale-95 transition-all disabled:opacity-50"
          >
            Continue
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
          {mode === 'Buy' ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">MRP (Original)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-4 text-gray-400">$</span>
                    <input
                      type="number"
                      value={mrp}
                      onChange={(e) => setMrp(e.target.value)}
                      placeholder="800"
                      className="w-full p-4 pl-8 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Selling Price (AI SET)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-4 text-blue-600 dark:text-blue-400">$</span>
                    <input
                      type="number"
                      value={price}
                      readOnly
                      placeholder="Calculated..."
                      className="w-full p-4 pl-8 bg-gray-50 dark:bg-gray-900 border border-blue-100 dark:border-blue-900 rounded-2xl text-sm font-black text-blue-600 dark:text-blue-400 cursor-not-allowed outline-none"
                    />
                    <div className="absolute right-4 top-4">
                      <i className="fas fa-lock text-[10px] text-blue-300"></i>
                    </div>
                  </div>
                </div>
              </div>

              {loadingSuggestion ? (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-800 flex items-center space-x-3">
                  <i className="fas fa-circle-notch fa-spin text-blue-600"></i>
                  <p className="text-xs text-blue-600 font-bold animate-pulse">Assistant is calculating fair price...</p>
                </div>
              ) : aiSuggestion && (
                <div className="bg-blue-600 rounded-3xl p-5 text-white shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 group-hover:scale-110 transition-transform">
                    <i className="fas fa-robot text-6xl"></i>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                      <i className="fas fa-magic"></i>
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-xs font-black uppercase tracking-widest opacity-80">AI Fair Price Tag</h5>
                      <p className="text-sm font-bold leading-relaxed">{aiSuggestion.advice}</p>
                      <div className="pt-2">
                         <span className="bg-white text-blue-600 text-[10px] font-black px-2 py-1 rounded-full uppercase">Locked: ${aiSuggestion.suggestedPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <p className="text-[10px] text-center text-gray-400 font-medium px-4 leading-relaxed italic">
                Selling price is locked to the AI's recommendation to ensure fair campus trading and maintain the student trust score.
              </p>
            </div>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto text-green-600 dark:text-green-400">
                <i className="fas fa-gift text-4xl"></i>
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">Awesome Choice! 🎁</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed px-4">
                Thank you for donating! This book will be marked as <span className="text-green-600 font-bold uppercase">Free Donation</span> for students in urgent need.
              </p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={mode === 'Buy' && !price}
            className="w-full bg-blue-600 dark:bg-blue-700 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 active:scale-95 transition-all disabled:opacity-50"
          >
            {mode === 'Buy' ? 'List for Sale' : 'Post Free Donation'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ListingForm;
