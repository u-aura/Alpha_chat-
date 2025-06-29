import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import SignInScreen from './components/SignInScreen';
import ChatListScreen from './components/ChatListScreen';
import ChatScreen from './components/ChatScreen';
import UpdatesScreen from './components/UpdatesScreen';
import VideoCallScreen from './components/VideoCallScreen';
import ProfileScreen from './components/ProfileScreen';
import CallsScreen from './components/CallsScreen';
import ContactProfileScreen from './components/ContactProfileScreen';
import SettingsScreen from './components/SettingsScreen';
import CameraScreen from './components/CameraScreen';

export type Screen = 'splash' | 'signin' | 'chatlist' | 'chat' | 'updates' | 'videocall' | 'profile' | 'calls' | 'contactprofile' | 'settings' | 'camera';

export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isOwn: boolean;
  isRead?: boolean;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  phone?: string;
  email?: string;
  bio?: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  phone?: string;
  email?: string;
  bio?: string;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [selectedContact, setSelectedContact] = useState<Chat | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser] = useState<User>({
    id: '1',
    name: 'Rosie',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    isOnline: true,
    phone: '+91 98765 43210',
    email: 'rosie@example.com',
    bio: 'Living life to the fullest! 🌟'
  });

  useEffect(() => {
    // Simulate splash screen duration
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        setCurrentScreen('signin');
      } else {
        setCurrentScreen('chatlist');
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  const handleSignIn = () => {
    setIsAuthenticated(true);
    setCurrentScreen('chatlist');
  };

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
    setCurrentScreen('chat');
  };

  const handleContactSelect = (contact: Chat) => {
    setSelectedContact(contact);
    setCurrentScreen('contactprofile');
  };

  const handleBackToChats = () => {
    setSelectedChat(null);
    setSelectedContact(null);
    setCurrentScreen('chatlist');
  };

  const handleNavigation = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleVideoCall = () => {
    setCurrentScreen('videocall');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'signin':
        return <SignInScreen onSignIn={handleSignIn} />;
      case 'chatlist':
        return (
          <ChatListScreen 
            onChatSelect={handleChatSelect}
            onNavigate={handleNavigation}
            currentUser={currentUser}
          />
        );
      case 'chat':
        return selectedChat ? (
          <ChatScreen 
            chat={selectedChat}
            onBack={handleBackToChats}
            onVideoCall={handleVideoCall}
            onContactSelect={handleContactSelect}
          />
        ) : null;
      case 'updates':
        return <UpdatesScreen onNavigate={handleNavigation} />;
      case 'calls':
        return <CallsScreen onNavigate={handleNavigation} onVideoCall={handleVideoCall} />;
      case 'videocall':
        return (
          <VideoCallScreen 
            chat={selectedChat}
            onEndCall={handleBackToChats}
          />
        );
      case 'profile':
        return (
          <ProfileScreen 
            user={currentUser}
            onNavigate={handleNavigation}
          />
        );
      case 'contactprofile':
        return selectedContact ? (
          <ContactProfileScreen 
            contact={selectedContact}
            onBack={() => setCurrentScreen('chat')}
            onVideoCall={handleVideoCall}
          />
        ) : null;
      case 'settings':
        return (
          <SettingsScreen 
            onBack={() => setCurrentScreen('profile')}
          />
        );
      case 'camera':
        return (
          <CameraScreen 
            onBack={() => setCurrentScreen('updates')}
          />
        );
      default:
        return <SplashScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="relative h-screen max-h-[900px]">
          {renderScreen()}
        </div>
      </div>
    </div>
  );
}

export default App;