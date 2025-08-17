import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import UserCard from './components/UserCard';
import ExploreSection from './components/ExploreSection';
import MessagesSection from './components/MessagesSection';
import UserProfileSection from './components/UserProfileSection';
import PremiumModal from './components/PremiumModal';
import { TabType, ExploreTab, MessageFilter, ProfileFilter } from './types';
import { mockUsers, mockMessages, coinRewards, currentUser } from './data/mockData';

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
              <button className="h-12 rounded-xl border border-gray-200 bg-white text-gray-900 font-medium">View stories</button>
              <button className="h-12 rounded-xl bg-pink-500 text-white font-semibold">Start random</button>
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