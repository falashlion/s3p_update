import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, title }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          {title && (
            <span className="text-sm font-medium text-gray-300">{title}</span>
          )}
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            {language}
          </span>
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center text-xs text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 rounded px-2 py-1"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-1" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-gray-300 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;