
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [city, setCity] = useState('');
  const [campus, setCampus] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate OTP Send
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
    onComplete({ name, college, city, campus });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col p-8 animate-in fade-in duration-500">
      {/* Progress bar */}
      <div className="w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-full mb-12 overflow-hidden">
        <div 
          className="h-full bg-blue-600 transition-all duration-500 ease-out" 
          style={{ width: `${(step / 3) * 100}%` }}
        ></div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4">
            <div className="text-center space-y-3">
              <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto text-white shadow-xl rotate-3">
                <i className="fas fa-book-reader text-4xl"></i>
              </div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">Welcome!</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Let's get you started in under a minute 🎉</p>
            </div>

            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone or Email</label>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="e.g. +1 234 567 890"
                  className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-base focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 dark:bg-blue-700 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 active:scale-95 transition-all"
              >
                Get Started
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400">
                <i className="fas fa-shield-alt text-2xl"></i>
              </div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">Check your messages</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">We sent a 4-digit code to {contact}</p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="flex justify-center space-x-3">
                <input
                  type="text"
                  maxLength={4}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="0000"
                  className="w-32 text-center text-2xl tracking-[0.5em] font-black p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="text-center">
                <button type="button" className="text-xs font-bold text-blue-600 uppercase tracking-widest">Resend Code</button>
              </div>
              <button
                type="submit"
                disabled={otp.length < 4 || isVerifyingOtp}
                className="w-full bg-blue-600 dark:bg-blue-700 text-white py-4 rounded-2xl font-black shadow-lg active:scale-95 transition-all disabled:opacity-50"
              >
                {isVerifyingOtp ? <i className="fas fa-circle-notch fa-spin"></i> : 'Verify'}
              </button>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">Almost there! 🎓</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Just a few details to connect you with your classmates.</p>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Thompson"
                  className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">University Name</label>
                <input
                  type="text"
                  required
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="e.g. Stanford University"
                  className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <p className="text-[9px] text-blue-500 font-medium">Matching you with nearby students!</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Palo Alto"
                    className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest text-gray-300">Campus (Opt)</label>
                  <input
                    type="text"
                    value={campus}
                    onChange={(e) => setCampus(e.target.value)}
                    placeholder="North"
                    className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl flex items-start space-x-3">
                <i className="fas fa-user-lock text-blue-500 mt-1"></i>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  We only show your <span className="font-bold">name and college</span>. Your contact details and address are never shared without your permission.
                </p>
              </div>

              <button
                type="submit"
                disabled={!name || !college || !city}
                className="w-full bg-blue-600 dark:bg-blue-700 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 active:scale-95 transition-all disabled:opacity-50"
              >
                Join the Community
              </button>
            </form>
          </div>
        )}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">NeedBook • Peer to Peer Education</p>
      </div>
    </div>
  );
};

export default Onboarding;
