import React from 'react';
import { Gift, Coins } from 'lucide-react';
import { CoinReward } from '../types';

interface MobileRewardsCardProps {
  rewards: CoinReward[];
  onClaimNext: (day: number) => void;
}

export default function MobileRewardsCard({ rewards, onClaimNext }: MobileRewardsCardProps) {
  const nextUnclaimed = rewards.find((r) => !r.claimed);

  return (
    <div className="lg:hidden bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <h3 className="text-center text-gray-900 font-semibold text-base mb-4">
        Come every day and grab FREE coins
      </h3>

      {/* Daily rewards row */}
      <div className="flex items-center justify-between gap-2 mb-4">
        {rewards.map((r) => {
          const isActive = nextUnclaimed ? r.day === nextUnclaimed.day : false;
          return (
            <div
              key={r.day}
              className={`flex flex-col items-center justify-center w-12 h-16 rounded-xl border-2 ${
                r.claimed
                  ? 'bg-green-50 border-green-300 text-green-700'
                  : isActive
                  ? 'bg-purple-50 border-purple-400 text-purple-700'
                  : 'bg-gray-50 border-gray-200 text-gray-600'
              }`}
            >
              <span className="text-xs font-medium mb-1">{r.day}</span>
              <Coins className="h-4 w-4 text-yellow-500" />
              <span className="text-xs font-semibold">{r.coins}</span>
            </div>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 h-12 rounded-xl border border-gray-200 bg-white text-gray-900 font-medium text-sm">
          <Gift className="h-5 w-5 text-purple-600" />
          More rewards
        </button>
        <button
          className="h-12 rounded-xl bg-emerald-500 text-white font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed hover:bg-emerald-600 transition-colors"
          onClick={() => nextUnclaimed && onClaimNext(nextUnclaimed.day)}
          disabled={!nextUnclaimed}
        >
          Grab it
        </button>
      </div>
    </div>
  );
}


