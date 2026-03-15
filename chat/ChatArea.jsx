import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import InputBar from './InputBar';
import './ChatArea.css';

const ChatArea = ({ messages, onSendMessage, selectedModel, isLoading }) => {
  const [inputValue, setInputValue] = useState('');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 100;
      setShowScrollButton(!isAtBottom);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-area">
      <div className="chat-header">
        <h1>Chat with {selectedModel}</h1>
        <div className="status-indicator">
          <span className="status-dot"></span>
          <span className="status-text">Online</span>
        </div>
      </div>
      
      <div className="messages-container" ref={messagesContainerRef}>
        {messages.map((message, index) => (
          <MessageBubble 
            key={index} 
            message={message} 
            isUser={message.role === 'user'}
          />
        ))}
        {isLoading && (
          <div className="message-bubble ai fade-in">
            <div className="message-content">
              <div className="message-avatar">
                🤖
              </div>
              <div className="message-text thinking">
                <div className="thinking-dots">
                  <span>Thinking</span>
                  <span className="dot-1">.</span>
                  <span className="dot-2">.</span>
                  <span className="dot-3">.</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <button 
        className={`scroll-to-bottom ${showScrollButton ? 'visible' : ''}`}
        onClick={scrollToBottom}
        aria-label="Scroll to bottom"
      >
        ↓
      </button>
      
      <InputBar
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
        onKeyPress={handleKeyPress}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ChatArea;
