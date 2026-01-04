
export type UrgencyLevel = 'High' | 'Medium';
export type ExchangeMode = 'Buy' | 'Borrow' | 'Exchange' | 'Donate';
export type BookCondition = 'New' | 'Good' | 'Used' | 'Highlighted';

export type UserTag = 'Book Starter' | 'Helpful Reader' | 'Campus Contributor' | 'Study Hero' | 'Book Champion';

export interface UserStats {
  points: number;
  tag: UserTag;
  successfulExchanges: number;
  booksLent: number;
  booksDonated: number;
}

export interface UserProfile {
  name: string;
  college: string;
  city: string;
  campus?: string;
}

export interface BookRequest {
  id: string;
  requesterName: string;
  title: string;
  subject: string;
  examType: string;
  urgency: UrgencyLevel;
  distance: string;
  note?: string;
  image?: string;
  preferredDate?: string;
  preferredTime?: string;
  preferredLocation?: string;
  contactNumber?: string;
  additionalContactNumber?: string;
  timestamp: Date;
}

export interface BookListing {
  id: string;
  ownerName: string;
  title: string;
  author?: string;
  condition?: BookCondition;
  subject: string;
  price?: number;
  mrp?: number;
  mode: ExchangeMode;
  distance: string;
  isVerified: boolean;
  image?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

export interface FeedbackData {
  stars: number;
  reactions: string[];
  comment: string;
}

export type AppView = 'onboarding' | 'home' | 'request' | 'matches' | 'chat' | 'verify' | 'buddy' | 'rewards' | 'feedback' | 'list';
