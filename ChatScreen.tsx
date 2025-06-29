import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Phone, Video, Smile, Send, Mic, MoreVertical } from 'lucide-react';
import { Chat, Message } from '../App';

interface ChatScreenProps {
  chat: Chat;
  onBack: () => void;
  onVideoCall: () => void;
  onContactSelect: (contact: Chat) => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ chat, onBack, onVideoCall, onContactSelect }) => {
  const [message, setMessage] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Ipsum reprehenderit ea nulla velit dolore laborum in id sint tempor et magna tempor veniam. Pariatur cillum venia dolore',
      timestamp: new Date(),
      isOwn: false
    },
    {
      id: '2',
      text: 'Cupidatat exercitation',
      timestamp: new Date(),
      isOwn: false
    },
    {
      id: '3',
      text: 'Mollit excepteur eiusmod conse',
      timestamp: new Date(),
      isOwn: true
    },
    {
      id: '4',
      text: 'Exercitation ea id',
      timestamp: new Date(),
      isOwn: true
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message,
        timestamp: new Date(),
        isOwn: true
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
        <div className="flex items-center space-x-3">
          <button 
            onClick={onBack} 
            className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <button 
            onClick={() => onContactSelect(chat)}
            className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src={chat.avatar} 
                  alt={chat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {chat.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{chat.name}</h3>
              <p className="text-xs text-green-500">Active now</p>
            </div>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-110 active:scale-95"
            onClick={onVideoCall}
          >
            <Phone size={20} className="text-blue-500" />
          </button>
          <button 
            onClick={onVideoCall}
            className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <Video size={20} className="text-blue-500" />
          </button>
          <div className="relative">
            <button 
              onClick={() => setShowOptions(!showOptions)}
              className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <MoreVertical size={20} className="text-gray-600" />
            </button>
            
            {showOptions && (
              <div className="absolute top-12 right-0 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 min-w-48 z-10">
                <button 
                  onClick={() => onContactSelect(chat)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  View Contact
                </button>
                <button className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors">
                  Media, Links & Docs
                </button>
                <button className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors">
                  Search
                </button>
                <button className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors">
                  Mute Notifications
                </button>
                <button className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors">
                  Wallpaper
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors text-red-600">
                  Block
                </button>
                <button className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors text-red-600">
                  Delete Chat
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl ${
                msg.isOwn
                  ? 'bg-blue-500 text-white rounded-br-md'
                  : 'bg-gray-100 text-gray-800 rounded-bl-md'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-4 border-t border-gray-100 bg-white">
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-110 active:scale-95">
            <Smile size={20} className="text-gray-600" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message"
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {message.trim() ? (
            <button
              onClick={handleSendMessage}
              className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <Send size={16} className="text-white" />
            </button>
          ) : (
            <button className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-110 active:scale-95">
              <Mic size={20} className="text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Virtual Keyboard Simulation */}
      <div className="bg-gray-200 px-4 py-3">
        <div className="grid grid-cols-10 gap-1 text-sm">
          {['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'].map((key) => (
            <button
              key={key}
              className="bg-white p-2 rounded text-center hover:bg-gray-100 transition-colors"
              onClick={() => setMessage(message + key)}
            >
              {key}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-9 gap-1 text-sm mt-1">
          {['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'].map((key) => (
            <button
              key={key}
              className="bg-white p-2 rounded text-center hover:bg-gray-100 transition-colors"
              onClick={() => setMessage(message + key)}
            >
              {key}
            </button>
          ))}
        </div>
        <div className="flex gap-1 text-sm mt-1">
          <button className="bg-white p-2 rounded hover:bg-gray-100 flex-1 transition-colors">
            123
          </button>
          <button 
            className="bg-white p-2 rounded hover:bg-gray-100 flex-1 transition-colors"
            onClick={() => setMessage(message + ' ')}
          >
            space
          </button>
          <button 
            className="bg-blue-400 text-white p-2 rounded hover:bg-blue-500 flex-1 transition-colors"
            onClick={handleSendMessage}
          >
            done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;