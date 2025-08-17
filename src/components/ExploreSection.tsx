import React from 'react';
import { ExploreTab, ProfileFilter, User } from '../types';
import UserCard from './UserCard';

interface ExploreSectionProps {
  activeExploreTab: ExploreTab;
  onExploreTabChange: (tab: ExploreTab) => void;
  activeFilter: ProfileFilter;
  onFilterChange: (filter: ProfileFilter) => void;
  users: User[];
  onCall: (userId: string) => void;
  onMessage: (userId: string) => void;
  onLike: (userId: string) => void;
}

export default function ExploreSection({
  activeExploreTab,
  onExploreTabChange,
  activeFilter,
  onFilterChange,
  users,
  onCall,
  onMessage,
  onLike,
}: ExploreSectionProps) {
  const exploreTabs: { id: ExploreTab; label: string }[] = [
    { id: 'explore', label: 'Explore' },
    { id: 'swipes', label: 'Swipes' },
  ];

  const filters: { id: ProfileFilter; label: string }[] = [
    { id: 'featured', label: 'Featured' },
    { id: 'new', label: 'New' },
    { id: 'european', label: 'European' },
    { id: 'latino', label: 'Latino' },
    { id: 'asian', label: 'Asian' },
  ];

  return (
    <div className="space-y-6">
      {/* Explore Tabs */}
      <div className="flex space-x-4 sm:space-x-8 border-b border-gray-200">
        {exploreTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onExploreTabChange(tab.id)}
            className={`relative pb-4 px-2 font-medium transition-colors text-sm sm:text-base ${
              activeExploreTab === tab.id
                ? 'text-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
            {activeExploreTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-2 scrollbar-hide">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`whitespace-nowrap px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              activeFilter === filter.id
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* User Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onCall={onCall}
            onMessage={onMessage}
            onLike={onLike}
          />
        ))}
      </div>
    </div>
  );
}