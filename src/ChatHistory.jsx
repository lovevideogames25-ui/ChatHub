import React, { useState, useEffect } from 'react';
import { loadChatHistory, deleteConversation, clearChatHistory } from './chatHistoryUtil';

function ChatHistory({ onLoadConversation }) {
  const [history, setHistory] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const loadedHistory = loadChatHistory();
      setHistory(loadedHistory);
    }
  }, [isOpen]);

  const handleDeleteConversation = (id) => {
    deleteConversation(id);
    setHistory(prev => prev.filter(conv => conv.id !== id));
    if (selectedConversation?.id === id) {
      setSelectedConversation(null);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all chat history?')) {
      clearChatHistory();
      setHistory([]);
      setSelectedConversation(null);
    }
  };

  const handleLoadConversation = (conversation) => {
    if (onLoadConversation) {
      onLoadConversation(conversation);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="chat-history">
      <button 
        className="history-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Hide History' : 'Show History'}
      </button>
      
      {isOpen && (
        <div className="history-panel">
          <div className="history-header">
            <h3>Chat History</h3>
            <button 
              className="clear-history-btn"
              onClick={handleClearHistory}
              disabled={history.length === 0}
            >
              Clear All
            </button>
          </div>
          
          <div className="history-content">
            <div className="conversation-list">
              {history.length === 0 ? (
                <p>No chat history yet</p>
              ) : (
                history.map(conv => (
                  <div 
                    key={conv.id}
                    className={`conversation-item ${selectedConversation?.id === conv.id ? 'active' : ''}`}
                    onClick={() => setSelectedConversation(conv)}
                  >
                    <div className="conversation-header">
                      <span className="model-name">{conv.model}</span>
                      <span className="timestamp">{formatDate(conv.timestamp)}</span>
                      <div className="conversation-actions">
                        <button 
                          className="load-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLoadConversation(conv);
                          }}
                        >
                          LOAD
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteConversation(conv.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="conversation-preview">
                      {conv.messages[0]?.content?.substring(0, 50)}...
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {selectedConversation && (
              <div className="conversation-detail">
                <div className="detail-header">
                  <h4>{selectedConversation.model} - {formatDate(selectedConversation.timestamp)}</h4>
                </div>
                <div className="messages">
                  {selectedConversation.messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`}>
                      <div className="message-role">{msg.role.toUpperCase()}</div>
                      <div className="message-content">{msg.content}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatHistory;
