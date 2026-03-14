import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import ChatArea from '../chat/ChatArea';
import './Layout.css';

const Layout = ({ selectedModel, setSelectedModel, messages, onSendMessage, isLoading }) => {
  return (
    <div className="layout">
      <Sidebar 
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />
      <ChatArea 
        messages={messages}
        onSendMessage={onSendMessage}
        selectedModel={selectedModel}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Layout;
