import React, { useState, useEffect } from 'react';

function Settings({ updateSettings }) {
  const [isOpen, setIsOpen] = useState(false);
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

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('chatHubSettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setSettings(parsedSettings);
    }
  }, []);

  const saveSettings = (newSettings) => {
    setSettings(newSettings);
    if (updateSettings) {
      updateSettings(newSettings);
    }
  };

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    saveSettings(newSettings);
    
    // Show immediate visual feedback
    if (key === 'theme') {
      showThemeNotification(value);
    }
  };

  const showThemeNotification = (theme) => {
    const indicator = document.createElement('div');
    indicator.className = 'theme-notification';
    indicator.textContent = `🎨 ${theme.charAt(0).toUpperCase() + theme.slice(1)} Theme Applied`;
    indicator.style.background = theme === 'light' ? '#3b82f6' : '#6b7280';
    document.body.appendChild(indicator);
    
    setTimeout(() => {
      indicator.classList.add('show');
      setTimeout(() => {
        indicator.classList.remove('show');
        setTimeout(() => {
          if (document.body.contains(indicator)) {
            document.body.removeChild(indicator);
          }
        }, 300);
      }, 2000);
    }, 100);
  };

  const resetSettings = () => {
    const defaultSettings = {
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
    };
    saveSettings(defaultSettings);
    showThemeNotification('Reset to Defaults');
  };

  return (
    <div className="settings">
      <button 
        className="settings-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Settings"
      >
        ⚙️
      </button>
      
      {isOpen && (
        <div className="settings-panel">
          <div className="settings-header">
            <div className="header-title">
              <h3>Settings</h3>
              <span className="subtitle">Customize your ChatHub experience</span>
            </div>
            <button 
              className="close-settings-btn"
              onClick={() => setIsOpen(false)}
              title="Close Settings"
            >
              ×
            </button>
          </div>
          
          <div className="settings-content">
            {/* Appearance Section */}
            <div className="settings-section">
              <div className="section-header">
                <span className="section-icon">🎨</span>
                <h4>Appearance</h4>
              </div>
              
              <div className="setting-group">
                <div className="setting-item">
                  <div className="setting-label">
                    <span className="label-text">Theme</span>
                    <span className="label-description">Choose your preferred color scheme</span>
                  </div>
                  <div className="setting-control">
                    <select 
                      value={settings.theme}
                      onChange={(e) => handleSettingChange('theme', e.target.value)}
                      className="theme-select"
                    >
                      <option value="dark">🌙 Dark</option>
                      <option value="light">☀️ Light</option>
                      <option value="auto">🔄 Auto</option>
                    </select>
                  </div>
                </div>
                
                <div className="setting-item">
                  <div className="setting-label">
                    <span className="label-text">Font Size</span>
                    <span className="label-description">Adjust text size for better readability</span>
                  </div>
                  <div className="setting-control">
                    <div className="font-size-buttons">
                      <button 
                        className={`font-btn ${settings.fontSize === 'small' ? 'active' : ''}`}
                        onClick={() => handleSettingChange('fontSize', 'small')}
                      >
                        Small
                      </button>
                      <button 
                        className={`font-btn ${settings.fontSize === 'medium' ? 'active' : ''}`}
                        onClick={() => handleSettingChange('fontSize', 'medium')}
                      >
                        Medium
                      </button>
                      <button 
                        className={`font-btn ${settings.fontSize === 'large' ? 'active' : ''}`}
                        onClick={() => handleSettingChange('fontSize', 'large')}
                      >
                        Large
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="setting-item">
                  <div className="setting-label">
                    <span className="label-text">Compact Mode</span>
                    <span className="label-description">Reduce UI spacing for more content</span>
                  </div>
                  <div className="setting-control">
                    <label className="toggle-switch">
                      <input 
                        type="checkbox"
                        checked={settings.compactMode}
                        onChange={(e) => handleSettingChange('compactMode', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Section */}
            <div className="settings-section">
              <div className="section-header">
                <span className="section-icon">💬</span>
                <h4>Chat</h4>
              </div>
              
              <div className="setting-group">
                <div className="setting-item">
                  <div className="setting-label">
                    <span className="label-text">Auto-save Conversations</span>
                    <span className="label-description">Automatically save your chat history</span>
                  </div>
                  <div className="setting-control">
                    <label className="toggle-switch">
                      <input 
                        type="checkbox"
                        checked={settings.autoSave}
                        onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
                
                <div className="setting-item">
                  <div className="setting-label">
                    <span className="label-text">Show Timestamps</span>
                    <span className="label-description">Display time information in chat</span>
                  </div>
                  <div className="setting-control">
                    <label className="toggle-switch">
                      <input 
                        type="checkbox"
                        checked={settings.showTimestamps}
                        onChange={(e) => handleSettingChange('showTimestamps', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
                
                <div className="setting-item">
                  <div className="setting-label">
                    <span className="label-text">Sound Effects</span>
                    <span className="label-description">Play sounds when AI responds</span>
                  </div>
                  <div className="setting-control">
                    <label className="toggle-switch">
                      <input 
                        type="checkbox"
                        checked={settings.soundEffects}
                        onChange={(e) => handleSettingChange('soundEffects', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Configuration Section */}
            <div className="settings-section">
              <div className="section-header">
                <span className="section-icon">🤖</span>
                <h4>AI Configuration</h4>
              </div>
              
              <div className="setting-group">
                <div className="setting-item">
                  <div className="setting-label">
                    <span className="label-text">Max Tokens</span>
                    <span className="label-description">Maximum response length ({settings.maxTokens})</span>
                  </div>
                  <div className="setting-control">
                    <input 
                      type="range"
                      value={settings.maxTokens}
                      onChange={(e) => handleSettingChange('maxTokens', parseInt(e.target.value))}
                      min="100"
                      max="8000"
                      step="100"
                      className="range-slider"
                    />
                  </div>
                </div>
                
                <div className="setting-item">
                  <div className="setting-label">
                    <span className="label-text">Temperature</span>
                    <span className="label-description">AI creativity ({settings.temperature})</span>
                  </div>
                  <div className="setting-control">
                    <div className="temperature-control">
                      <input 
                        type="range"
                        value={settings.temperature}
                        onChange={(e) => handleSettingChange('temperature', parseFloat(e.target.value))}
                        min="0"
                        max="1"
                        step="0.1"
                        className="range-slider"
                      />
                      <div className="temperature-labels">
                        <span>Precise</span>
                        <span>Creative</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="setting-item">
                  <div className="setting-label">
                    <span className="label-text">API Timeout</span>
                    <span className="label-description">Request timeout in seconds</span>
                  </div>
                  <div className="setting-control">
                    <input 
                      type="number"
                      value={settings.apiTimeout}
                      onChange={(e) => handleSettingChange('apiTimeout', parseInt(e.target.value))}
                      min="5"
                      max="120"
                      className="number-input"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Data Management Section */}
            <div className="settings-section">
              <div className="section-header">
                <span className="section-icon">📊</span>
                <h4>Data Management</h4>
              </div>
              
              <div className="setting-group">
                <div className="setting-item">
                  <div className="setting-label">
                    <span className="label-text">Export Format</span>
                    <span className="label-description">Choose file format for exports</span>
                  </div>
                  <div className="setting-control">
                    <select 
                      value={settings.exportFormat}
                      onChange={(e) => handleSettingChange('exportFormat', e.target.value)}
                      className="format-select"
                    >
                      <option value="json">📄 JSON</option>
                      <option value="csv">📊 CSV</option>
                      <option value="txt">📝 TXT</option>
                    </select>
                  </div>
                </div>
                
                <div className="setting-item">
                  <div className="setting-label">
                    <span className="label-text">Language</span>
                    <span className="label-description">Interface language</span>
                  </div>
                  <div className="setting-control">
                    <select 
                      value={settings.language}
                      onChange={(e) => handleSettingChange('language', e.target.value)}
                      className="language-select"
                    >
                      <option value="en">🇺🇸 English</option>
                      <option value="es">🇪🇸 Español</option>
                      <option value="fr">🇫🇷 Français</option>
                      <option value="de">🇩🇪 Deutsch</option>
                      <option value="zh">🇨🇳 中文</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="settings-actions">
              <button 
                className="reset-settings-btn"
                onClick={resetSettings}
              >
                🔄 Reset to Defaults
              </button>
              <button 
                className="save-settings-btn"
                onClick={() => setIsOpen(false)}
              >
                ✅ Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
