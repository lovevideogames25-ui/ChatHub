import React, { useState } from 'react';
import './Sidebar.css';

const models = [
  { name: 'GPT-OSS', status: 'WORKING' },
  { name: 'GEMMA-3', status: 'WORKING' },
  { name: 'LLAMA3.2', status: 'DOWN' },
  { name: 'LLAMA-3.1', status: 'WORKING' },
  { name: 'QWEN3.5', status: 'WORKING' },
  { name: 'NEMOTRON-3-SUPER', status: 'WORKING' },
  { name: 'TRINITY-LARGE-PREVIEW', status: 'WORKING' },
];

const Sidebar = ({ selectedModel, setSelectedModel }) => {
  const [showWarning, setShowWarning] = useState(false);

  const handleModelSelect = (modelName) => {
    if (modelName === 'QWEN3.5') {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
    setSelectedModel(modelName);
  };

  return (
    <div className="sidebar">
      {showWarning && (
        <div className="thinking-warning">
          ⚠️ THINKING MODEL: THIS MODEL IS A THINKING MODEL SO IT MIGHT TAKE A LONG TIME
        </div>
      )}
      <div className="sidebar-header">
        <div className="logo-container">
          <span className="logo-emoji">🤖</span>
          <h2>ChatHub</h2>
        </div>
        <div className="model-indicator">
          <span className="indicator-text">Model:</span>
          <span className="indicator-model">{selectedModel}</span>
        </div>
      </div>
      
      <div className="model-list">
        <h3>Available Models</h3>
        {models.map((model) => (
          <div
            key={model.name}
            className={`model-item ${selectedModel === model.name ? 'selected' : ''} ${model.name === 'GEMMA-3' ? 'gemma-green' : ''}`}
            onClick={() => handleModelSelect(model.name)}
          >
            <div className="model-info">
              <span className="model-name">{model.name}</span>
              <span className={`model-status ${model.status.toLowerCase().replace(' ', '-')}`}>
                {model.status}
              </span>
            </div>
            {selectedModel === model.name && (
              <span className="selected-indicator">✓</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
