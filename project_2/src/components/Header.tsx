import React from 'react';
import { Menu, Github, ExternalLink, Search } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="lg:hidden ml-4">
            <div className="text-xl font-bold">
              <span className="text-primary-900">Smobil</span>
              <span className="text-accent-500">pay</span>
              <span className="text-gray-600 ml-2 text-sm font-normal">S3P API</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:block relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search documentation..."
              className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* GitHub */}
          <a
            href="https://github.com/maviance/smobilpay-s3p"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
          >
            <Github className="h-5 w-5" />
          </a>

          {/* API Status */}
          <a
            href="https://status.smobilpay.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center px-3 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            API Status
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;