
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
import { AppView, BookRequest, BookListing, UserStats, UserTag, FeedbackData, UserProfile } from './types';
import { MOCK_REQUESTS, MOCK_LISTINGS } from './constants.tsx';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('onboarding');
  const [isVerified, setIsVerified] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });
  const [requests, setRequests] = useState<BookRequest[]>(MOCK_REQUESTS);
  const [listings, setListings] = useState<BookListing[]>(MOCK_LISTINGS);
  const [activeChat, setActiveChat] = useState<{name: string, title: string, image?: string, contact?: string} | null>(null);

  // Rewards State
  const [userStats, setUserStats] = useState<UserStats>({
    points: 0, // Start fresh for new users
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

  // Recalculate Tag when points change
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

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    awardPoints(10); // Reward for signing up
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
      case 'home': return 'Urgent Requests';
      case 'request': return 'Need a Book?';
      case 'list': return 'List a Book';
      case 'matches': return 'Nearby Matches';
      case 'chat': return 'Messages';
      case 'verify': return 'Verification';
      case 'buddy': return 'Buddy Support';
      case 'rewards': return 'Your Rank';
      case 'feedback': return 'Share Feedback';
      case 'onboarding': return 'Welcome to NeedBook';
      default: return 'NeedBook';
    }
  };

  // Don't show Layout for onboarding
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
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
