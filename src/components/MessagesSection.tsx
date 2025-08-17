import React from 'react';
import { MessageSquare, Users, Wifi } from 'lucide-react';
import { MessageFilter, Message } from '../types';

interface MessagesSectionProps {
  activeMessageFilter: MessageFilter;
  onMessageFilterChange: (filter: MessageFilter) => void;
  messages: Message[];
  selectedChatId: string | null;
  onChatSelect: (messageId: string) => void;
}

export default function MessagesSection({
  activeMessageFilter,
  onMessageFilterChange,
  messages,
  selectedChatId,
  onChatSelect,
}: MessagesSectionProps) {
  const filters: { id: MessageFilter; label: string; icon: React.ElementType }[] = [
    { id: 'all', label: 'All friends', icon: Users },
    { id: 'unread', label: 'Unread', icon: MessageSquare },
    { id: 'online', label: 'Online', icon: Wifi },
  ];

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <div className="flex flex-col lg:flex-row h-[600px]">
      {/* Messages List */}
      <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col">
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Messages</h2>
          
          <div className="flex space-x-2 lg:space-x-4 overflow-x-auto">
            {filters.map((filter) => {
              const Icon = filter.icon;
              const isActive = activeMessageFilter === filter.id;
              const showBadge = filter.id === 'unread' && unreadCount > 0;
              
              return (
                <button
                  key={filter.id}
                  onClick={() => onMessageFilterChange(filter.id)}
                  className={`relative flex items-center space-x-1 lg:space-x-2 px-2 lg:px-3 py-2 rounded-lg text-xs lg:text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-purple-100 text-purple-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline lg:inline">{filter.label}</span>
                  {showBadge && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto max-h-64 lg:max-h-none">
          {messages.length === 0 ? (
            <div className="p-4 lg:p-6 text-center text-gray-500">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No messages yet</p>
            </div>
          ) : (
            <div className="space-y-1">
              {messages.map((message) => (
                <button
                  key={message.id}
                  onClick={() => onChatSelect(message.id)}
                  className={`w-full p-3 lg:p-4 text-left hover:bg-gray-50 transition-colors ${
                    selectedChatId === message.id ? 'bg-purple-50 border-r-2 border-purple-600' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={message.avatar}
                        alt={message.userName}
                        className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover"
                      />
                      {!message.isRead && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-gray-900 truncate text-sm lg:text-base">{message.userName}</p>
                        <span className="text-xs text-gray-500 ml-2">{message.timestamp}</span>
                      </div>
                      <p className="text-xs lg:text-sm text-gray-600 truncate">{message.message}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 min-h-[300px] lg:min-h-0">
        <div className="text-center">
          <div className="mb-4">
            <MessageSquare className="h-16 w-16 mx-auto text-purple-400 mb-3" />
            <div className="space-y-1">
              <div className="w-8 h-8 bg-purple-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-purple-600" />
              </div>
              <div className="w-6 h-6 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
                <MessageSquare className="h-3 w-3 text-blue-600" />
              </div>
            </div>
          </div>
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-2">
            Select the dialogue to
          </h3>
          <p className="text-base lg:text-lg font-medium text-gray-900">
            continue the communication
          </p>
        </div>
      </div>
    </div>
  );
}