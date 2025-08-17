import React from 'react';
import { Video, ChevronUp } from 'lucide-react';
import { User } from '../types';

interface MobileCallHistoryProps {
  users: User[];
}

export default function MobileCallHistory({ users }: MobileCallHistoryProps) {
  const items = users.slice(0, 10);

  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-center -mb-2">
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow">
          <ChevronUp className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-800">Call history</span>
        </div>
      </div>

      <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
        {items.map((u) => (
          <div key={u.id} className="relative shrink-0 w-56 rounded-2xl overflow-hidden bg-white shadow-sm">
            <div className="aspect-[5/3]">
              <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-2 left-2 text-white text-sm font-medium">
              <span className={`px-2 py-0.5 rounded ${
                u.status === 'Available' ? 'bg-green-600' : u.status === 'In call' ? 'bg-orange-600' : 'bg-gray-600'
              }`}>{u.status === 'Available' ? 'Online' : u.status}</span>
            </div>
            <button
              className="absolute bottom-2 right-2 p-3 rounded-full bg-white text-purple-600 shadow-md"
              aria-label="Start call"
              disabled={u.status !== 'Available'}
            >
              <Video className="h-4 w-4" />
            </button>
            <div className="px-3 py-3">
              <p className="text-gray-900 font-medium truncate">{u.name}, {u.age}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


