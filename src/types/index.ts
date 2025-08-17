export interface User {
  id: string;
  name: string;
  age: number;
  location: string;
  countryCode: string;
  status: 'Available' | 'In call' | 'Offline';
  avatar: string;
  isOnline: boolean;
}

export interface Message {
  id: string;
  userId: string;
  userName: string;
  avatar: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export interface CoinReward {
  day: number;
  coins: number;
  claimed: boolean;
}

export type TabType = 'video-chat' | 'top-profiles' | 'messages';
export type ExploreTab = 'explore' | 'swipes';
export type MessageFilter = 'all' | 'unread' | 'online';
export type ProfileFilter = 'featured' | 'new' | 'european' | 'latino' | 'asian';