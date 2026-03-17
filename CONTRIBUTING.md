# Contributing to ChatHub

Thank you for your interest in contributing to ChatHub! This document provides guidelines and information for contributors.

## 🎉 Project Status

**ChatHub was released on March 14, 2026** as a modern, dark-themed AI chat application with multi-model support and rich content rendering.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please open an issue on GitHub with:

- **Clear description** of the problem
- **Steps to reproduce** the issue
- **Expected behavior** vs **actual behavior**
- **Environment details** (OS, browser, Node.js version)
- **Screenshots** if applicable
- **Error logs** from browser console or server

### Suggesting Features

We welcome feature suggestions! Please include:

- **Feature description** and use case
- **Proposed implementation** (if you have ideas)
- **Potential challenges** or considerations
- **Alternative approaches** you've considered

### Code Contributions

#### 1. Fork the Repository

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/ChatHub.git
cd ChatHub
```

#### 2. Set Up Development Environment

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Add your OpenRouter API key to .env (for testing)
OPENROUTER_API=your_api_key_here
PORT=5173
```

#### 3. Create a Feature Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

#### 4. Make Your Changes

- Follow the existing code style and patterns
- Add comments for complex logic
- Update documentation if needed
- Test your changes thoroughly

#### 5. Test Your Changes

```bash
# Start backend server (in one terminal)
npm run server

# Start frontend dev server (in another terminal)
npm run dev
```

Test:
- All existing functionality works
- New features work as expected
- No console errors
- Responsive design works on different screen sizes

#### 6. Submit Your Pull Request

```bash
# Commit your changes
git add .
git commit -m "feat: add your feature description"

# Push to your fork
git push origin feature/your-feature-name
```

Then open a pull request on GitHub with:
- Clear title and description
- Reference any related issues
- Screenshots if UI changes
- Testing instructions

## 📋 Development Guidelines

### Code Style

#### JavaScript/React
- Use **camelCase** for variables and functions
- Use **PascalCase** for components
- Use **UPPER_SNAKE_CASE** for constants
- Add **JSDoc comments** for functions
- Use **ES6+ features** when appropriate

```javascript
// ✅ Good
const fetchAIResponse = async (prompt, model) => {
  try {
    const response = await sendMessage(prompt, model);
    return response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ❌ Avoid
var fetch_response = function(p, m) {
  // ...
};
```

#### CSS
- Use **kebab-case** for class names
- Group related styles
- Use CSS variables for colors
- Add comments for complex selectors

```css
/* ✅ Good */
.message-bubble {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
}

.message-bubble.user {
  align-self: flex-end;
}
```

#### File Naming
- **Components**: `PascalCase.jsx` (e.g., `MessageBubble.jsx`)
- **Styles**: `PascalCase.css` (e.g., `MessageBubble.css`)
- **Utilities**: `camelCase.js` (e.g., `api.js`)
- **Config**: `kebab-case.js` (e.g., `vite.config.js`)

### Project Structure

Follow the existing structure:

```
ChatHub/
├── components/          # Shared React components
├── sidebar/            # Sidebar-specific components
├── chat/              # Chat interface components
├── src/               # Main React app
├── .env.example       # Environment template
└── server.js          # Backend server
```

### Component Guidelines

#### React Components
- Use **functional components** with hooks
- **Destructure props** at the top
- Add **PropTypes** or TypeScript for type checking
- Keep components **focused and reusable**

```jsx
// ✅ Good
import React from 'react';
import './ComponentName.css';

const ComponentName = ({ prop1, prop2, onAction }) => {
  const handleClick = () => {
    onAction(prop1);
  };

  return (
    <div className="component-name">
      {/* JSX content */}
    </div>
  );
};

export default ComponentName;
```

#### State Management
- Use **useState** for local state
- Use **useEffect** for side effects
- Lift state up when needed
- Avoid unnecessary re-renders

### API Integration

#### Backend Routes
- Use **async/await** for API calls
- Add **error handling** for all routes
- Use **consistent response format**
- Add **logging** for debugging

```javascript
// ✅ Good
app.post("/api/model", async (req, res) => {
  const { prompt } = req.body;
  
  try {
    const response = await callAI(prompt);
    res.json({ response });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: "Request failed" });
  }
});
```

#### Frontend API Calls
- Use **try/catch** for error handling
- Show **loading states** during requests
- Handle **network errors** gracefully
- Use **consistent error messages**

## 🧪 Testing

### Manual Testing Checklist

Before submitting a PR, ensure:

- [ ] Application starts without errors
- [ ] All existing features work
- [ ] New features work as expected
- [ ] No console errors in browser
- [ ] No server errors in terminal
- [ ] Responsive design works
- [ ] Dark theme displays correctly
- [ ] Animations work smoothly
- [ ] Model switching works
- [ ] Chat functionality works

### Testing AI Features

When testing AI-related changes:

1. **Test with different models** (GPT-OSS, GEMMA-3)
2. **Test edge cases** (empty messages, long messages)
3. **Test error handling** (network issues, API errors)
4. **Test loading states** and thinking indicator
5. **Test rich content rendering** (code blocks, math, tables)

## 📝 Documentation

### Updating Documentation

When making changes:

- **README.md**: Update if adding new features or changing setup
- **CHANGELOG.md**: Add entry for significant changes
- **Code comments**: Add for complex logic or API changes
- **Component comments**: Explain non-obvious behavior

### Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
feat: add new AI model support
fix: resolve chat bubble alignment issue
docs: update README with new features
style: improve button hover effects
refactor: simplify API service
test: add unit tests for message handling
```

## 🚀 Deployment

### Environment Variables

Never commit API keys or sensitive data:

```bash
# ✅ Good - Use .env.example
OPENROUTER_API=your_api_key_here

# ❌ Never commit actual keys
OPENROUTER_API=sk-or-v1-actual-key
```

### Production Considerations

- Ensure all environment variables are set
- Test with production build (`npm run build`)
- Verify API rate limits and costs
- Check security headers and CORS settings

## 🤝 Community Guidelines

### Code Review Process

1. **Self-review** your code first
2. **Test thoroughly** before submitting
3. **Be responsive** to feedback
4. **Address all review comments**
5. **Keep PRs focused** on single features

### Communication

- Be **respectful** and constructive
- **Ask questions** if unclear
- **Provide context** for changes
- **Help others** learn and improve

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- CHANGELOG.md for significant contributions
- Release notes for major features

## 📞 Getting Help

If you need help:

1. Check existing **issues** and **documentation**
2. Ask questions in **GitHub discussions**
3. Review **similar projects** for patterns
4. Contact maintainers for complex issues

---

## 📄 License

By contributing to ChatHub, you agree that your contributions will be licensed under the same license as the project - Apache License 2.0.

---

Thank you for contributing to ChatHub! 🎉
