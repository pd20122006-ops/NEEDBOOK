
import React, { useState } from 'react';
import { FeedbackData } from '../types';

interface FeedbackProps {
  recipientName: string;
  bookTitle: string;
  onSubmit: (data: FeedbackData) => void;
}

const Feedback: React.FC<FeedbackProps> = ({ recipientName, bookTitle, onSubmit }) => {
  const [stars, setStars] = useState(0);
  const [hoverStars, setHoverStars] = useState(0);
  const [reactions, setReactions] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const quickReactions = ['Helpful', 'On time', 'Friendly', 'Fair price', 'Great condition'];

  const toggleReaction = (reaction: string) => {
    setReactions(prev => 
      prev.includes(reaction) ? prev.filter(r => r !== reaction) : [...prev, reaction]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (stars === 0) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit({ stars, reactions, comment });
    }, 1200);
  };

  return (
    <div className="p-6 space-y-8 pb-24">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-check-circle text-3xl text-blue-600 dark:text-blue-400"></i>
        </div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white">Transaction Complete!</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          How was your experience with <span className="font-bold text-blue-600">{recipientName}</span> for <span className="italic">"{bookTitle}"</span>?
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl space-y-6">
        <div className="flex flex-col items-center space-y-3">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rate your experience</p>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoverStars(star)}
                onMouseLeave={() => setHoverStars(0)}
                onClick={() => setStars(star)}
                className="transition-transform active:scale-90"
              >
                <i className={`${
                  star <= (hoverStars || stars) ? 'fas text-yellow-400' : 'far text-gray-300'
                } fa-star text-3xl`}></i>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Quick Reactions</p>
          <div className="flex flex-wrap justify-center gap-2">
            {quickReactions.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => toggleReaction(r)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  reactions.includes(r)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Optional Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Help other students by sharing your experience..."
            maxLength={150}
            className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none h-24 transition-all"
          />
          <p className="text-[9px] text-right text-gray-400">{comment.length}/150</p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={stars === 0 || isSubmitting}
          className="w-full bg-blue-600 dark:bg-blue-700 text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 active:scale-95 transition-all disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <i className="fas fa-circle-notch fa-spin mr-2"></i> Submitting...
            </span>
          ) : 'Submit Feedback'}
        </button>
      </div>

      <button className="w-full text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest flex items-center justify-center py-2 hover:text-red-500 transition-colors">
        <i className="fas fa-flag mr-2"></i> Report an Issue
      </button>

      <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-2xl border border-green-100 dark:border-green-900/30 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0">
          <i className="fas fa-coins"></i>
        </div>
        <p className="text-xs text-green-800 dark:text-green-200 font-medium">
          Earn <span className="font-black">+5 points</span> for providing honest feedback to your fellow students!
        </p>
      </div>
    </div>
  );
};

export default Feedback;
