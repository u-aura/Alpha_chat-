import React, { useState } from 'react';
import { Search, MoreVertical, MessageCircle, Bell, Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, Video, ArrowUpRight, ArrowDownLeft, PhoneOff } from 'lucide-react';
import { Screen } from '../App';

interface CallsScreenProps {
  onNavigate: (screen: Screen) => void;
  onVideoCall: () => void;
}

const CallsScreen: React.FC<CallsScreenProps> = ({ onNavigate, onVideoCall }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  const calls = [
    {
      id: '1',
      name: 'jenny !',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      time: '2 mins ago',
      type: 'incoming',
      isVideo: false,
      duration: '5:23'
    },
    {
      id: '2',
      name: 'Daniel Dickens',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      time: '2 mins ago',
      type: 'outgoing',
      isVideo: true,
      duration: '12:45'
    },
    {
      id: '3',
      name: 'Daniel Johnson',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      time: '2 mins ago',
      type: 'missed',
      isVideo: false,
      duration: null
    },
    {
      id: '4',
      name: 'jenny !',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      time: '2 mins ago',
      type: 'incoming',
      isVideo: true,
      duration: '8:12'
    },
    {
      id: '5',
      name: 'Daniel Dickens',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      time: '2 mins ago',
      type: 'outgoing',
      isVideo: false,
      duration: '3:45'
    },
    {
      id: '6',
      name: 'Daniel Johnson',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      time: '2 mins ago',
      type: 'missed',
      isVideo: true,
      duration: null
    }
  ];

  const tabs = ['All', 'Voice', 'Video', 'Missed'];

  const filteredCalls = calls.filter(call => {
    const matchesSearch = call.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'All' || 
      (activeTab === 'Voice' && !call.isVideo) ||
      (activeTab === 'Video' && call.isVideo) ||
      (activeTab === 'Missed' && call.type === 'missed');
    return matchesSearch && matchesTab;
  });

  const getCallIcon = (call: any) => {
    if (call.type === 'missed') {
      return <PhoneMissed size={16} className="text-red-500" />;
    } else if (call.type === 'incoming') {
      return <ArrowDownLeft size={16} className="text-green-500" />;
    } else {
      return <ArrowUpRight size={16} className="text-blue-500" />;
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
        <h1 className="text-xl font-semibold text-gray-800">Call</h1>
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
                  onClick={() => setShowOptionsMenu(false)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  Clear Call Log
                </button>
                <button 
                  onClick={() => setShowOptionsMenu(false)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  Call Settings
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button 
                  onClick={() => setShowOptionsMenu(false)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  Help
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
            placeholder="Search calls..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoFocus
          />
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center px-6 py-3 border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors mr-2 ${
              activeTab === tab
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Calls List */}
      <div className="flex-1 overflow-y-auto">
        {filteredCalls.map((call) => (
          <div
            key={call.id}
            className="flex items-center px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img 
                src={call.avatar} 
                alt={call.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 ml-4">
              <div className="flex items-center space-x-2">
                {getCallIcon(call)}
                <h3 className={`font-semibold ${call.type === 'missed' ? 'text-red-500' : 'text-gray-800'}`}>
                  {call.name}
                </h3>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-gray-500">{call.time}</span>
                {call.duration && (
                  <>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{call.duration}</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => {/* Handle voice call */}}
              >
                <Phone size={18} className="text-blue-500" />
              </button>
              <button 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={onVideoCall}
              >
                <Video size={18} className="text-blue-500" />
              </button>
            </div>
          </div>
        ))}
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
        <button 
          onClick={() => onNavigate('updates')}
          className="flex flex-col items-center space-y-1 text-gray-400 transition-all duration-200 hover:scale-110 active:scale-95 hover:text-gray-600"
        >
          <Bell size={20} />
          <span className="text-xs">Updates</span>
        </button>
        <button className="flex flex-col items-center space-y-1 text-blue-500 transition-all duration-200 hover:scale-110 active:scale-95">
          <Phone size={20} />
          <span className="text-xs font-medium">Calls</span>
        </button>
      </div>
    </div>
  );
};

export default CallsScreen;