
import React, { useState } from 'react';
import { BookListing, ExchangeMode } from '../types';

interface MatchedListingsProps {
  listings: BookListing[];
  onSelect: (listing: BookListing) => void;
}

const MatchedListings: React.FC<MatchedListingsProps> = ({ listings, onSelect }) => {
  const [filter, setFilter] = useState<ExchangeMode | 'All'>('All');

  const filtered = filter === 'All' 
    ? listings 
    : listings.filter(l => l.mode === filter);

  return (
    <div className="p-4 space-y-4 pb-24">
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {['All', 'Buy', 'Borrow', 'Exchange', 'Donate'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all border ${
              filter === f 
                ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105' 
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtered.map((l) => (
          <div 
            key={l.id} 
            className="flex bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all cursor-pointer group active:scale-[0.99]"
            onClick={() => onSelect(l)}
          >
            <div className="w-28 bg-gray-100 dark:bg-gray-900 shrink-0 border-r dark:border-gray-700 relative">
              <img src={l.image} alt={l.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm p-1">
                 <p className="text-[8px] text-white font-bold text-center uppercase tracking-tighter">Verified Seller</p>
              </div>
            </div>
            <div className="flex-1 p-3 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm leading-tight line-clamp-2">{l.title}</h4>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded border uppercase ${
                    l.mode === 'Buy' ? 'text-green-600 border-green-200 bg-green-50 dark:bg-green-900/20' :
                    l.mode === 'Borrow' ? 'text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-900/20' :
                    l.mode === 'Donate' ? 'text-purple-600 border-purple-200 bg-purple-50 dark:bg-purple-900/20' :
                    'text-orange-600 border-orange-200 bg-orange-50 dark:bg-orange-900/20'
                  }`}>
                    {l.mode}
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">• {l.subject}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-[10px] font-bold text-blue-600 dark:text-blue-300 border border-white dark:border-gray-700">
                    {l.ownerName[0]}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span className="text-[11px] font-bold text-gray-700 dark:text-gray-200">{l.ownerName}</span>
                      {l.isVerified && <i className="fas fa-check-circle text-blue-500 dark:text-blue-400 text-[10px] ml-1"></i>}
                    </div>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500">{l.distance} away from you</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t dark:border-gray-700">
                  <span className="text-sm font-black text-gray-900 dark:text-white">
                    {l.mode === 'Buy' ? `$${l.price}` : <span className="text-blue-600 dark:text-blue-400 font-bold uppercase text-[10px]">Student Share</span>}
                  </span>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    <span>Chat Now</span>
                    <i className="fas fa-chevron-right ml-1"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <i className="fas fa-book-open text-4xl text-gray-200 dark:text-gray-700 mb-4"></i>
          <p className="text-gray-400 dark:text-gray-500 text-sm">No {filter.toLowerCase()} matches nearby yet.</p>
        </div>
      )}
    </div>
  );
};

export default MatchedListings;
