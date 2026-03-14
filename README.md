# ChatHub 🤖

A modern, dark-themed AI chat application with multi-model support and rich content rendering.

## ✨ Features

### 🎨 Modern UI
- **Dark futuristic theme** with gradient backgrounds
- **Smooth animations** and hover effects
- **Responsive design** with custom styling
- **Status indicators** for model availability

### 🤖 Multi-Model Support
- **GPT-OSS** ✅ Working
- **GEMMA-3** 🔴 Down (API connectivity issues)
- **LLAMA3.2** 🔴 Down (API connectivity issues)
- **DEEPSEEK-V3** 🟡 Coming Soon

### 💬 Rich Content Support
- **Syntax highlighting** for code blocks
- **Math rendering** with KaTeX
- **Tables** and markdown formatting
- **Real-time "thinking..."** indicator
- **Message bubbles** with timestamps

### 🔧 Technical Stack
- **Frontend**: React + Vite
- **Backend**: Express.js
- **AI Integration**: OpenRouter API
- **Styling**: Custom CSS with CSS variables
- **Markdown**: react-markdown with syntax highlighting

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenRouter API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lovevideogames25-ui/ChatHub.git
   cd ChatHub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your OpenRouter API key:
   ```
   OPENROUTER_API=your_openrouter_api_key_here
   PORT=5173
   ```

4. **Start the development servers**
   
   **Backend** (in one terminal):
   ```bash
   npm run server
   ```
   
   **Frontend** (in another terminal):
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
ChatHub/
├── components/          # Shared React components
│   ├── Layout.jsx
│   └── Layout.css
├── sidebar/            # Model selection sidebar
│   ├── Sidebar.jsx
│   └── Sidebar.css
├── chat/              # Chat interface components
│   ├── ChatArea.jsx
│   ├── ChatArea.css
│   ├── MessageBubble.jsx
│   ├── MessageBubble.css
│   ├── InputBar.jsx
│   └── InputBar.css
├── src/               # React app source
│   ├── App.jsx
│   ├── App.css
│   ├── api.js
│   ├── main.jsx
│   └── index.css
├── server.js          # Express backend server
├── .env.example       # Environment variables template
├── .gitignore         # Git ignore file
└── package.json       # Project dependencies
```

## 🔌 API Integration

### Backend Routes
- `POST /api/gptoss` - GPT-OSS model (working)
- `POST /api/gemma3` - Gemma-3 model (currently down)
- `POST /api/llama33` - LLaMA 3.2 model (currently down)

### Frontend API Service
The `src/api.js` file handles model routing:
```javascript
if (model === "GPT-OSS") {
  url = "http://localhost:3001/api/gptoss";
} else if (model === "GEMMA-3") {
  url = "http://localhost:3001/api/gemma3";
} else if (model === "LLAMA3.2") {
  url = "http://localhost:3001/api/llama33";
}
```

## 🎨 Customization

### Theme Colors
Edit `src/index.css` to customize the color scheme:
```css
:root {
  --bg-primary: #0D0D0D;
  --bg-secondary: #111111;
  --accent-primary: #00FFA3;
  --accent-secondary: #00D4FF;
  --text-primary: #EAEAEA;
  --text-secondary: #B0B0B0;
}
```

### Adding New Models
1. Add backend route in `server.js`
2. Update model list in `sidebar/Sidebar.jsx`
3. Add routing logic in `src/api.js`
4. Update validation in `src/App.jsx`

## � Current Status

### Working Models
- **GPT-OSS**: Fully functional with OpenRouter integration

### Down Models (Next Update Priority)
- **GEMMA-3**: Experiencing API connectivity issues
- **LLAMA3.2**: Experiencing API connectivity issues

### Coming Soon
- **DEEPSEEK-V3**: Model integration in development

### Known Issues
- Rate limiting on some free model tiers
- API connectivity issues with GEMMA-3 and LLaMA 3.2
- Occasional CORS issues in development environment

For the latest status and updates, see the [CHANGELOG.md](CHANGELOG.md).

## 🔐 Security

- API keys stored in environment variables
- `.env` file excluded from git via `.gitignore`
- CORS enabled for development
- Input validation on all API endpoints

## 📝 License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or issues, please open an issue on the GitHub repository.

---

**Built with ❤️ using React, Express, and OpenRouter**
