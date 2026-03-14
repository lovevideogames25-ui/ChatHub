# Changelog

All notable changes to ChatHub will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Add DEEPSEEK-V3 model integration
- Fix LLaMA 3.2 model connectivity issues
- Add user preferences and settings
- Implement chat history persistence

## [1.0.0] - 2024-03-14

### Added
- 🎉 Initial release of ChatHub AI chat application
- 🤖 Multi-model AI support with OpenRouter integration
  - GPT-OSS (openai/gpt-4o-mini) - Working ✅
  - GEMMA-3 (google/gemma-3-27b-it:free) - Working ✅
  - LLAMA3.2 (meta-llama/llama-3.2-3b-instruct:free) - Down 🔴
- 🎨 Dark futuristic theme with gradient backgrounds
- ✨ Smooth animations and hover effects
- 📱 Responsive design with custom CSS styling
- 💬 Rich content rendering support
  - Syntax highlighting for code blocks
  - Math rendering with KaTeX
  - Tables and markdown formatting
  - Blockquotes and links
- ⚡ Real-time "thinking..." indicator during AI processing
- 🕐 Message bubbles with timestamps
- 📊 Model status indicators in sidebar
  - Working (green), Down (red), Coming Soon (orange)
- 🔧 Express.js backend server with API routes
  - `/api/gptoss` - GPT-OSS model endpoint
  - `/api/gemma3` - Gemma-3 model endpoint
  - `/api/llama33` - LLaMA 3.2 model endpoint
- 🔐 Secure API key management with environment variables
- 📚 Comprehensive documentation
- 🛠️ Development setup with Vite + React

### Technical Details
- **Frontend**: React 18 + Vite
- **Backend**: Express.js + Node.js
- **AI Integration**: OpenRouter API
- **Styling**: Custom CSS with CSS variables
- **Markdown**: react-markdown with syntax highlighting
- **Math**: KaTeX for mathematical expressions
- **Code Highlighting**: highlight.js with dark theme

### Security
- API keys stored in environment variables
- `.env` file excluded from version control
- CORS enabled for development
- Input validation on all API endpoints

### Documentation
- Comprehensive README with setup instructions
- Project structure overview
- API integration documentation
- Customization guidelines

---

## Version History

### v1.0.0-alpha (Development Phase)
- Initial project setup with Vite + React
- Basic UI components and styling
- OpenRouter API integration testing
- Multi-model architecture design

### v1.0.0-beta (Feature Complete)
- Full UI implementation with animations
- Rich content rendering support
- Backend API routes for all models
- Status indicator system
- Documentation and deployment preparation

### v1.0.0 (Stable Release)
- Production-ready deployment
- GitHub repository setup
- Comprehensive documentation
- Multi-model testing and validation

---

## Upcoming Features

### v1.1.0 (Planned)
- [ ] Fix LLaMA 3.2 model connectivity
- [ ] Add DEEPSEEK-V3 model support
- [ ] Chat history persistence
- [ ] User settings and preferences
- [ ] Export chat conversations

### v1.2.0 (Future)
- [ ] File upload support for AI models
- [ ] Voice input/output capabilities
- [ ] Plugin system for custom integrations
- [ ] Advanced customization options

---

## Bug Reports

### Known Issues
- LLaMA 3.2 model currently experiencing API connectivity issues
- Rate limiting on some free model tiers
- Occasional CORS issues in development environment

### Fixed Issues
- SDK validation errors resolved by switching to fetch API
- Model status indicators properly displaying
- Environment variable loading issues resolved
- Frontend-backend communication stabilized

---

## Contributors

- **Lead Developer**: [lovevideogames25-ui](https://github.com/lovevideogames25-ui)
- **AI Integration**: OpenRouter API
- **UI/UX Design**: Custom dark futuristic theme

---

## Support

For bug reports, feature requests, or questions:
- Open an issue on [GitHub](https://github.com/lovevideogames25-ui/ChatHub/issues)
- Check the [documentation](README.md)
- Review the [contributing guidelines](CONTRIBUTING.md)
