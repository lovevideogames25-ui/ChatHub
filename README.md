# ChatHub 🤖

A modern, dark-themed AI chat application with multi-model support, rich content rendering, and a sleek green-accented interface.

## ✨ Features

### 🎨 Modern UI
- **Dark futuristic theme** with gradient backgrounds
- **Smooth animations** and enhanced micro-interactions
- **Inter font** for clean, modern typography
- **Unified green theme** for all model boxes
- **Desktop-optimized** interface with refined spacing
- **Status indicators** for model availability

### 🤖 Multi-Model Support
- **GPT-OSS** ✅ Working (OpenRouter API)
- **GEMMA-3** ✅ Working (HuggingFace API - Fixed!)
- **LLAMA3.2** 🔴 Down (HuggingFace service issues)
- **LLAMA-3.1** ✅ Working (HuggingFace API)
- **QWEN3.5** ✅ Working (HuggingFace API - Thinking Model)
- **NEMOTRON-3-SUPER** ✅ Working (OpenRouter API)
- **TRINITY-LARGE-PREVIEW** ✅ Working (OpenRouter API)

### 💬 Rich Content Support
- **Syntax highlighting** for code blocks
- **Math rendering** with KaTeX
- **Tables** and markdown formatting
- **Real-time "thinking..."** indicator
- **Message bubbles** with timestamps
- **Enhanced hover effects** and transitions

### 🔧 Technical Stack
- **Frontend**: React + Vite
- **Backend**: Express.js
- **AI Integration**: OpenRouter API + HuggingFace API
- **Styling**: Custom CSS with CSS variables and Inter font
- **Markdown**: react-markdown with syntax highlighting
- **Animations**: Enhanced CSS transitions and transforms

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenRouter API key
- HuggingFace API key (for GEMMA-3)

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
   
   Edit `.env` and add your API keys:
   ```env
   HF_TOKEN=your_huggingface_token_here
   OPENROUTER_API=your_openrouter_token_here
   REPLICATE_API=your_replicate_token_here
   PORT=3001
   ```

4. **Start the development servers**
   
   **Terminal 1 - Backend:**
   ```bash
   npm run server
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📋 API Setup

### OpenRouter API
1. Visit [OpenRouter](https://openrouter.ai/)
2. Sign up and get your API key
3. Add it to your `.env` file as `OPENROUTER_API`

### HuggingFace API
1. Visit [HuggingFace](https://huggingface.co/)
2. Sign up and get your API token
3. Add it to your `.env` file as `HF_TOKEN`

## 🎯 Model Status

| Model | Status | API Provider | Notes |
|-------|--------|-------------|-------|
| GPT-OSS | ✅ Working | OpenRouter | Fast and reliable |
| GEMMA-3 | ✅ Working | HuggingFace | Fixed with HF router |
| LLAMA-3.1 | ✅ Working | HuggingFace | Good performance |
| QWEN3.5 | ✅ Working | HuggingFace | Thinking model |
| NEMOTRON-3-SUPER | ✅ Working | OpenRouter | Advanced model |
| TRINITY-LARGE-PREVIEW | ✅ Working | OpenRouter | Preview model |
| LLAMA3.2 | 🔴 Down | HuggingFace | Service issues |

## 🎨 UI Features

### Green Theme
- **Unified Design**: All model boxes feature green gradients
- **Visual Hierarchy**: Clean distinction between selected/unselected states
- **Smooth Transitions**: Enhanced animations for better UX
- **Modern Typography**: Inter font for improved readability

### Animations
- **Message Bubbles**: Fade-in and slide animations
- **Model Selection**: Scale and glow effects
- **Hover States**: Smooth transitions and micro-interactions
- **Loading Indicators**: Animated thinking states

## 🔧 Configuration

### Environment Variables
```env
# Required
HF_TOKEN=your_huggingface_token
OPENROUTER_API=your_openrouter_token

# Optional
REPLICATE_API=your_replicate_token
PORT=3001
```

### Customization
- **Colors**: Modify CSS variables in `src/App.css`
- **Fonts**: Change font imports in `src/App.css`
- **Animations**: Adjust timing functions in component CSS files
- **Models**: Add/remove models in `sidebar/Sidebar.jsx`

## 📁 Project Structure

```
ChatHub/
├── src/                    # Frontend React app
│   ├── App.jsx            # Main application component
│   ├── api.js             # API integration logic
│   └── components/        # Reusable components
├── sidebar/               # Sidebar component
│   ├── Sidebar.jsx        # Model selection sidebar
│   └── Sidebar.css        # Sidebar styling
├── chat/                  # Chat components
│   ├── ChatArea.jsx       # Chat interface
│   ├── MessageBubble.jsx  # Message display
│   └── ThinkingBubble.jsx # Loading indicator
├── api/                   # Backend API routes
│   ├── gemma3.js         # GEMMA-3 endpoint
│   ├── gptoss.js         # GPT-OSS endpoint
│   └── ...               # Other model endpoints
└── server.js              # Express server
```

## 🐛 Troubleshooting

### Common Issues

**GEMMA-3 not working:**
- Ensure `HF_TOKEN` is set in `.env`
- Check HuggingFace API service status
- Verify token permissions

**Models showing as down:**
- Check API key validity
- Verify network connectivity
- Check service provider status

**UI not loading:**
- Ensure both frontend and backend are running
- Check browser console for errors
- Verify port availability

### Debug Mode
Enable console logging by checking the browser dev tools and server terminal for detailed error messages.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenRouter** for providing AI model access
- **HuggingFace** for model hosting and API services
- **React** team for the amazing framework
- **Vite** for the fast development tooling

## 📞 Support

For support, please:
- Open an issue on [GitHub](https://github.com/lovevideogames25-ui/ChatHub/issues)
- Check the [documentation](docs/)
- Review the [FAQ](docs/FAQ.md)

---

**ChatHub v1.1.0** - Modern AI Chat with Enhanced UI and Fixed Models ✨

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
- **GEMMA-3**: Fully functional with HuggingFace API integration
- **LLAMA-3.1**: Fully functional with HuggingFace API integration
- **QWEN3.5**: Fully functional with HuggingFace API integration (Thinking Model - may take longer to respond)
- **NEMOTRON-3-SUPER**: Fully functional with OpenRouter integration (Streaming support)
- **TRINITY-LARGE-PREVIEW**: Fully functional with OpenRouter integration (SDK with direct API fallback)

### Down Models (Next Update Priority)
- **LLAMA3.2**: HuggingFace service issues (API connectivity problems)
- **HERMES-3**: Removed from ChatHub


### Known Issues
- Rate limiting on some free model tiers
- HuggingFace API service instability affecting LLAMA-3.2
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
