import React, { useState, useEffect } from 'react';

function Settings() {
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
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const saveSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem('chatHubSettings', JSON.stringify(newSettings));
  };

  const handleSettingChange = (key, value) => {
    saveSettings({ ...settings, [key]: value });
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
  };

  return (
    <div className="settings">
      <button 
        className="settings-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        ⚙️
      </button>
      
      {isOpen && (
        <div className="settings-panel">
          <div className="settings-header">
            <h3>Settings</h3>
            <button 
              className="close-settings-btn"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>
          
          <div className="settings-content">
            {/* Appearance Settings */}
            <div className="settings-section">
              <h4>Appearance</h4>
              
              <div className="setting-item">
                <label>Theme</label>
                <select 
                  value={settings.theme}
                  onChange={(e) => handleSettingChange('theme', e.target.value)}
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
              
              <div className="setting-item">
                <label>Font Size</label>
                <select 
                  value={settings.fontSize}
                  onChange={(e) => handleSettingChange('fontSize', e.target.value)}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              
              <div className="setting-item">
                <label>
                  <input 
                    type="checkbox"
                    checked={settings.compactMode}
                    onChange={(e) => handleSettingChange('compactMode', e.target.checked)}
                  />
                  Compact Mode
                </label>
              </div>
            </div>

            {/* Chat Settings */}
            <div className="settings-section">
              <h4>Chat</h4>
              
              <div className="setting-item">
                <label>
                  <input 
                    type="checkbox"
                    checked={settings.autoSave}
                    onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                  />
                  Auto-save conversations
                </label>
              </div>
              
              <div className="setting-item">
                <label>
                  <input 
                    type="checkbox"
                    checked={settings.showTimestamps}
                    onChange={(e) => handleSettingChange('showTimestamps', e.target.checked)}
                  />
                  Show timestamps
                </label>
              </div>
              
              <div className="setting-item">
                <label>
                  <input 
                    type="checkbox"
                    checked={settings.soundEffects}
                    onChange={(e) => handleSettingChange('soundEffects', e.target.checked)}
                  />
                  Sound effects
                </label>
              </div>
            </div>

            {/* AI Settings */}
            <div className="settings-section">
              <h4>AI Configuration</h4>
              
              <div className="setting-item">
                <label>Max Tokens</label>
                <input 
                  type="number"
                  value={settings.maxTokens}
                  onChange={(e) => handleSettingChange('maxTokens', parseInt(e.target.value))}
                  min="100"
                  max="8000"
                />
              </div>
              
              <div className="setting-item">
                <label>Temperature</label>
                <input 
                  type="range"
                  value={settings.temperature}
                  onChange={(e) => handleSettingChange('temperature', parseFloat(e.target.value))}
                  min="0"
                  max="1"
                  step="0.1"
                />
                <span className="setting-value">{settings.temperature}</span>
              </div>
              
              <div className="setting-item">
                <label>API Timeout (seconds)</label>
                <input 
                  type="number"
                  value={settings.apiTimeout}
                  onChange={(e) => handleSettingChange('apiTimeout', parseInt(e.target.value))}
                  min="5"
                  max="120"
                />
              </div>
            </div>

            {/* Data Settings */}
            <div className="settings-section">
              <h4>Data Management</h4>
              
              <div className="setting-item">
                <label>Export Format</label>
                <select 
                  value={settings.exportFormat}
                  onChange={(e) => handleSettingChange('exportFormat', e.target.value)}
                >
                  <option value="json">JSON</option>
                  <option value="csv">CSV</option>
                  <option value="txt">TXT</option>
                </select>
              </div>
              
              <div className="setting-item">
                <label>Language</label>
                <select 
                  value={settings.language}
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="zh">中文</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="settings-actions">
              <button 
                className="reset-settings-btn"
                onClick={resetSettings}
              >
                Reset to Defaults
              </button>
              <button 
                className="save-settings-btn"
                onClick={() => setIsOpen(false)}
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
