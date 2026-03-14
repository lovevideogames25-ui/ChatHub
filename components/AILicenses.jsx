import React, { useState, useEffect } from 'react';
import './AILicenses.css';

const AILicenses = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-show on first visit (using localStorage to track if user has seen it)
  useEffect(() => {
    const hasSeenLicenses = localStorage.getItem('chathub-licenses-seen');
    if (!hasSeenLicenses) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('chathub-licenses-seen', 'true');
  };

  const handleLicenseClick = (model) => {
    if (model === 'GPT-OSS') {
      window.open('https://raw.githubusercontent.com/openai/gpt-oss/refs/heads/main/LICENSE', '_blank');
    } else if (model === 'GEMMA-3') {
      window.open('https://ai.google.dev/gemma/terms', '_blank');
    } else if (model === 'LLAMA3.2') {
      window.open('https://www.llama.com/llama3_2/license/', '_blank');
    } else if (model === 'DEEPSEEK-V3') {
      window.open('https://raw.githubusercontent.com/deepseek-ai/DeepSeek-V3/refs/heads/main/LICENSE-CODE', '_blank');
    } else if (model === 'DEEPSEEK-V3') {
      window.open('https://raw.githubusercontent.com/deepseek-ai/DeepSeek-V3/refs/heads/main/LICENSE-MODEL', '_blank');
    }
  };

  const licenses = [
    { model: 'GPT-OSS', license: 'Apache 2.0', clickable: true },
    { model: 'GEMMA-3', license: 'GEMMA TERMS OF USE', clickable: true },
    { model: 'LLAMA3.2', license: 'Meta Community License', clickable: true },
    { model: 'DEEPSEEK-V3', license: 'MIT License', clickable: true },
    { model: 'DEEPSEEK-V3', license: 'DEEPSEEK LICENCE (Model)', clickable: true }
  ];

  if (!isVisible) {
    return (
      <div className="ai-licenses compact">
        <button 
          className="licenses-show-button"
          onClick={() => setIsVisible(true)}
        >
          AI Model Licenses
        </button>
      </div>
    );
  }

  return (
    <div className="ai-licenses visible">
      <div className="licenses-header">
        <span className="licenses-title">AI Models & Licenses</span>
        <button 
          className="licenses-close-button"
          onClick={handleClose}
          aria-label="Close licenses"
        >
          ×
        </button>
      </div>
      
      <div className="licenses-content">
        <ul className="licenses-list">
          {licenses.map((item, index) => (
            <li key={`${item.model}-${index}`} className="license-item">
              <span className="model-name">{item.model}</span>
              <span 
                className={`license-name ${item.clickable ? 'clickable' : ''}`}
                onClick={() => handleLicenseClick(item.model)}
              >
                – {item.license}
              </span>
            </li>
          ))}
        </ul>
        <div className="licenses-footer">
          <a 
            href="https://openrouter.ai/models" 
            target="_blank" 
            rel="noopener noreferrer"
            className="licenses-link"
          >
            View Official Licenses →
          </a>
        </div>
      </div>
    </div>
  );
};

export default AILicenses;
