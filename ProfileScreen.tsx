import React from 'react';
import { ArrowLeft, Phone, Mail, Edit3, Settings, Bell, Shield, HelpCircle, LogOut, Image, Video, FileText } from 'lucide-react';
import { User, Screen } from '../App';

interface ProfileScreenProps {
  user: User;
  onNavigate: (screen: Screen) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onNavigate }) => {
  const menuItems = [
    { icon: Edit3, label: 'Edit Profile', color: 'text-blue-500', bgColor: 'bg-blue-100' },
    { icon: Bell, label: 'Notifications', color: 'text-green-500', bgColor: 'bg-green-100' },
    { icon: Shield, label: 'Privacy & Security', color: 'text-purple-500', bgColor: 'bg-purple-100' },
    { 
      icon: Settings, 
      label: 'Settings', 
      color: 'text-gray-600', 
      bgColor: 'bg-gray-100',
      onClick: () => onNavigate('settings')
    },
    { icon: HelpCircle, label: 'Help & Support', color: 'text-orange-500', bgColor: 'bg-orange-100' },
    { icon: LogOut, label: 'Logout', color: 'text-red-500', bgColor: 'bg-red-100' }
  ];

  const mediaItems = [
    { type: 'image', url: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { type: 'image', url: 'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { type: 'video', url: 'https://images.pexels.com/photos/1366942/pexels-photo-1366942.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { type: 'image', url: 'https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { type: 'image', url: 'https://images.pexels.com/photos/1366909/pexels-photo-1366909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { type: 'video', url: 'https://images.pexels.com/photos/1366925/pexels-photo-1366925.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' }
  ];

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
        <button 
          onClick={() => onNavigate('chatlist')}
          className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Profile</h1>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Profile Header */}
        <div className="px-6 py-8 text-center">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            {user.isOnline && (
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-3 border-white"></div>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">{user.name}</h2>
          <p className="text-gray-600 mt-2">{user.bio}</p>
        </div>

        {/* Contact Info */}
        <div className="px-6 py-4 space-y-4">
          <button className="w-full flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Phone size={18} className="text-blue-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-gray-800 font-medium">{user.phone}</p>
            </div>
          </button>

          <button className="w-full flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Mail size={18} className="text-green-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-800 font-medium">{user.email}</p>
            </div>
          </button>
        </div>

        {/* Media Section */}
        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Media & Files</h3>
          <div className="grid grid-cols-3 gap-2">
            {mediaItems.map((item, index) => (
              <button
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden hover:scale-105 transition-transform"
              >
                <img 
                  src={item.url} 
                  alt={`Media ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {item.type === 'video' && (
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <Video size={20} className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-6 py-4 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className={`w-10 h-10 ${item.bgColor} rounded-full flex items-center justify-center`}>
                <item.icon size={18} className={item.color} />
              </div>
              <span className="flex-1 text-left text-gray-800 font-medium">{item.label}</span>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;