import React from 'react';
import { ArrowLeft, User, Bell, Shield, Palette, Globe, HelpCircle, Info, LogOut, Moon, Wifi, Battery, Volume2 } from 'lucide-react';

interface SettingsScreenProps {
  onBack: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const settingsGroups = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Account Settings', color: 'text-blue-500', bgColor: 'bg-blue-100' },
        { icon: Shield, label: 'Privacy & Security', color: 'text-green-500', bgColor: 'bg-green-100' },
        { icon: Bell, label: 'Notifications', color: 'text-orange-500', bgColor: 'bg-orange-100' }
      ]
    },
    {
      title: 'Appearance',
      items: [
        { icon: Palette, label: 'Theme', color: 'text-purple-500', bgColor: 'bg-purple-100' },
        { icon: Moon, label: 'Dark Mode', color: 'text-gray-600', bgColor: 'bg-gray-100' },
        { icon: Globe, label: 'Language', color: 'text-indigo-500', bgColor: 'bg-indigo-100' }
      ]
    },
    {
      title: 'Device',
      items: [
        { icon: Volume2, label: 'Sound & Vibration', color: 'text-pink-500', bgColor: 'bg-pink-100' },
        { icon: Wifi, label: 'Network & Storage', color: 'text-cyan-500', bgColor: 'bg-cyan-100' },
        { icon: Battery, label: 'Battery Optimization', color: 'text-yellow-500', bgColor: 'bg-yellow-100' }
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help & Support', color: 'text-teal-500', bgColor: 'bg-teal-100' },
        { icon: Info, label: 'About', color: 'text-gray-600', bgColor: 'bg-gray-100' }
      ]
    }
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
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Settings</h1>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="px-6 py-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              {group.title}
            </h3>
            <div className="space-y-2">
              {group.items.map((item, index) => (
                <button
                  key={index}
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
        ))}

        {/* Logout Button */}
        <div className="px-6 py-4 border-t border-gray-100">
          <button className="w-full flex items-center space-x-4 p-4 hover:bg-red-50 rounded-xl transition-colors">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <LogOut size={18} className="text-red-600" />
            </div>
            <span className="flex-1 text-left text-red-600 font-medium">Logout</span>
          </button>
        </div>

        {/* App Version */}
        <div className="px-6 py-4 text-center">
          <p className="text-sm text-gray-500">Alpha Chat v2.1.0</p>
          <p className="text-xs text-gray-400 mt-1">Build 2025.01.15</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;