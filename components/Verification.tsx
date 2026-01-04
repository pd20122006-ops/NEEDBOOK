
import React, { useState } from 'react';

interface VerificationProps {
  onVerify: () => void;
}

const Verification: React.FC<VerificationProps> = ({ onVerify }) => {
  const [email, setEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = () => {
    if (!email.includes('.edu')) {
      alert("Please use a valid .edu or institutional email!");
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      onVerify();
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-8 text-center space-y-6 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 flex items-center justify-center rounded-full">
        <i className="fas fa-university text-3xl text-blue-600 dark:text-blue-300"></i>
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Student Verification</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Join the network by verifying your university status. We only allow verified students to ensure a safe exchange.</p>
      </div>
      
      <div className="w-full space-y-4">
        <div className="text-left">
          <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Institutional Email</label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.name@university.edu"
            className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        
        <button 
          onClick={handleVerify}
          disabled={isVerifying}
          className="w-full bg-blue-600 dark:bg-blue-700 text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-blue-700 dark:hover:bg-blue-600 active:scale-95 transition disabled:opacity-50"
        >
          {isVerifying ? (
            <span className="flex items-center justify-center">
              <i className="fas fa-circle-notch fa-spin mr-2"></i> Verifying...
            </span>
          ) : "Send Verification Link"}
        </button>
      </div>

      <p className="text-[10px] text-gray-400 dark:text-gray-500 italic">
        NeedBook respects your privacy. We never share your institutional identity outside the app.
      </p>
    </div>
  );
};

export default Verification;
