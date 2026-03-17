import React, { useState, useEffect } from 'react';
import { loadChatHistory, clearChatHistory } from './chatHistoryUtil';

function ChatHistory({ onLoadConversation }) {
  const [history, setHistory] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const loadedHistory = loadChatHistory();
      setHistory(loadedHistory);
    }
  }, [isOpen]);

  const handleClearHistory = () => {
    setShowWarning(true);
  };

  const confirmClearHistory = () => {
    clearChatHistory();
    setHistory([]);
    setShowWarning(false);
    console.log('All chat memory cleared');
  };

  const cancelClearHistory = () => {
    setShowWarning(false);
  };

  const handleLoadConversation = (conversation) => {
    if (onLoadConversation) {
      onLoadConversation(conversation);
    }
  };

  const handleLoadAllConversations = () => {
    if (onLoadConversation && history.length > 0) {
      // Combine all conversations into one
      const allMessages = [];
      let lastModel = 'GPT-OSS'; // default

      history.forEach(conv => {
        // Add a separator between conversations
        if (allMessages.length > 0) {
          allMessages.push({
            role: "ai",
            text: `--- Switched to ${conv.model} ---`
          });
        }
        
        // Add all messages from this conversation
        conv.messages.forEach(msg => {
          // Ensure content exists and is a string
          const content = msg.content || '';
          allMessages.push({
            role: msg.role || 'user',
            text: String(content)
          });
        });
        
        lastModel = conv.model;
      });

      // Create a combined conversation object
      const combinedConversation = {
        id: 'all-conversations',
        timestamp: new Date().toISOString(),
        model: lastModel,
        messages: allMessages
      };

      onLoadConversation(combinedConversation);
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
        {isOpen ? 'Hide Memory' : 'Show Memory'}
      </button>
      
      {isOpen && (
        <div className="history-panel">
          <div className="history-header">
            <h3>Chat Memory</h3>
            <div className="header-actions">
              <button 
                className="load-all-btn"
                onClick={handleLoadAllConversations}
                disabled={history.length === 0}
              >
                LOAD ALL
              </button>
              <button 
                className="clear-history-btn"
                onClick={handleClearHistory}
                disabled={history.length === 0}
              >
                Clear Memory
              </button>
            </div>
          </div>
          
          {history.length === 0 ? (
            <div className="no-history">
              <p>No chat memory yet</p>
            </div>
          ) : (
            <div className="conversation-list">
              {history.map(conv => (
                <div 
                  key={conv.id}
                  className="conversation-item"
                  onClick={() => handleLoadConversation(conv)}
                >
                  <div className="conversation-header">
                    <span className="model-name">{conv.model}</span>
                    <span className="timestamp">{formatDate(conv.timestamp)}</span>
                    <button 
                      className="load-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLoadConversation(conv);
                      }}
                    >
                      LOAD
                    </button>
                  </div>
                  <div className="conversation-preview">
                    {conv.messages[0]?.content?.substring(0, 50)}...
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Enhanced Warning Modal */}
      {showWarning && (
        <div className="warning-overlay">
          <div className="warning-modal">
            <div className="warning-icon">⚠️</div>
            <h2>WARNING: THIS CLEARS YOUR WHOLE CHAT MEMORY</h2>
            <p>Are you absolutely sure you want to delete all your chat history?</p>
            <p>This action cannot be undone and will permanently erase:</p>
            <ul>
              <li>All conversations from every AI model</li>
              <li>Your entire chat history</li>
              <li>All saved messages and responses</li>
            </ul>
            <div className="warning-actions">
              <button 
                className="confirm-delete-btn"
                onClick={confirmClearHistory}
              >
                YES, DELETE EVERYTHING
              </button>
              <button 
                className="cancel-delete-btn"
                onClick={cancelClearHistory}
              >
                CANCEL - KEEP MY MEMORY
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatHistory;
