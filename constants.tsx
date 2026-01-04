
import { BookRequest, BookListing } from './types';

export const MOCK_REQUESTS: BookRequest[] = [
  {
    id: '1',
    requesterName: 'Alex Smith',
    title: 'Organic Chemistry II',
    subject: 'Science',
    examType: 'Finals',
    urgency: 'High',
    distance: '0.4 mi',
    note: 'Exam in 2 days, desperate for the 8th edition!',
    image: 'https://images.unsplash.com/photo-1532187875605-2fe3585114e5?auto=format&fit=crop&q=80&w=400',
    preferredLocation: 'Main Library 2nd Floor',
    preferredDate: '2023-11-20',
    preferredTime: '14:00',
    timestamp: new Date()
  },
  {
    id: '2',
    requesterName: 'Sarah Chen',
    title: 'Macroeconomics 101',
    subject: 'Economics',
    examType: 'Midterms',
    urgency: 'Medium',
    distance: '1.2 mi',
    note: 'Just need to check the problem sets.',
    image: 'https://images.unsplash.com/photo-1591696208162-a977af8e8e60?auto=format&fit=crop&q=80&w=400',
    preferredLocation: 'Student Union Cafe',
    preferredDate: '2023-11-21',
    timestamp: new Date()
  },
  {
    id: '3',
    requesterName: 'Jordan Lee',
    title: 'Intro to Algorithms',
    subject: 'CS',
    examType: 'Homework',
    urgency: 'High',
    distance: '0.8 mi',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=400',
    preferredLocation: 'Engineering Block A',
    timestamp: new Date()
  },
  {
    id: '4',
    requesterName: 'Maya Patel',
    title: 'Criminal Law Basics',
    subject: 'Law',
    examType: 'Midterms',
    urgency: 'Medium',
    distance: '2.1 mi',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400',
    preferredLocation: 'Law Library Lobby',
    timestamp: new Date()
  }
];

export const MOCK_LISTINGS: BookListing[] = [
  {
    id: 'L1',
    ownerName: 'Dr. Mike',
    title: 'Organic Chemistry II',
    subject: 'Science',
    mode: 'Borrow',
    distance: '0.5 mi',
    isVerified: true,
    image: 'https://images.unsplash.com/photo-1532187875605-2fe3585114e5?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'L2',
    ownerName: 'Emily R.',
    title: 'Macroeconomics 101',
    subject: 'Economics',
    price: 15,
    mode: 'Buy',
    distance: '1.5 mi',
    isVerified: true,
    image: 'https://images.unsplash.com/photo-1591696208162-a977af8e8e60?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'L3',
    ownerName: 'James P.',
    title: 'Intro to Algorithms',
    subject: 'CS',
    mode: 'Donate',
    distance: '0.9 mi',
    isVerified: true,
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'L4',
    ownerName: 'Professor T.',
    title: 'Physics for Engineers',
    subject: 'Physics',
    mode: 'Exchange',
    distance: '0.3 mi',
    isVerified: true,
    image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=400'
  }
];
