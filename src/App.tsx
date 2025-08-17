import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import UserCard from './components/UserCard';
import ExploreSection from './components/ExploreSection';
import MessagesSection from './components/MessagesSection';
import UserProfileSection from './components/UserProfileSection';
import PremiumModal from './components/PremiumModal';
import MobileRewardsCard from './components/MobileRewardsCard';
import MobileCallHistory from './components/MobileCallHistory';
import { TabType, ExploreTab, MessageFilter, ProfileFilter } from './types';
import { mockUsers, mockMessages, coinRewards, currentUser } from './data/mockData';
import { Video } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('video-chat');
  const [activeExploreTab, setActiveExploreTab] = useState<ExploreTab>('explore');
  const [activeMessageFilter, setActiveMessageFilter] = useState<MessageFilter>('all');
  const [activeFilter, setActiveFilter] = useState<ProfileFilter>('featured');
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [coins, setCoins] = useState(currentUser.coins);
  const [rewards, setRewards] = useState(coinRewards);

  const unreadMessages = mockMessages.filter(m => !m.isRead).length;

  const handleClaimReward = (day: number) => {
    setRewards(prev => 
      prev.map(reward => 
        reward.day === day ? { ...reward, claimed: true } : reward
      )
    );
    const reward = rewards.find(r => r.day === day);
    if (reward) {
      setCoins(prev => prev + reward.coins);
    }
  };

  const handleCall = (userId: string) => {
    console.log('Starting call with user:', userId);
  };

  const handleMessage = (userId: string) => {
    console.log('Opening message with user:', userId);
    setActiveTab('messages');
  };

  const handleLike = (userId: string) => {
    console.log('Liked user:', userId);
  };

  const handleSubscribe = () => {
    console.log('Subscribe to premium');
    setShowPremiumModal(false);
  };

  const renderContent = () => {
    if (showUserProfile) {
      return (
        <UserProfileSection
          onEditProfile={() => console.log('Edit profile')}
        />
      );
    }

    switch (activeTab) {
      case 'video-chat':
        return (
          <div className="space-y-6">
            {/* Mobile hero rewards to match provided design */}
            <MobileRewardsCard rewards={rewards} onClaimNext={handleClaimReward} />

            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Private calls with top girls</h2>
              <button className="text-purple-600 font-medium hover:text-purple-700 transition-colors text-sm sm:text-base">
                All →
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
              {mockUsers.slice(0, 6).map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onCall={handleCall}
                  onMessage={handleMessage}
                  onLike={handleLike}
                />
              ))}
            </div>

            {/* Mobile action buttons */}
            <div className="lg:hidden grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 h-12 rounded-xl border border-gray-200 bg-white text-gray-900 font-medium text-sm">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                View stories
              </button>
              <button className="flex items-center justify-center gap-2 h-12 rounded-xl bg-pink-500 text-white font-semibold text-sm hover:bg-pink-600 transition-colors">
                <Video className="w-5 h-5" />
                Start random
              </button>
            </div>

            {/* Mobile call history strip */}
            <MobileCallHistory users={mockUsers} />
          </div>
        );
      
      case 'top-profiles':
        return (
          <ExploreSection
            activeExploreTab={activeExploreTab}
            onExploreTabChange={setActiveExploreTab}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            users={mockUsers}
            onCall={handleCall}
            onMessage={handleMessage}
            onLike={handleLike}
          />
        );
      
      case 'messages':
        return (
          <MessagesSection
            activeMessageFilter={activeMessageFilter}
            onMessageFilterChange={setActiveMessageFilter}
            messages={mockMessages}
            selectedChatId={selectedChatId}
            onChatSelect={setSelectedChatId}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onPremiumClick={() => setShowPremiumModal(true)}
        onProfileClick={() => setShowUserProfile(!showUserProfile)}
        unreadMessages={unreadMessages}
      />
      
      <div className="flex">
        <Sidebar
          coinRewards={rewards}
          currentCoins={coins}
          onClaimReward={handleClaimReward}
        />
        
        <main className="flex-1 p-4 lg:p-6">
          {renderContent()}
        </main>
      </div>

      <PremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onSubscribe={handleSubscribe}
      />
    </div>
  );
}

export default App;