import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import './MessageBubble.css';

const MessageBubble = ({ message, isUser }) => {
  // Pre-process text to ensure proper LaTeX formatting
  const preprocessText = (text) => {
    // Convert various math notations to proper LaTeX
    let processedText = text;
    
    // Handle boxed expressions
    processedText = processedText.replace(/\\boxed\{([^}]+)\}/g, '$\\boxed{$1}$');
    
    // Handle align* environments
    processedText = processedText.replace(/\\begin\{align\*\}/g, '$\\begin{align*}');
    processedText = processedText.replace(/\\end\{align\*\}/g, '\\end{align*}$');
    
    // Handle hline
    processedText = processedText.replace(/\\hline/g, '\\\\hline');
    
    // Handle other common LaTeX commands
    processedText = processedText.replace(/\\quad/g, '\\quad');
    processedText = processedText.replace(/\\begin\{([^}]+)\}/g, '$\\begin{$1}');
    processedText = processedText.replace(/\\end\{([^}]+)\}/g, '\\end{$1}$');
    
    return processedText;
  };

  const processedText = preprocessText(message.text);

  return (
    <div className={`message-bubble ${isUser ? 'user' : 'ai'} fade-in`}>
      <div className="message-content">
        <div className="message-avatar">
          {isUser ? '👤' : '🤖'}
        </div>
        <div className="message-text">
          <ReactMarkdown
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeKatex]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <pre className="code-block">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                ) : (
                  <code className="inline-code" {...props}>
                    {children}
                  </code>
                );
              },
              table({ children }) {
                return (
                  <div className="table-wrapper">
                    <table className="markdown-table">
                      {children}
                    </table>
                  </div>
                );
              },
              th({ children }) {
                return <th className="table-header">{children}</th>;
              },
              td({ children }) {
                return <td className="table-cell">{children}</td>;
              },
              blockquote({ children }) {
                return (
                  <blockquote className="markdown-blockquote">
                    {children}
                  </blockquote>
                );
              },
              a({ children, href }) {
                return (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="markdown-link">
                    {children}
                  </a>
                );
              },
              // Enhanced math components
              span({ children, className, ...props }) {
                if (className && className.includes('katex')) {
                  return <span className={`enhanced-math ${className}`} {...props}>{children}</span>;
                }
                return <span className={className} {...props}>{children}</span>;
              },
              div({ children, className, ...props }) {
                if (className && className.includes('katex-display')) {
                  return (
                    <div className="math-display-container" {...props}>
                      <div className="math-display">
                        {children}
                      </div>
                    </div>
                  );
                }
                return <div className={className} {...props}>{children}</div>;
              }
            }}
          >
            {processedText}
          </ReactMarkdown>
        </div>
      </div>
      <div className="message-time">
        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default MessageBubble;
