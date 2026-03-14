import React from 'react';
import './Sidebar.css';

const models = [
  { name: 'GPT-OSS', status: 'WORKING' },
  { name: 'GEMMA-3', status: 'DOWN' },
  { name: 'LLAMA3.2', status: 'DOWN' },
  { name: 'DEEPSEEK-V3', status: 'COMING SOON' }
];

const Sidebar = ({ selectedModel, setSelectedModel }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <img src="/favicon.png" alt="ChatHub Logo" className="logo" />
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
            className={`model-item ${selectedModel === model.name ? 'selected' : ''}`}
            onClick={() => setSelectedModel(model.name)}
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
