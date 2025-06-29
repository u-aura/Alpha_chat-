import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, RotateCcw, Users, MessageCircle } from 'lucide-react';
import { Chat } from '../App';

interface VideoCallScreenProps {
  chat: Chat | null;
  onEndCall: () => void;
}

const VideoCallScreen: React.FC<VideoCallScreenProps> = ({ chat, onEndCall }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  return (
    <div className="h-full bg-gradient-to-b from-gray-900 to-black flex flex-col relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-purple-500 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-pink-500 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 py-3 text-sm font-semibold text-white z-10">
        <span>9:41</span>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-gray-400 rounded-full"></div>
          </div>
          <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          <div className="w-6 h-3 bg-white rounded-sm"></div>
        </div>
      </div>

      {/* Video Call Header */}
      <div className="text-center py-4 z-10">
        <h2 className="text-white text-xl font-semibold">{chat?.name || 'Video Call'}</h2>
        <p className="text-gray-300 text-sm">{formatDuration(callDuration)}</p>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 relative">
        {isScreenSharing ? (
          // Screen Sharing View
          <div className="absolute inset-4 bg-gray-800 rounded-2xl overflow-hidden border-2 border-blue-500">
            <div className="h-full flex flex-col items-center justify-center text-white">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-lg font-semibold mb-2">Screen Sharing</h3>
              <p className="text-gray-300 text-center px-4">
                Sharing your screen with {chat?.name || 'participant'}
              </p>
              {/* Simulated wave effect */}
              <div className="mt-8 flex space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        ) : (
          // Regular Video Call View
          <div className="absolute inset-4 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl overflow-hidden">
            <div className="h-full flex flex-col items-center justify-center text-white">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                <img 
                  src={chat?.avatar || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'} 
                  alt={chat?.name || 'Contact'}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">{chat?.name || 'Contact'}</h3>
              <p className="text-blue-100">Connected</p>
              
              {/* Wave Animation */}
              <div className="mt-8">
                <div className="flex space-x-1">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-white rounded-full animate-pulse"
                      style={{
                        height: `${Math.random() * 20 + 10}px`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Self Video (Picture-in-Picture) */}
        <div className="absolute top-4 right-4 w-24 h-32 bg-gray-700 rounded-lg overflow-hidden border-2 border-white shadow-lg">
          {isVideoOn ? (
            <div className="h-full overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=200&fit=crop"
                alt="You"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="h-full bg-gray-800 flex items-center justify-center text-white">
              <VideoOff size={16} />
            </div>
          )}
        </div>
      </div>

      {/* Call Controls */}
      <div className="px-6 py-8 z-10">
        <div className="flex items-center justify-center space-x-6">
          {/* Mute Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 ${
              isMuted ? 'bg-red-500' : 'bg-gray-700 bg-opacity-80'
            }`}
          >
            {isMuted ? <MicOff size={24} className="text-white" /> : <Mic size={24} className="text-white" />}
          </button>

          {/* End Call Button */}
          <button
            onClick={onEndCall}
            className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <PhoneOff size={28} className="text-white" />
          </button>

          {/* Video Toggle Button */}
          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 ${
              !isVideoOn ? 'bg-red-500' : 'bg-gray-700 bg-opacity-80'
            }`}
          >
            {isVideoOn ? <Video size={24} className="text-white" /> : <VideoOff size={24} className="text-white" />}
          </button>
        </div>

        {/* Additional Controls */}
        <div className="flex items-center justify-center space-x-8 mt-6">
          <button 
            onClick={handleScreenShare}
            className={`p-3 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 ${
              isScreenSharing ? 'bg-blue-500' : 'bg-gray-700 bg-opacity-80'
            }`}
          >
            <RotateCcw size={20} className="text-white" />
          </button>
          
          <button className="p-3 bg-gray-700 bg-opacity-80 rounded-full transition-all duration-200 hover:scale-110 active:scale-95">
            <Users size={20} className="text-white" />
          </button>
          
          <button className="p-3 bg-gray-700 bg-opacity-80 rounded-full transition-all duration-200 hover:scale-110 active:scale-95">
            <MessageCircle size={20} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallScreen;