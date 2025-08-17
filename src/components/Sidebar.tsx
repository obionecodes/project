import React from 'react';
import { Clock, Gift, Coins } from 'lucide-react';
import { CoinReward } from '../types';

interface SidebarProps {
  coinRewards: CoinReward[];
  currentCoins: number;
  onClaimReward: (day: number) => void;
}

export default function Sidebar({ coinRewards, currentCoins, onClaimReward }: SidebarProps) {
  const nextRewardTime = "08:26:01";
  
  return (
    <aside className="hidden lg:block w-80 bg-gray-50 p-6 space-y-6">
      {/* Daily Rewards */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Gift className="h-5 w-5 text-purple-600" />
          <span className="text-gray-700 font-medium">Come every day and grab FREE coins</span>
        </div>
        
        <div className="flex space-x-2 mb-4">
          {coinRewards.map((reward) => (
            <div
              key={reward.day}
              className={`relative flex flex-col items-center p-3 rounded-lg ${
                reward.claimed 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } transition-colors cursor-pointer`}
              onClick={() => !reward.claimed && onClaimReward(reward.day)}
            >
              <span className="text-xs font-medium mb-1">{reward.day}</span>
              <div className="flex items-center space-x-1">
                <Coins className="h-3 w-3" />
                <span className="text-xs">{reward.coins}</span>
              </div>
              {reward.claimed && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full" />
              )}
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Gift className="h-4 w-4 text-orange-600" />
            <span className="text-orange-800 font-medium">More rewards</span>
          </div>
          <div className="flex items-center space-x-1 text-orange-600">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-mono">{nextRewardTime}</span>
          </div>
        </div>
      </div>
      
      {/* Call History */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="h-5 w-5 text-purple-600" />
          <span className="text-gray-700 font-medium">Call history</span>
        </div>
        
        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
          <img
            src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60"
            alt="Joy"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-gray-900">Joy, 26</p>
            <p className="text-sm text-orange-500">Away</p>
          </div>
        </div>
      </div>
      
      {/* Current Coins */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm">Your balance</p>
            <div className="flex items-center space-x-2 mt-1">
              <Coins className="h-6 w-6" />
              <span className="text-2xl font-bold">{currentCoins}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}