import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar/Sidebar';
import ChatArea from '../chat/ChatArea';
import AILicenses from '../components/AILicenses';
import ChatHistory from './ChatHistory';
import Settings from './Settings';
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
  const [settings, setSettings] = useState({
    theme: 'dark',
    fontSize: 'medium',
    autoSave: true,
    soundEffects: false,
    apiTimeout: 30,
    maxTokens: 4000,
    temperature: 0.7,
    showTimestamps: true,
    compactMode: false,
    exportFormat: 'json',
    language: 'en'
  });

  // Load settings on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('chatHubSettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setSettings(parsedSettings);
      applySettings(parsedSettings);
    }
  }, []);

  // Apply settings to the app
  const applySettings = (newSettings) => {
    // Apply theme
    document.body.className = newSettings.theme;
    
    // Apply font size
    document.body.style.fontSize = 
      newSettings.fontSize === 'small' ? '14px' :
      newSettings.fontSize === 'large' ? '18px' : '16px';
    
    // Apply compact mode
    if (newSettings.compactMode) {
      document.body.classList.add('compact-mode');
    } else {
      document.body.classList.remove('compact-mode');
    }
  };

  // Update settings and apply them
  const updateSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem('chatHubSettings', JSON.stringify(newSettings));
    applySettings(newSettings);
  };

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
      // Pass settings to sendMessage
      const aiResponse = await sendMessage(userMessage, selectedModel, {
        maxTokens: settings.maxTokens,
        temperature: settings.temperature,
        timeout: settings.apiTimeout * 1000 // Convert to milliseconds
      });
      const aiMessage = { role: "ai", text: aiResponse };
      setMessages(prev => [...prev, aiMessage]);
      
      // Save conversation to history if auto-save is enabled
      if (settings.autoSave) {
        const conversationMessages = [
          { role: "user", content: userMessage },
          { role: "ai", content: aiResponse }
        ];
        saveConversation(selectedModel, conversationMessages);
      }
      
      // Play sound effect if enabled
      if (settings.soundEffects) {
        playNotificationSound();
      }
      
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

  // Sound effect function
  const playNotificationSound = () => {
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
      audio.volume = 0.3;
      audio.play().catch(() => {}); // Ignore errors
    } catch (error) {
      // Ignore sound errors
    }
  };

  const handleLoadConversation = (conversation) => {
    // Convert saved messages back to the format expected by ChatArea
    const loadedMessages = conversation.messages.map(msg => {
      // Handle different possible content structures
      let content = '';
      if (msg.content) {
        content = msg.content;
      } else if (msg.text) {
        content = msg.text;
      } else if (msg.message) {
        content = msg.message;
      }
      
      return {
        role: msg.role || 'user',
        text: String(content || '')
      };
    });
    
    // Set the selected model to the one used in the conversation
    setSelectedModel(conversation.model);
    
    // Set the messages (add welcome message back)
    setMessages([
      { role: "ai", text: "Welcome to ChatHub! Select a model and start chatting." },
      ...loadedMessages
    ]);
    
    // Close the history panel
    console.log(`Loaded conversation with ${conversation.model}`, loadedMessages);
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
      <ChatHistory onLoadConversation={handleLoadConversation} />
      <Settings updateSettings={updateSettings} />
      <AILicenses />
      <Analytics />
    </div>
  );
}

export default App;
