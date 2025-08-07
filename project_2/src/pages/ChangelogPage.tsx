import React from 'react';
import { Clock, Plus, AlertTriangle, Bug, Zap } from 'lucide-react';

const ChangelogPage: React.FC = () => {
  const releases = [
    {
      version: 'v2.1.0',
      date: '2024-01-15',
      type: 'major',
      changes: [
        {
          type: 'feature',
          title: 'New Mobile Money Services',
          description: 'Added support for Airtel Money and Moov Money across West Africa'
        },
        {
          type: 'feature',
          title: 'Enhanced Webhook Security',
          description: 'Implemented timestamp validation and improved signature verification'
        },
        {
          type: 'improvement',
          title: 'Better Error Messages',
          description: 'More descriptive error messages with actionable guidance'
        },
        {
          type: 'improvement',
          title: 'Rate Limiting Headers',
          description: 'Added rate limiting information in response headers'
        }
      ]
    },
    {
      version: 'v2.0.5',
      date: '2024-01-08',
      type: 'patch',
      changes: [
        {
          type: 'fix',
          title: 'Payment Status Polling',
          description: 'Fixed issue with payment status not updating correctly for certain providers'
        },
        {
          type: 'fix',
          title: 'Webhook Retry Logic',
          description: 'Improved webhook delivery reliability with exponential backoff'
        }
      ]
    },
    {
      version: 'v2.0.4',
      date: '2024-01-02',
      type: 'patch',
      changes: [
        {
          type: 'improvement',
          title: 'API Response Times',
          description: 'Optimized database queries resulting in 30% faster response times'
        },
        {
          type: 'fix',
          title: 'Signature Validation',
          description: 'Fixed edge case in signature validation for requests with special characters'
        },
        {
          type: 'fix',
          title: 'Service Discovery',
          description: 'Resolved issue where some services were not appearing in the services list'
        }
      ]
    },
    {
      version: 'v2.0.3',
      date: '2023-12-20',
      type: 'patch',
      changes: [
        {
          type: 'feature',
          title: 'Transaction Receipts',
          description: 'Added digital receipt generation for completed transactions'
        },
        {
          type: 'improvement',
          title: 'Documentation Updates',
          description: 'Comprehensive updates to API documentation with more examples'
        },
        {
          type: 'fix',
          title: 'Timeout Handling',
          description: 'Better handling of payment timeouts with proper status updates'
        }
      ]
    },
    {
      version: 'v2.0.2',
      date: '2023-12-15',
      type: 'patch',
      changes: [
        {
          type: 'improvement',
          title: 'Client Library Updates',
          description: 'Updated JavaScript and PHP client libraries with bug fixes'
        },
        {
          type: 'fix',
          title: 'Currency Validation',
          description: 'Fixed currency validation for multi-currency transactions'
        }
      ]
    },
    {
      version: 'v2.0.1',
      date: '2023-12-10',
      type: 'patch',
      changes: [
        {
          type: 'fix',
          title: 'Authentication Headers',
          description: 'Fixed issue with case-sensitive authentication headers'
        },
        {
          type: 'improvement',
          title: 'Error Logging',
          description: 'Enhanced error logging for better debugging support'
        }
      ]
    },
    {
      version: 'v2.0.0',
      date: '2023-12-01',
      type: 'major',
      changes: [
        {
          type: 'breaking',
          title: 'API Version 2.0 Release',
          description: 'Major API redesign with improved authentication and new endpoints'
        },
        {
          type: 'feature',
          title: 'New Authentication System',
          description: 'Implemented HMAC-SHA256 signature-based authentication'
        },
        {
          type: 'feature',
          title: 'Webhook Notifications',
          description: 'Real-time webhook notifications for payment status changes'
        },
        {
          type: 'feature',
          title: 'Multi-Currency Support',
          description: 'Support for USD, EUR, and other major currencies'
        },
        {
          type: 'improvement',
          title: 'Better Error Handling',
          description: 'Standardized error responses with detailed error codes'
        }
      ]
    }
  ];

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'feature':
        return <Plus className="h-4 w-4 text-green-600" />;
      case 'improvement':
        return <Zap className="h-4 w-4 text-blue-600" />;
      case 'fix':
        return <Bug className="h-4 w-4 text-yellow-600" />;
      case 'breaking':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getChangeColor = (type: string) => {
    switch (type) {
      case 'feature':
        return 'bg-green-50 border-green-200';
      case 'improvement':
        return 'bg-blue-50 border-blue-200';
      case 'fix':
        return 'bg-yellow-50 border-yellow-200';
      case 'breaking':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getVersionBadgeColor = (type: string) => {
    switch (type) {
      case 'major':
        return 'bg-red-100 text-red-800';
      case 'minor':
        return 'bg-blue-100 text-blue-800';
      case 'patch':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Changelog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Stay up to date with the latest changes, improvements, and new features 
          in the Smobilpay S3P API.
        </p>
      </div>

      {/* Current Version */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Current Version</h2>
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-accent-400">{releases[0].version}</span>
              <span className="text-primary-200">Released {releases[0].date}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-primary-200 text-sm">API Status</div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
              <span className="text-green-300 font-medium">Operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Release Timeline */}
      <div className="space-y-8">
        {releases.map((release, index) => (
          <div key={release.version} className="relative">
            {/* Timeline line */}
            {index < releases.length - 1 && (
              <div className="absolute left-6 top-16 w-0.5 h-full bg-gray-200"></div>
            )}
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Release Header */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="text-xl font-semibold text-gray-900">{release.version}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getVersionBadgeColor(release.type)}`}>
                          {release.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{release.date}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {release.changes.length} change{release.changes.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
              
              {/* Changes List */}
              <div className="p-6">
                <div className="space-y-4">
                  {release.changes.map((change, changeIndex) => (
                    <div
                      key={changeIndex}
                      className={`p-4 rounded-lg border-2 ${getChangeColor(change.type)}`}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3 mt-0.5">
                          {getChangeIcon(change.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {change.title}
                          </h4>
                          <p className="text-sm text-gray-700">
                            {change.description}
                          </p>
                        </div>
                        <div className="flex-shrink-0 ml-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded capitalize ${
                            change.type === 'feature' ? 'bg-green-100 text-green-800' :
                            change.type === 'improvement' ? 'bg-blue-100 text-blue-800' :
                            change.type === 'fix' ? 'bg-yellow-100 text-yellow-800' :
                            change.type === 'breaking' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {change.type === 'breaking' ? 'breaking' : change.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Change Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center">
            <Plus className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-sm text-gray-700">New Feature</span>
          </div>
          <div className="flex items-center">
            <Zap className="h-4 w-4 text-blue-600 mr-2" />
            <span className="text-sm text-gray-700">Improvement</span>
          </div>
          <div className="flex items-center">
            <Bug className="h-4 w-4 text-yellow-600 mr-2" />
            <span className="text-sm text-gray-700">Bug Fix</span>
          </div>
          <div className="flex items-center">
            <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
            <span className="text-sm text-gray-700">Breaking Change</span>
          </div>
        </div>
      </div>

      {/* Migration Guide */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Migration Guides</h2>
        <p className="text-gray-700 mb-4">
          For major version updates that include breaking changes, we provide detailed migration guides 
          to help you update your integration smoothly.
        </p>
        <div className="space-y-3">
          <a
            href="#"
            className="block p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Migration Guide: v1.x to v2.0</h3>
                <p className="text-sm text-gray-600">Complete guide for upgrading from API v1.x to v2.0</p>
              </div>
              <span className="text-primary-600 text-sm font-medium">View Guide →</span>
            </div>
          </a>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Stay Updated</h2>
        <p className="text-gray-700 mb-4">
          Get notified about new releases, important updates, and maintenance schedules.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://status.smobilpay.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-primary flex items-center justify-center"
          >
            <Clock className="mr-2 h-4 w-4" />
            API Status Page
          </a>
          <a
            href="mailto:api-updates@smobilpay.com?subject=Subscribe to API Updates"
            className="btn-outline-primary flex items-center justify-center"
          >
            Subscribe to Updates
          </a>
        </div>
      </div>
    </div>
  );
};

export default ChangelogPage;