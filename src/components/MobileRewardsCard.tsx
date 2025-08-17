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
    <div className="lg:hidden bg-white rounded-2xl p-4 shadow-sm">
      <p className="text-center text-gray-900 font-semibold mb-3">
        Come every day and grab FREE coins
      </p>

      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
        {rewards.map((r) => {
          const isActive = nextUnclaimed ? r.day === nextUnclaimed.day : false;
          return (
            <div
              key={r.day}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl border text-sm whitespace-nowrap ${
                r.claimed
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : isActive
                  ? 'bg-purple-50 border-purple-200 text-purple-700'
                  : 'bg-gray-50 border-gray-200 text-gray-700'
              }`}
            >
              <span className="font-semibold">{r.day}</span>
              <Coins className="h-4 w-4" />
              <span>{r.coins}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          className="flex items-center justify-center gap-2 h-12 rounded-xl border border-gray-200 text-gray-900 font-medium"
          type="button"
        >
          <Gift className="h-5 w-5 text-purple-600" />
          More rewards
        </button>
        <button
          className="h-12 rounded-xl bg-emerald-600 text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
          type="button"
          onClick={() => nextUnclaimed && onClaimNext(nextUnclaimed.day)}
          disabled={!nextUnclaimed}
        >
          Grab it
        </button>
      </div>
    </div>
  );
}


