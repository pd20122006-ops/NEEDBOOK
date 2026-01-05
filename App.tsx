
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import RequestForm from './components/RequestForm';
import ListingForm from './components/ListingForm';
import MatchedListings from './components/MatchedListings';
import Chat from './components/Chat';
import Buddy from './components/Buddy';
import Rewards from './components/Rewards';
import Feedback from './components/Feedback';
import Verification from './components/Verification';
import Onboarding from './components/Onboarding';
import { AppView, BookRequest, BookListing, UserStats, UserTag, FeedbackData, UserProfile, Language } from './types';
import { MOCK_REQUESTS, MOCK_LISTINGS } from './constants.tsx';
import { translations } from './translations';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('onboarding');
  const [isVerified, setIsVerified] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });
  const [requests, setRequests] = useState<BookRequest[]>(MOCK_REQUESTS);
  const [listings, setListings] = useState<BookListing[]>(MOCK_LISTINGS);
  const [activeChat, setActiveChat] = useState<{name: string, title: string, image?: string, contact?: string} | null>(null);

  const t = translations[language];

  // Rewards State
  const [userStats, setUserStats] = useState<UserStats>({
    points: 0,
    tag: 'Book Starter',
    successfulExchanges: 0,
    booksLent: 0,
    booksDonated: 0,
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const calculateTag = (pts: number): UserTag => {
      if (pts >= 501) return 'Book Champion';
      if (pts >= 301) return 'Study Hero';
      if (pts >= 151) return 'Campus Contributor';
      if (pts >= 51) return 'Helpful Reader';
      return 'Book Starter';
    };
    
    const newTag = calculateTag(userStats.points);
    if (newTag !== userStats.tag) {
      setUserStats(prev => ({ ...prev, tag: newTag }));
    }
  }, [userStats.points, userStats.tag]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const awardPoints = (amount: number, type?: keyof UserStats) => {
    setUserStats(prev => {
      const newState = { ...prev, points: prev.points + amount };
      if (type && typeof prev[type] === 'number') {
        (newState as any)[type] = (prev[type] as number) + 1;
      }
      return newState;
    });
  };

  const handleOnboardingComplete = (profile: UserProfile, lang: Language) => {
    setUserProfile(profile);
    setLanguage(lang);
    awardPoints(10); 
    setView('verify');
  };

  const handlePostRequest = (data: any) => {
    const newReq: BookRequest = {
      id: Date.now().toString(),
      requesterName: userProfile?.name || 'Me (You)',
      title: data.title,
      subject: data.subject,
      examType: data.examType,
      urgency: data.urgency,
      distance: '0.1 mi',
      note: data.note,
      image: data.image,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      preferredLocation: data.preferredLocation,
      contactNumber: data.contactNumber,
      additionalContactNumber: data.additionalContactNumber,
      timestamp: new Date()
    };
    setRequests([newReq, ...requests]);
    awardPoints(5);
    setView('matches');
  };

  const handlePostListing = (data: any) => {
    const newListing: BookListing = {
      id: 'L' + Date.now().toString(),
      ownerName: userProfile?.name || 'Me (You)',
      title: data.title,
      author: data.author,
      condition: data.condition,
      subject: data.subject,
      mode: data.mode,
      price: data.price,
      mrp: data.mrp,
      distance: '0 mi',
      isVerified: isVerified,
      image: data.image
    };
    setListings([newListing, ...listings]);
    
    if (data.mode === 'Donate') {
      awardPoints(30, 'booksDonated');
    } else {
      awardPoints(10);
    }
    
    setView('matches');
  };

  const startChat = (listing: BookListing) => {
    setActiveChat({ name: listing.ownerName, title: listing.title, image: listing.image });
    setView('chat');
  };

  const fulfillRequest = (req: BookRequest) => {
    setActiveChat({ 
      name: req.requesterName, 
      title: req.title, 
      image: req.image,
      contact: req.contactNumber 
    });
    setView('feedback');
  };

  const handleFeedbackSubmit = (data: FeedbackData) => {
    awardPoints(15, 'successfulExchanges');
    awardPoints(5);
    setView('home');
  };

  const renderContent = () => {
    if (view === 'onboarding') {
      return <Onboarding onComplete={handleOnboardingComplete} />;
    }

    if (!isVerified && view === 'verify') {
      return <Verification onVerify={() => { setIsVerified(true); setView('home'); }} />;
    }

    switch (view) {
      case 'home':
        return <Home requests={requests} onAction={fulfillRequest} />;
      case 'request':
        return <RequestForm onPost={handlePostRequest} />;
      case 'list':
        return <ListingForm onPost={handlePostListing} />;
      case 'matches':
        return <MatchedListings listings={listings} onSelect={startChat} />;
      case 'rewards':
        return <Rewards stats={userStats} />;
      case 'feedback':
        return (
          <Feedback 
            recipientName={activeChat?.name || 'Student'} 
            bookTitle={activeChat?.title || 'the book'} 
            onSubmit={handleFeedbackSubmit}
          />
        );
      case 'chat':
        return (
          <Chat 
            recipientName={activeChat?.name || 'Student'} 
            bookTitle={activeChat?.title || 'Book'} 
            bookImage={activeChat?.image}
          />
        );
      case 'buddy':
        return <Buddy />;
      default:
        return <Home requests={requests} onAction={fulfillRequest} />;
    }
  };

  const getTitle = () => {
    switch (view) {
      case 'home': return t.home;
      case 'request': return t.request;
      case 'list': return t.list;
      case 'matches': return t.matches;
      case 'chat': return 'Messages';
      case 'verify': return t.verify;
      case 'buddy': return t.buddy;
      case 'rewards': return t.rewards;
      case 'feedback': return 'Feedback';
      case 'onboarding': return 'NeedBook';
      default: return 'NeedBook';
    }
  };

  if (view === 'onboarding') {
    return renderContent();
  }

  return (
    <Layout 
      activeView={view} 
      setView={setView} 
      title={getTitle()} 
      darkMode={darkMode} 
      toggleDarkMode={toggleDarkMode}
      userTag={userStats.tag}
      points={userStats.points}
      language={language}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
