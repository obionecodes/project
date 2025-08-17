import React from 'react';
import { FileText, HelpCircle, Settings, UserX, LogOut, Edit } from 'lucide-react';
import { currentUser } from '../data/mockData';

interface UserProfileSectionProps {
  onEditProfile: () => void;
}

export default function UserProfileSection({ onEditProfile }: UserProfileSectionProps) {
  const menuItems = [
    { id: 'invoice', label: 'Invoice history', icon: FileText },
    { id: 'support', label: 'Support', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'block', label: 'Block list', icon: UserX },
    { id: 'logout', label: 'Log out', icon: LogOut },
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 lg:p-6">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-sm p-4 lg:p-8 mb-4 lg:mb-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white text-lg lg:text-2xl font-bold">
              J
            </div>
            <div>
              <p className="text-xs lg:text-sm text-gray-500">ID: {currentUser.id}</p>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900">{currentUser.name}</h2>
            </div>
          </div>
          
          <button
            onClick={onEditProfile}
            className="flex items-center space-x-1 lg:space-x-2 px-3 lg:px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors text-sm lg:text-base"
          >
            <Edit className="h-4 w-4" />
            <span className="hidden sm:inline">Edit profile</span>
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className="flex items-center space-x-3 p-4 lg:p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 text-left group"
            >
              <div className="p-2 lg:p-3 bg-gray-100 rounded-xl group-hover:bg-purple-100 transition-colors">
                <Icon className="h-5 w-5 lg:h-6 lg:w-6 text-gray-600 group-hover:text-purple-600" />
              </div>
              <span className="font-medium text-gray-900 text-sm lg:text-base">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}