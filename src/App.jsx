import React, { useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import ChatArea from '../chat/ChatArea';
import AILicenses from '../components/AILicenses';
import ChatHistory from './ChatHistory';
import sendMessage from './api';
import { saveConversation } from './chatHistoryUtil';
import { Analytics } from '@vercel/analytics/react';
import './App.css';

function App() {
  const [selectedModel, setSelectedModel] = useState('GPT-OSS');
  const [messages, setMessages] = useState([
    { role: "ai", text: "Welcome to ChatHub! Select a model and start chatting." }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const models = [
    { name: 'GPT-OSS', description: 'Advanced reasoning and analysis' },
    { name: 'GEMMA-3', description: 'Google\'s efficient multimodal model' },
    { name: 'LLAMA-3.1', description: 'Meta\'s balanced open-source model' },
    { name: 'QWEN3.5', description: 'Alibaba\'s powerful multilingual model' },
    { name: 'NEMOTRON-3-SUPER', description: 'NVIDIA\'s top-tier reasoning model' },
    { name: 'TRINITY-LARGE-PREVIEW', description: 'Advanced conversational AI' },
    { name: 'DEEPSEEK-V3.2', description: 'DeepSeek\'s advanced reasoning model' }
  ];

  const handleSendMessage = async (userMessage) => {
    // Only allow GPT-OSS, GEMMA-3, LLAMA-3.1, QWEN3.5, NEMOTRON-3-SUPER, TRINITY-LARGE-PREVIEW, and DEEPSEEK-V3.2 for now
    if (!models.find(model => model.name === selectedModel)) {
      setMessages(prev => [...prev, { 
        role: "ai", 
        text: `${selectedModel} is not available yet. Please select a supported model to chat.` 
      }]);
      return;
    }

    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const aiResponse = await sendMessage(userMessage, selectedModel);
      const aiMessage = { role: "ai", text: aiResponse };
      setMessages(prev => [...prev, aiMessage]);
      
      // Save conversation to history
      const conversationMessages = [
        { role: "user", content: userMessage },
        { role: "ai", content: aiResponse }
      ];
      saveConversation(selectedModel, conversationMessages);
      
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
      <ChatHistory />
      <AILicenses />
      <Analytics />
    </div>
  );
}

export default App;
