import React, { useState } from 'react';
import { Search, MessageCircle, Bell, User, MoreVertical, Phone, Plus, UserPlus, Users } from 'lucide-react';
import { Chat, Screen, User as UserType } from '../App';

interface ChatListScreenProps {
  onChatSelect: (chat: Chat) => void;
  onNavigate: (screen: Screen) => void;
  currentUser: UserType;
}

const ChatListScreen: React.FC<ChatListScreenProps> = ({ onChatSelect, onNavigate, currentUser }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  const chats: Chat[] = [
    {
      id: '1',
      name: 'Daniel Johnson',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      lastMessage: 'what are you doing n',
      timestamp: '2 mins ago',
      unreadCount: 1,
      isOnline: true,
      phone: '+91 98765 43211',
      email: 'daniel@example.com',
      bio: 'Software Developer'
    },
    {
      id: '2',
      name: 'Dania Amelia',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      lastMessage: 'Hello Rosie!',
      timestamp: '2 mins ago',
      unreadCount: 1,
      isOnline: true,
      phone: '+91 98765 43212',
      email: 'dania@example.com',
      bio: 'Designer & Artist'
    },
    {
      id: '3',
      name: 'Daniel Dickens',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      lastMessage: 'Hello ns',
      timestamp: '2 mins ago',
      unreadCount: 0,
      isOnline: false,
      phone: '+91 98765 43213',
      email: 'dickens@example.com',
      bio: 'Writer & Blogger'
    },
    {
      id: '4',
      name: 'jenny!',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      lastMessage: 'Hello Rosie!',
      timestamp: '2 mins ago',
      unreadCount: 1,
      isOnline: true,
      phone: '+91 98765 43214',
      email: 'jenny@example.com',
      bio: 'Photographer'
    },
    {
      id: '5',
      name: 'Sally Rooney',
      avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      lastMessage: 'Hello Rosie!',
      timestamp: '2 mins ago',
      unreadCount: 0,
      isOnline: true,
      phone: '+91 98765 43215',
      email: 'sally@example.com',
      bio: 'Author & Novelist'
    }
  ];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 py-3 text-sm font-semibold">
        <span>9:41</span>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-3 bg-black rounded-full"></div>
            <div className="w-1 h-3 bg-black rounded-full"></div>
            <div className="w-1 h-3 bg-black rounded-full"></div>
            <div className="w-1 h-3 bg-gray-300 rounded-full"></div>
          </div>
          <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          <div className="w-6 h-3 bg-black rounded-sm"></div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="text-2xl font-light text-blue-500">α</div>
          <h1 className="text-xl font-semibold text-gray-800">Alpha Chat</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Search size={20} className="text-gray-600" />
          </button>
          <button 
            onClick={() => onNavigate('profile')}
            className="relative hover:scale-105 transition-transform"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-200">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
            </div>
            {currentUser.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
            )}
          </button>
          <div className="relative">
            <button 
              onClick={() => setShowOptionsMenu(!showOptionsMenu)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <MoreVertical size={20} className="text-gray-600" />
            </button>
            
            {showOptionsMenu && (
              <div className="absolute top-12 right-0 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 min-w-48 z-10">
                <button 
                  onClick={() => {
                    setShowOptionsMenu(false);
                    onNavigate('profile');
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  Profile
                </button>
                <button 
                  onClick={() => {
                    setShowOptionsMenu(false);
                    onNavigate('settings');
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  Settings
                </button>
                <button className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors">
                  New Group
                </button>
                <button className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors">
                  Starred Messages
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors text-red-600">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="px-6 py-3 border-b border-gray-100">
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoFocus
          />
        </div>
      )}

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat)}
            className="flex items-center px-6 py-4 hover:bg-gray-50 cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src={chat.avatar} 
                  alt={chat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {chat.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
              )}
            </div>

            <div className="flex-1 ml-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">{chat.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">{chat.timestamp}</span>
                  {chat.unreadCount > 0 && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <div className="absolute bottom-20 right-6">
        <div className="relative">
          <button 
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="w-14 h-14 bg-blue-500 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <Plus size={24} className="text-white" />
          </button>
          
          {/* Add Menu */}
          {showAddMenu && (
            <div className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 min-w-48">
              <button 
                onClick={() => setShowAddMenu(false)}
                className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserPlus size={16} className="text-blue-600" />
                </div>
                <span className="text-gray-800 font-medium">Add New Contact</span>
              </button>
              <button 
                onClick={() => setShowAddMenu(false)}
                className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Users size={16} className="text-green-600" />
                </div>
                <span className="text-gray-800 font-medium">Create Group</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-around py-3 border-t border-gray-100 bg-white">
        <button 
          onClick={() => onNavigate('chatlist')}
          className="flex flex-col items-center space-y-1 text-blue-500 transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <MessageCircle size={20} />
          <span className="text-xs font-medium">Chats</span>
        </button>
        <button 
          onClick={() => onNavigate('updates')}
          className="flex flex-col items-center space-y-1 text-gray-400 transition-all duration-200 hover:scale-110 active:scale-95 hover:text-gray-600"
        >
          <Bell size={20} />
          <span className="text-xs">Updates</span>
        </button>
        <button 
          onClick={() => onNavigate('calls')}
          className="flex flex-col items-center space-y-1 text-gray-400 transition-all duration-200 hover:scale-110 active:scale-95 hover:text-gray-600"
        >
          <Phone size={20} />
          <span className="text-xs">Calls</span>
        </button>
      </div>
    </div>
  );
};

export default ChatListScreen;