
import React from 'react';
import { BookRequest } from '../types';

interface HomeProps {
  requests: BookRequest[];
  onAction: (request: BookRequest) => void;
}

const Home: React.FC<HomeProps> = ({ requests, onAction }) => {
  return (
    <div className="p-4 space-y-4 pb-20">
      <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-xl p-4 mb-4">
        <h2 className="text-blue-800 dark:text-blue-200 font-semibold mb-1 text-base">Help a classmate today!</h2>
        <p className="text-blue-600 dark:text-blue-400 text-sm">There are {requests.length} students near you needing books for upcoming exams.</p>
      </div>

      <h3 className="font-bold text-gray-700 dark:text-gray-300 uppercase text-xs tracking-wider px-1">Urgent Requests Nearby</h3>
      
      {requests.map((req) => (
        <div key={req.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                req.urgency === 'High' ? 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400' : 'bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400'
              }`}>
                {req.urgency} Urgency
              </span>
              <h4 className="text-lg font-bold text-gray-800 dark:text-white mt-1.5 leading-tight">{req.title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">{req.subject} • {req.examType}</p>
            </div>
            <div className="text-right flex flex-col items-end shrink-0 ml-2">
              <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500">{req.distance}</p>
              <div className="flex items-center mt-1 text-[11px] text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-lg">
                <i className="fas fa-user-circle mr-1"></i>
                <span className="truncate max-w-[60px]">{req.requesterName}</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3 mb-4">
            <div className="w-24 h-32 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 shrink-0 shadow-md bg-gray-100 dark:bg-gray-900">
              {req.image ? (
                <img src={req.image} alt={req.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                  <i className="fas fa-book text-2xl"></i>
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col space-y-2 overflow-hidden">
              {req.note ? (
                <p className="text-[12px] text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 p-2.5 rounded-xl italic border border-gray-100 dark:border-gray-700 leading-relaxed line-clamp-3">
                  "{req.note}"
                </p>
              ) : (
                <div className="flex-1 flex items-center justify-center border border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Urgent Help Needed</span>
                </div>
              )}
              
              {(req.preferredLocation || req.preferredDate) && (
                <div className="text-[10px] text-blue-700 dark:text-blue-300 font-semibold bg-blue-50/50 dark:bg-blue-900/10 p-2 rounded-lg border border-blue-50 dark:border-blue-900/30">
                  <div className="flex items-center space-x-1 mb-1">
                    <i className="fas fa-map-marker-alt w-3"></i>
                    <span className="truncate">{req.preferredLocation || 'Campus Meeting'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <i className="fas fa-calendar-alt w-3"></i>
                    <span>{req.preferredDate || 'Flexible'} {req.preferredTime ? `@ ${req.preferredTime}` : ''}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => onAction(req)}
              className="flex items-center justify-center space-x-2 py-2.5 bg-blue-600 dark:bg-blue-700 text-white rounded-xl text-sm font-bold hover:bg-blue-700 dark:hover:bg-blue-600 shadow-sm active:scale-[0.98] transition-all"
            >
              <i className="fas fa-hand-holding-heart"></i>
              <span>Fulfill</span>
            </button>
            <button 
              onClick={() => onAction(req)}
              className="flex items-center justify-center space-x-2 py-2.5 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded-xl text-sm font-bold hover:bg-blue-50 dark:hover:bg-gray-700 active:scale-[0.98] transition-all"
            >
              <i className="fas fa-comment"></i>
              <span>Chat</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
