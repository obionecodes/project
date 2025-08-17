import React from 'react';
import { Video, ChevronUp } from 'lucide-react';
import { User } from '../types';

interface MobileCallHistoryProps {
  users: User[];
}

export default function MobileCallHistory({ users }: MobileCallHistoryProps) {
  const items = users.slice(0, 8);

  return (
    <div className="lg:hidden">
      {/* Call history toggle button */}
      <div className="flex items-center justify-center mb-4">
        <button className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-sm border border-gray-100">
          <ChevronUp className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-800">Call history</span>
        </button>
      </div>

      {/* Horizontal scrollable cards */}
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
        {items.map((u) => (
          <div key={u.id} className="relative shrink-0 w-48 rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100">
            {/* User image */}
            <div className="aspect-[4/5] relative">
              <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
              
              {/* Status badge */}
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  u.status === 'Available' 
                    ? 'bg-green-600 text-white' 
                    : u.status === 'In call' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-600 text-white'
                }`}>
                  {u.status === 'Available' ? 'Online' : u.status}
                </span>
              </div>

              {/* Call button */}
              <button
                className="absolute bottom-2 right-2 p-2.5 rounded-full bg-white text-purple-600 shadow-md hover:bg-gray-50 transition-colors disabled:bg-gray-200 disabled:text-gray-400"
                aria-label="Start call"
                disabled={u.status !== 'Available'}
              >
                <Video className="h-4 w-4" />
              </button>
            </div>

            {/* User info */}
            <div className="p-3">
              <p className="text-gray-900 font-medium text-sm truncate">{u.name}, {u.age}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


