
import React, { useState, useRef } from 'react';
import { UrgencyLevel } from '../types';
import { getBookSuggestions } from '../services/geminiService';

interface RequestFormProps {
  onPost: (data: any) => void;
}

const RequestForm: React.FC<RequestFormProps> = ({ onPost }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [examType, setExamType] = useState('Finals');
  const [urgency, setUrgency] = useState<UrgencyLevel>('Medium');
  const [note, setNote] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [preferredLocation, setPreferredLocation] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [additionalContactNumber, setAdditionalContactNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTitleBlur = async () => {
    if (title.length > 5) {
      setLoadingSuggestions(true);
      const data = await getBookSuggestions(title);
      if (data.subjects) setSuggestions(data.subjects);
      setLoadingSuggestions(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      setError('Please provide a photo of the book to help other students identify it.');
      return;
    }
    onPost({ 
      title, 
      subject, 
      examType, 
      urgency, 
      note, 
      image,
      preferredDate,
      preferredTime,
      preferredLocation,
      contactNumber,
      additionalContactNumber
    });
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4 pb-10">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Book Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleBlur}
            placeholder="e.g. Campbell Biology"
            className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Subject <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {suggestions.map(s => (
              <button 
                type="button"
                key={s} 
                onClick={() => setSubject(s)}
                className={`text-xs px-2 py-1 rounded-full border transition-colors ${subject === s ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900'}`}
              >
                {s}
              </button>
            ))}
            {loadingSuggestions && <span className="text-xs text-gray-400 animate-pulse">Analyzing...</span>}
          </div>
          <input
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Life Sciences"
            className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Book Photo <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 flex flex-col space-y-2">
            {!image ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`w-full h-40 flex flex-col items-center justify-center border-2 border-dashed rounded-xl transition-colors bg-gray-50 dark:bg-gray-800/50 ${
                  error ? 'border-red-400 bg-red-50 dark:bg-red-900/10' : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400'
                }`}
              >
                <i className={`fas fa-camera text-3xl mb-2 ${error ? 'text-red-400' : 'text-gray-400'}`}></i>
                <span className={`text-sm font-medium ${error ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>Upload Book Cover</span>
                <p className="text-[10px] text-gray-400 mt-1 italic">Required for verification</p>
              </button>
            ) : (
              <div className="relative w-full h-56 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-inner bg-gray-100 dark:bg-gray-900">
                <img src={image} alt="Preview" className="w-full h-full object-contain" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3 right-3 w-10 h-10 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 backdrop-blur-sm transition-colors"
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            {error && (
              <p className="text-xs text-red-500 font-semibold animate-pulse">
                <i className="fas fa-exclamation-circle mr-1"></i>
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Coordination Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-800 space-y-3">
          <h4 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center">
            <i className="fas fa-map-marker-alt mr-2"></i> Coordination Details
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase">Date</label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase">Time</label>
              <input
                type="time"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase">On-Campus Handover Spot</label>
            <input
              type="text"
              value={preferredLocation}
              onChange={(e) => setPreferredLocation(e.target.value)}
              placeholder="e.g. Library Entrance, Cafe Central"
              className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-3">
          <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center">
            <i className="fas fa-phone-alt mr-2"></i> Private Contact Details
          </h4>
          <div className="space-y-3">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase">Contact No.</label>
              <input
                type="tel"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase">Additional Contact No.</label>
              <input
                type="tel"
                value={additionalContactNumber}
                onChange={(e) => setAdditionalContactNumber(e.target.value)}
                placeholder="Alternate phone number"
                className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <p className="text-[9px] text-gray-400 italic">These will only be shared with students you choose to coordinate with.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Exam Type</label>
            <select
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
            >
              <option>Midterms</option>
              <option>Finals</option>
              <option>Homework</option>
              <option>Research</option>
              <option>Semester</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Urgency</label>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value as UrgencyLevel)}
              className={`w-full p-3 border rounded-xl focus:ring-2 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors ${
                urgency === 'High' ? 'border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500'
              }`}
            >
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Optional Note</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Tell us why you need it urgently..."
            className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none h-24 transition-colors"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 dark:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 active:scale-95 transition-all"
        >
          Post Request
        </button>
      </form>
    </div>
  );
};

export default RequestForm;
