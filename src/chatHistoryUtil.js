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

// Delete conversation by ID
export function deleteConversation(id) {
  try {
    const history = loadChatHistory();
    const updatedHistory = history.filter(conv => conv.id !== id);
    localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
    console.log('Conversation deleted from chat history');
  } catch (error) {
    console.error('Error deleting conversation:', error);
  }
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
