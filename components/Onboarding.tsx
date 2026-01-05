
import React, { useState } from 'react';
import { UserProfile, Language } from '../types';
import { translations } from '../translations';
import Logo from './Logo';

interface OnboardingProps {
  onComplete: (profile: UserProfile, lang: Language) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0); 
  const [selectedLang, setSelectedLang] = useState<Language>('en');
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [city, setCity] = useState('');
  const [campus, setCampus] = useState('');

  const t = translations[selectedLang];

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifyingOtp(true);
    setTimeout(() => {
      setIsVerifyingOtp(false);
      setStep(3);
    }, 1000);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({ name, college, city, campus }, selectedLang);
  };

  const langOptions: { id: Language, label: string, sub: string }[] = [
    { id: 'en', label: 'English', sub: 'English' },
    { id: 'bn', label: 'বাংলা', sub: 'Bengali' },
    { id: 'hi', label: 'हिन्दी', sub: 'Hindi' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col p-8 animate-in fade-in duration-500">
      {/* Progress bar */}
      <div className="w-full h-1 bg-gray-50 dark:bg-gray-800 rounded-full mb-12 overflow-hidden">
        <div 
          className="h-full bg-blue-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]" 
          style={{ width: `${((step + 1) / 4) * 100}%` }}
        ></div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {step === 0 && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4">
            <div className="text-center space-y-4">
              <Logo size={80} variant="icon" className="mx-auto" />
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">Choose Language</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Select your preferred language to start sharing books.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {langOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => { setSelectedLang(opt.id); setStep(1); }}
                  className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:border-blue-500 rounded-3xl transition-all group hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="text-left">
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{opt.label}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">{opt.sub}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <i className="fas fa-chevron-right"></i>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4">
            <div className="text-center space-y-4">
              <Logo size={60} variant="icon" className="mx-auto" />
              <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">{t.welcome}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed px-4">{t.get_started}</p>
            </div>

            <form onSubmit={handleSendOtp} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t.phone_email}</label>
                <div className="relative">
                  <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="e.g. hello@campus.edu"
                    className="w-full p-4 pl-12 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl text-base focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 dark:bg-blue-700 text-white py-5 rounded-3xl font-black shadow-xl shadow-blue-600/20 hover:bg-blue-700 dark:hover:bg-blue-600 active:scale-95 transition-all"
              >
                {t.continue}
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right-4">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/40 rounded-[2.5rem] flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400">
                <i className="fas fa-shield-halved text-3xl"></i>
              </div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">Security Check</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Enter the 4-digit code sent to<br/><span className="font-black text-gray-900 dark:text-white">{contact}</span></p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-8">
              <div className="flex justify-center">
                <input
                  type="text"
                  maxLength={4}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="----"
                  className="w-48 text-center text-4xl tracking-[0.4em] font-black p-6 bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-[2rem] focus:border-solid focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
              </div>
              <div className="text-center">
                <button type="button" className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest hover:underline">Resend Code</button>
              </div>
              <button
                type="submit"
                disabled={otp.length < 4 || isVerifyingOtp}
                className="w-full bg-blue-600 dark:bg-blue-700 text-white py-5 rounded-3xl font-black shadow-xl active:scale-95 transition-all disabled:opacity-50"
              >
                {isVerifyingOtp ? <i className="fas fa-circle-notch fa-spin"></i> : 'Verify Account'}
              </button>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in slide-in-from-right-4">
            <div className="text-center space-y-3">
              <Logo size={50} variant="icon" className="mx-auto" />
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">Campus Identity</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 px-6 leading-relaxed">Let's finish your profile so classmates can find you.</p>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Thompson"
                  className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">University</label>
                <input
                  type="text"
                  required
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="e.g. Stanford University"
                  className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Palo Alto"
                    className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Campus (Opt)</label>
                  <input
                    type="text"
                    value={campus}
                    onChange={(e) => setCampus(e.target.value)}
                    placeholder="North"
                    className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-3xl flex items-start space-x-4 border border-blue-100 dark:border-blue-800/50">
                <div className="w-10 h-10 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                  <i className="fas fa-lock"></i>
                </div>
                <p className="text-[10px] text-blue-800 dark:text-blue-200 font-medium leading-relaxed">
                  We use an <span className="font-bold">Encrypted Trust Network</span>. Classmates only see your public campus profile.
                </p>
              </div>

              <button
                type="submit"
                disabled={!name || !college || !city}
                className="w-full bg-blue-600 dark:bg-blue-700 text-white py-5 rounded-3xl font-black shadow-xl hover:bg-blue-700 dark:hover:bg-blue-600 active:scale-95 transition-all disabled:opacity-50"
              >
                {t.join}
              </button>
            </form>
          </div>
        )}
      </div>
      
      <div className="mt-8 text-center flex flex-col items-center space-y-2">
        <Logo size={20} variant="full" className="opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" />
        <div className="flex items-center space-x-2">
          <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] font-black">Startup Program • Beta</p>
          <button onClick={() => setStep(0)} className="text-[9px] text-blue-500 font-black uppercase tracking-widest hover:underline">Change Language</button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
