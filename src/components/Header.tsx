import React from 'react';
import { Video, Search, MessageCircle, Crown, User } from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onPremiumClick: () => void;
  onProfileClick: () => void;
  unreadMessages: number;
}

export default function Header({ 
  activeTab, 
  onTabChange, 
  onPremiumClick, 
  onProfileClick,
  unreadMessages 
}: HeaderProps) {
  const tabs = [
    { id: 'video-chat' as TabType, label: 'Video chat', icon: Video },
    { id: 'top-profiles' as TabType, label: 'Top profiles', icon: Search },
    { id: 'messages' as TabType, label: 'Messages', icon: MessageCircle, badge: unreadMessages },
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-2 md:px-6 md:py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left mobile cluster: chat, search, messages count (compact) */}
        <nav className="flex space-x-1 md:space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex items-center space-x-1 md:space-x-2 px-2 md:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm md:text-base ${
                  isActive 
                    ? 'text-purple-600 bg-purple-50' 
                    : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5 md:h-5 md:w-5" />
                <span className="hidden sm:inline">{tab.label}</span>
                {tab.badge && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
        {/* Center brand on mobile */}
        <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
          <span className="text-xl font-extrabold text-purple-600 tracking-tight md:hidden">mili.live</span>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <button
            onClick={onPremiumClick}
            className="flex items-center space-x-1 md:space-x-2 bg-black text-yellow-300 px-3 md:px-4 py-2 rounded-xl font-semibold hover:bg-gray-900 transition-all duration-200 text-sm md:text-base"
          >
            <Crown className="h-4 w-4" />
            <span className="hidden sm:inline">Premium</span>
          </button>
          
          <button
            onClick={onProfileClick}
            className="p-2 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors duration-200"
          >
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}