import React, { useState } from 'react';
import { Search, MoreVertical, MessageCircle, Bell, Phone, Plus, Camera } from 'lucide-react';
import { Screen } from '../App';

interface UpdatesScreenProps {
  onNavigate: (screen: Screen) => void;
}

const UpdatesScreen: React.FC<UpdatesScreenProps> = ({ onNavigate }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  const waveUsers = [
    { 
      name: 'You', 
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', 
      isOnline: true,
      hasStory: false
    },
    { 
      name: 'Adam', 
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', 
      isOnline: true,
      hasStory: true
    },
    { 
      name: 'William', 
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', 
      isOnline: false,
      hasStory: false
    },
    { 
      name: 'Peter', 
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', 
      isOnline: true,
      hasStory: true
    },
    { 
      name: 'Julia', 
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', 
      isOnline: true,
      hasStory: true,
      unreadCount: 5
    }
  ];

  const updates = [
    {
      id: '1',
      user: 'jenny !',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      action: 'you add a family group',
      time: '2 mins ago',
      isOnline: true
    },
    {
      id: '2',
      user: 'jenny !',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      action: 'Send a audio calling messages',
      time: '5 mins ago',
      isOnline: true
    },
    {
      id: '3',
      user: 'Daniel Johnson',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      action: 'recently invited you',
      time: '10 mins ago',
      isOnline: false
    }
  ];

  const filteredUpdates = updates.filter(update =>
    update.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleWaveUserClick = (user: any, index: number) => {
    if (index === 0) {
      // "You" clicked - open camera
      onNavigate('camera');
    } else {
      // Other users clicked - show their story/wave (for now just log)
      console.log(`Opening ${user.name}'s wave`);
      // You can add wave viewing functionality here later
    }
  };

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
        <h1 className="text-xl font-semibold text-gray-800">update</h1>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Search size={20} className="text-gray-600" />
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
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  Wave Privacy
                </button>
                <button 
                  onClick={() => {
                    setShowOptionsMenu(false);
                    onNavigate('camera');
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  My Wave
                </button>
                <button 
                  onClick={() => setShowOptionsMenu(false)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  Create Channel
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button 
                  onClick={() => setShowOptionsMenu(false)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  Settings
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
            placeholder="Search updates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoFocus
          />
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {/* Wave Section */}
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Wave</h2>
          <div className="flex space-x-4">
            {waveUsers.map((user, index) => (
              <button
                key={user.name}
                onClick={() => handleWaveUserClick(user, index)}
                className="flex flex-col items-center transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <div className="relative">
                  {/* Blue + Silver + White gradient ring for stories */}
                  <div className={`w-16 h-16 rounded-full p-0.5 ${
                    user.hasStory 
                      ? 'bg-gradient-to-tr from-blue-500 via-gray-400 to-white shadow-lg' 
                      : 'bg-gray-200'
                  }`}>
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {index === 0 && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                      <Camera size={12} className="text-white" />
                    </div>
                  )}
                  {user.unreadCount && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                      {user.unreadCount}
                    </div>
                  )}
                  {user.isOnline && index !== 0 && !user.unreadCount && (
                    <div className="absolute bottom-1 right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <span className="text-xs text-gray-600 mt-2 font-medium">{user.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100"></div>

        {/* Updates Section */}
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Update</h2>
          <div className="space-y-4">
            {filteredUpdates.map((update) => (
              <button
                key={update.id}
                className="w-full flex items-center space-x-4 hover:bg-gray-50 p-2 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={update.avatar} 
                      alt={update.user}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {update.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-800">{update.user}</span>
                    <span className="text-sm text-gray-600">{update.action}</span>
                  </div>
                  <p className="text-xs text-gray-500">{update.time}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-around py-3 border-t border-gray-100 bg-white">
        <button 
          onClick={() => onNavigate('chatlist')}
          className="flex flex-col items-center space-y-1 text-gray-400 transition-all duration-200 hover:scale-110 active:scale-95 hover:text-gray-600"
        >
          <MessageCircle size={20} />
          <span className="text-xs">Chats</span>
        </button>
        <button className="flex flex-col items-center space-y-1 text-blue-500 transition-all duration-200 hover:scale-110 active:scale-95">
          <div className="relative">
            <Bell size={20} />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
          <span className="text-xs font-medium">Updates</span>
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

export default UpdatesScreen;