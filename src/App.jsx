import React, { useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import ChatArea from '../chat/ChatArea';
import AILicenses from '../components/AILicenses';
import sendMessage from './api';
import './App.css';

function App() {
  const [selectedModel, setSelectedModel] = useState('GPT-OSS');
  const [messages, setMessages] = useState([
    { role: "ai", text: "Welcome to ChatHub! Select a model and start chatting." }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (userMessage) => {
    // Only allow GPT-OSS, GEMMA-3, LLAMA3.2, LLAMA-3.1, QWEN3.5, NEMOTRON-3-SUPER, and TRINITY-LARGE-PREVIEW for now
    if (selectedModel !== 'GPT-OSS' && selectedModel !== 'GEMMA-3' && selectedModel !== 'LLAMA3.2' && selectedModel !== 'LLAMA-3.1' && selectedModel !== 'QWEN3.5' && selectedModel !== 'NEMOTRON-3-SUPER' && selectedModel !== 'TRINITY-LARGE-PREVIEW') {
      setMessages(prev => [...prev, { 
        role: "ai", 
        text: `${selectedModel} is not available yet. Please select GPT-OSS, GEMMA-3, LLAMA3.2, LLAMA-3.1, QWEN3.5, NEMOTRON-3-SUPER, or TRINITY-LARGE-PREVIEW to chat.` 
      }]);
      return;
    }

    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const aiResponse = await sendMessage(userMessage, selectedModel);
      setMessages(prev => [...prev, { role: "ai", text: aiResponse }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        role: "ai", 
        text: `Error: ${error.message || "Failed to get response from ${selectedModel}"}` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <Sidebar selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
      <ChatArea 
        messages={messages} 
        onSendMessage={handleSendMessage} 
        selectedModel={selectedModel}
        isLoading={isLoading}
      />
      <AILicenses />
    </div>
  );
}

export default App;
