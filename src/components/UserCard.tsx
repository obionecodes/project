import React from 'react';
import { Video, MessageCircle, Heart } from 'lucide-react';
import { User } from '../types';

interface UserCardProps {
  user: User;
  onCall: (userId: string) => void;
  onMessage: (userId: string) => void;
  onLike: (userId: string) => void;
}

export default function UserCard({ user, onCall, onMessage, onLike }: UserCardProps) {
  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'Available':
        return 'bg-green-500';
      case 'In call':
        return 'bg-red-500';
      case 'Offline':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusTextColor = (status: User['status']) => {
    switch (status) {
      case 'Available':
        return 'text-green-600 bg-green-100';
      case 'In call':
        return 'text-red-600 bg-red-100';
      case 'Offline':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Status Badge */}
        <div className={`absolute top-2 left-2 sm:top-4 sm:left-4 px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-medium ${getStatusTextColor(user.status)}`}>
          {user.status}
        </div>
        
        {/* Location Badge */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 px-2 py-1 bg-black bg-opacity-50 text-white text-xs rounded-full uppercase">
          {user.countryCode}
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* User Info */}
        <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 text-white">
          <h3 className="font-bold text-sm sm:text-lg mb-1">
            {user.countryCode.toUpperCase()} {user.name}, {user.age}
          </h3>
        </div>
        
        {/* Action Buttons */}
        <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 flex space-x-1 sm:space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike(user.id);
            }}
            className="p-1.5 sm:p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
          >
            <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMessage(user.id);
            }}
            className="p-1.5 sm:p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
          >
            <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCall(user.id);
            }}
            disabled={user.status !== 'Available'}
            className="p-1.5 sm:p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            <Video className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
          </button>
        </div>
        
        {/* Online Indicator */}
        {user.isOnline && (
          <div className={`absolute top-1 left-1 sm:top-2 sm:left-2 w-2 h-2 sm:w-3 sm:h-3 ${getStatusColor(user.status)} rounded-full border-2 border-white`} />
        )}
      </div>
    </div>
  );
}