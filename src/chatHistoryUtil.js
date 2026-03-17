// Browser-compatible chat history using localStorage

// Load existing chat history
export function loadChatHistory() {
  try {
    const history = localStorage.getItem('chatHistory');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error loading chat history:', error);
    return [];
  }
}

// Save conversation to chat history
export function saveConversation(model, messages) {
  try {
    const history = loadChatHistory();
    const conversation = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      model: model,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: new Date().toISOString()
      }))
    };
    
    history.push(conversation);
    localStorage.setItem('chatHistory', JSON.stringify(history));
    console.log('Conversation saved to chat history');
  } catch (error) {
    console.error('Error saving conversation:', error);
  }
}

// Get all conversations for a specific model
export function getConversationsByModel(model) {
  const history = loadChatHistory();
  return history.filter(conv => conv.model === model);
}

// Clear all chat history
export function clearChatHistory() {
  try {
    localStorage.removeItem('chatHistory');
    console.log('Chat history cleared');
  } catch (error) {
    console.error('Error clearing chat history:', error);
  }
}

// Export chat history to JSON file
export function exportChatHistory() {
  try {
    const history = loadChatHistory();
    const dataStr = JSON.stringify(history, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `chat-history-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('Chat history exported successfully');
  } catch (error) {
    console.error('Error exporting chat history:', error);
  }
}

// Import chat history from JSON file
export function importChatHistory(file) {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedHistory = JSON.parse(event.target.result);
          
          // Validate the imported data
          if (Array.isArray(importedHistory)) {
            // Merge with existing history
            const currentHistory = loadChatHistory();
            const mergedHistory = [...currentHistory, ...importedHistory];
            
            // Remove duplicates based on ID
            const uniqueHistory = mergedHistory.filter((conv, index, self) =>
              index === self.findIndex(c => c.id === conv.id)
            );
            
            // Sort by timestamp
            uniqueHistory.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            
            // Save merged history
            localStorage.setItem('chatHistory', JSON.stringify(uniqueHistory));
            console.log('Chat history imported successfully');
            resolve(uniqueHistory);
          } else {
            reject(new Error('Invalid file format: Expected array of conversations'));
          }
        } catch (parseError) {
          reject(new Error('Invalid JSON format'));
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    } catch (error) {
      reject(error);
    }
  });
}
