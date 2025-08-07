import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Shield, 
  Server, 
  CreditCard, 
  Webhook, 
  AlertTriangle, 
  Code, 
  TestTube, 
  Clock, 
  HelpCircle,
  X,
  ChevronRight,
  Zap,
  Globe
} from 'lucide-react';

interface SidebarProps {
  onClose: () => void;
}

const navigationItems = [
  {
    title: 'Overview',
    items: [
      { name: 'Introduction', href: '/', icon: Home },
      { name: 'Getting Started', href: '/getting-started', icon: BookOpen },
    ]
  },
  {
    title: 'API Reference',
    items: [
      { name: 'Authentication', href: '/authentication', icon: Shield },
      { name: 'Services', href: '/services', icon: Server },
      { name: 'Payments', href: '/payments', icon: CreditCard },
      { name: 'Webhooks', href: '/webhooks', icon: Webhook },
      { name: 'Error Handling', href: '/errors', icon: AlertTriangle },
    ]
  },
  {
    title: 'Development',
    items: [
      { name: 'Client Libraries', href: '/client-libraries', icon: Code },
      { name: 'Sandbox Testing', href: '/sandbox', icon: TestTube },
    ]
  },
  {
    title: 'Resources',
    items: [
      { name: 'Changelog', href: '/changelog', icon: Clock },
      { name: 'Support', href: '/support', icon: HelpCircle },
    ]
  }
];

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="text-xl font-bold">
            <span className="text-primary-900">Smobil</span>
            <span className="text-accent-500">pay</span>
          </div>
          <div className="ml-2 px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded">
            S3P API
          </div>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Quick Links */}
      <div className="p-4 border-b border-gray-200">
        <div className="grid grid-cols-2 gap-2">
          <a
            href="https://apidocs.smobilpay.com/s3papi/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-3 py-2 text-xs font-medium text-primary-700 bg-primary-50 rounded-md hover:bg-primary-100 transition-colors"
          >
            <Globe className="h-3 w-3 mr-1" />
            Live Docs
          </a>
          <a
            href="#"
            className="flex items-center justify-center px-3 py-2 text-xs font-medium text-accent-700 bg-accent-50 rounded-md hover:bg-accent-100 transition-colors"
          >
            <Zap className="h-3 w-3 mr-1" />
            Quick Start
          </a>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-8">
          {navigationItems.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = location.pathname === item.href;
                  const Icon = item.icon;
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={onClose}
                      className={`
                        group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200
                        ${isActive
                          ? 'bg-primary-100 text-primary-900 border-r-2 border-primary-600'
                          : 'text-gray-700 hover:text-primary-700 hover:bg-gray-100'
                        }
                      `}
                    >
                      <Icon className={`
                        flex-shrink-0 h-5 w-5 mr-3 transition-colors
                        ${isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-primary-500'}
                      `} />
                      {item.name}
                      {isActive && (
                        <ChevronRight className="ml-auto h-4 w-4 text-primary-600" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          <p>© 2024 Maviance PLC</p>
          <p className="mt-1">S3P API v2.1.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;