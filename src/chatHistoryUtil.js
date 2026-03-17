import fs from 'fs';
import path from 'path';

const HISTORY_FILE = path.join(process.cwd(), 'chat_history.json');

// Load existing chat history
export function loadChatHistory() {
  try {
    if (fs.existsSync(HISTORY_FILE)) {
      const data = fs.readFileSync(HISTORY_FILE, 'utf8');
      return JSON.parse(data);
    }
    return [];
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
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
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

// Delete conversation by ID
export function deleteConversation(id) {
  try {
    const history = loadChatHistory();
    const updatedHistory = history.filter(conv => conv.id !== id);
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(updatedHistory, null, 2));
    console.log('Conversation deleted from chat history');
  } catch (error) {
    console.error('Error deleting conversation:', error);
  }
}

// Clear all chat history
export function clearChatHistory() {
  try {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify([], null, 2));
    console.log('Chat history cleared');
  } catch (error) {
    console.error('Error clearing chat history:', error);
  }
}
