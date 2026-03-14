import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import ChatArea from '../chat/ChatArea';
import AILicenses from './AILicenses';
import './Layout.css';

const Layout = ({ selectedModel, setSelectedModel, messages, onSendMessage, isLoading }) => {
  return (
    <div className="layout">
      <Sidebar 
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />
      <div className="main-content">
        <ChatArea 
          messages={messages}
          onSendMessage={onSendMessage}
          selectedModel={selectedModel}
          isLoading={isLoading}
        />
        <AILicenses />
      </div>
    </div>
  );
};

export default Layout;
