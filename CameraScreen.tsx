import React, { useState } from 'react';
import { ArrowLeft, RotateCcw, Zap, ZapOff, MoreVertical, Camera, Video, Image } from 'lucide-react';

interface CameraScreenProps {
  onBack: () => void;
}

const CameraScreen: React.FC<CameraScreenProps> = ({ onBack }) => {
  const [flashOn, setFlashOn] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [cameraMode, setCameraMode] = useState<'photo' | 'video'>('photo');

  const recentPhotos = [
    'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    'https://images.pexels.com/photos/1366942/pexels-photo-1366942.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  ];

  return (
    <div className="h-full bg-black flex flex-col relative overflow-hidden">
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

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 z-10">
        <button 
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-800 transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>
        <h1 className="text-xl font-semibold text-white">Camera</h1>
        <div className="relative">
          <button 
            onClick={() => setShowOptions(!showOptions)}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <MoreVertical size={20} className="text-white" />
          </button>
          
          {showOptions && (
            <div className="absolute top-12 right-0 bg-gray-900 rounded-2xl shadow-xl border border-gray-700 py-2 min-w-48 z-10">
              <button className="w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors text-white">
                Timer
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors text-white">
                Grid
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors text-white">
                Settings
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Camera Viewfinder */}
      <div className="flex-1 relative">
        <div className="absolute inset-4 rounded-2xl overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop"
            alt="Camera View"
            className="w-full h-full object-cover"
          />
          
          {/* Camera Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-20">
            {/* Flash Toggle */}
            <div className="absolute top-4 right-4">
              <button 
                onClick={() => setFlashOn(!flashOn)}
                className={`p-3 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 ${
                  flashOn ? 'bg-yellow-500' : 'bg-gray-800 bg-opacity-60'
                }`}
              >
                {flashOn ? <Zap size={20} className="text-white" /> : <ZapOff size={20} className="text-white" />}
              </button>
            </div>

            {/* Camera Flip */}
            <div className="absolute top-4 left-4">
              <button className="p-3 bg-gray-800 bg-opacity-60 rounded-full transition-all duration-200 hover:scale-110 active:scale-95">
                <RotateCcw size={20} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Camera Controls */}
      <div className="px-6 py-8 z-10">
        {/* Mode Selector */}
        <div className="flex items-center justify-center space-x-8 mb-6">
          <button
            onClick={() => setCameraMode('photo')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              cameraMode === 'photo' ? 'bg-white text-black' : 'text-white'
            }`}
          >
            Photo
          </button>
          <button
            onClick={() => setCameraMode('video')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              cameraMode === 'video' ? 'bg-white text-black' : 'text-white'
            }`}
          >
            Video
          </button>
        </div>

        {/* Capture Controls */}
        <div className="flex items-center justify-between">
          {/* Recent Photos */}
          <div className="flex space-x-2">
            {recentPhotos.map((photo, index) => (
              <button
                key={index}
                className="w-12 h-12 rounded-lg overflow-hidden border-2 border-white hover:scale-105 transition-transform"
              >
                <img 
                  src={photo} 
                  alt={`Recent ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Capture Button */}
          <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-all duration-200 active:scale-95 shadow-lg">
            {cameraMode === 'photo' ? (
              <Camera size={32} className="text-black" />
            ) : (
              <Video size={32} className="text-black" />
            )}
          </button>

          {/* Gallery Button */}
          <button className="w-12 h-12 bg-gray-800 bg-opacity-60 rounded-lg flex items-center justify-center hover:scale-105 transition-transform">
            <Image size={20} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraScreen;