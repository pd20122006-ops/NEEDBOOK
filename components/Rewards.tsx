
import React from 'react';
import { UserStats, UserTag } from '../types';

interface RewardsProps {
  stats: UserStats;
}

const Rewards: React.FC<RewardsProps> = ({ stats }) => {
  const tags: { name: UserTag, min: number, color: string }[] = [
    { name: 'Book Starter', min: 0, color: 'bg-green-500' },
    { name: 'Helpful Reader', min: 51, color: 'bg-blue-500' },
    { name: 'Campus Contributor', min: 151, color: 'bg-purple-500' },
    { name: 'Study Hero', min: 301, color: 'bg-orange-500' },
    { name: 'Book Champion', min: 501, color: 'bg-yellow-500' },
  ];

  const currentTagIndex = tags.findIndex(t => t.name === stats.tag);
  const nextTag = tags[currentTagIndex + 1];
  const progress = nextTag ? ((stats.points - tags[currentTagIndex].min) / (nextTag.min - tags[currentTagIndex].min)) * 100 : 100;

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Your Status</p>
            <h2 className="text-3xl font-black mb-1">{stats.tag}</h2>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">{stats.points}</span>
              <span className="text-blue-300 text-sm font-medium">Points Earned</span>
            </div>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
            <i className="fas fa-award text-3xl"></i>
          </div>
        </div>

        {nextTag && (
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-tight text-blue-100">
              <span>Next: {nextTag.name}</span>
              <span>{nextTag.min - stats.points} pts left</span>
            </div>
            <div className="w-full h-2 bg-blue-900/40 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-1000 ease-out" 
                style={{ width: `${Math.min(100, progress)}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard icon="fa-exchange-alt" label="Exchanges" value={stats.successfulExchanges} color="text-green-500" />
        <StatCard icon="fa-hand-holding-heart" label="Lent Out" value={stats.booksLent} color="text-blue-500" />
        <StatCard icon="fa-gift" label="Donated" value={stats.booksDonated} color="text-purple-500" />
        <StatCard icon="fa-star" label="Feedback" value="4.9" color="text-yellow-500" />
      </div>

      <div className="space-y-3">
        <h3 className="font-bold text-gray-700 dark:text-gray-300 uppercase text-xs tracking-wider px-1">How to earn points</h3>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 divide-y dark:divide-gray-700 overflow-hidden">
          <RewardRow icon="fa-book" label="List an academic book" pts="+10" />
          <RewardRow icon="fa-check-circle" label="Successful exchange" pts="+15" />
          <RewardRow icon="fa-handshake" label="Lend a book" pts="+20" />
          <RewardRow icon="fa-heart" label="Donate a book" pts="+30" />
          <RewardRow icon="fa-bolt" label="Fast response" pts="+5" />
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-800 flex items-start space-x-3">
        <div className="shrink-0 text-blue-600 dark:text-blue-400 mt-1">
          <i className="fas fa-info-circle"></i>
        </div>
        <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed font-medium">
          Points and tags help build trust within our student network. Higher statuses get priority for urgent requests and early access to new campus features!
        </p>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: string, label: string, value: string | number, color: string }> = ({ icon, label, value, color }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center text-center">
    <div className={`w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center mb-2 ${color}`}>
      <i className={`fas ${icon}`}></i>
    </div>
    <span className="text-lg font-black text-gray-900 dark:text-white leading-none">{value}</span>
    <span className="text-[10px] font-bold text-gray-400 uppercase mt-1">{label}</span>
  </div>
);

const RewardRow: React.FC<{ icon: string, label: string, pts: string }> = ({ icon, label, pts }) => (
  <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
        <i className={`fas ${icon} text-sm`}></i>
      </div>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
    </div>
    <span className="text-xs font-black text-blue-600 dark:text-blue-400">{pts} pts</span>
  </div>
);

export default Rewards;
