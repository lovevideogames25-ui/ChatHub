import React, { useState } from 'react';
import './InputBar.css';

const InputBar = ({ value, onChange, onSend, onKeyPress, isLoading }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className={`input-bar ${isFocused ? 'focused' : ''}`}>
      <div className="input-container">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={onKeyPress}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Type your message..."
          className="message-input"
          rows={1}
        />
        <button 
          onClick={onSend}
          disabled={!value.trim() || isLoading}
          className="send-button"
        >
          {isLoading ? (
            <span className="loading-spinner">⟳</span>
          ) : (
            <span className="send-icon">→</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputBar;
