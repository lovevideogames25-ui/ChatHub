import React, { useState } from 'react';
import Layout from '../components/Layout';
import sendMessage from './api.js';
import './App.css';

function App() {
  const [selectedModel, setSelectedModel] = useState('GPT-OSS');
  const [messages, setMessages] = useState([
    { role: "ai", text: "Welcome to ChatHub! Select a model and start chatting." }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (userMessage) => {
    // Only allow GPT-OSS, GEMMA-3, and LLAMA3.2 for now
    if (selectedModel !== 'GPT-OSS' && selectedModel !== 'GEMMA-3' && selectedModel !== 'LLAMA3.2') {
      setMessages(prev => [...prev, { 
        role: "ai", 
        text: `${selectedModel} is not available yet. Please select GPT-OSS, GEMMA-3, or LLAMA3.2 to chat.` 
      }]);
      return;
    }

    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const aiResponse = await sendMessage(userMessage, selectedModel);
      setMessages(prev => [...prev, { role: "ai", text: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: "ai", 
        text: `Error: ${error.message}` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app gradient-bg">
      <Layout 
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
