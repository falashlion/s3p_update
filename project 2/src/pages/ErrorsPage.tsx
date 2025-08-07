import React, { useState } from 'react';
import { AlertTriangle, Search, Info, XCircle, AlertCircle } from 'lucide-react';
import CodeBlock from '../components/ui/CodeBlock';

const ErrorsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const errorCodes = [
    {
      code: '400',
      name: 'Bad Request',
      category: 'Client Errors',
      description: 'The request was invalid or cannot be served',
      causes: ['Missing required parameters', 'Invalid parameter format', 'Malformed JSON'],
      solutions: ['Validate all required parameters', 'Check parameter formats', 'Ensure valid JSON structure']
    },
    {
      code: '401',
      name: 'Unauthorized',
      category: 'Authentication',
      description: 'Authentication failed or was not provided',
      causes: ['Missing Authorization header', 'Invalid public token', 'Expired token'],
      solutions: ['Include valid Authorization header', 'Check token format', 'Refresh expired tokens']
    },
    {
      code: '403',
      name: 'Forbidden',
      category: 'Authentication',
      description: 'Request signature verification failed',
      causes: ['Invalid signature', 'Incorrect secret key', 'Timestamp too old'],
      solutions: ['Verify signature generation', 'Check secret key', 'Use current timestamp']
    },
    {
      code: '404',
      name: 'Not Found',
      category: 'Client Errors',
      description: 'The requested resource was not found',
      causes: ['Invalid endpoint URL', 'Non-existent transaction ID', 'Invalid service ID'],
      solutions: ['Check endpoint URL', 'Verify transaction ID exists', 'Use valid service ID']
    },
    {
      code: '422',
      name: 'Unprocessable Entity',
      category: 'Validation',
      description: 'Request was well-formed but contains semantic errors',
      causes: ['Invalid customer reference', 'Insufficient account balance', 'Service unavailable'],
      solutions: ['Validate customer reference', 'Check account balance', 'Try different service']
    },
    {
      code: '429',
      name: 'Too Many Requests',
      category: 'Rate Limiting',
      description: 'Rate limit exceeded',
      causes: ['Too many requests in short time', 'Exceeded API quota'],
      solutions: ['Implement rate limiting', 'Add delays between requests', 'Contact support for higher limits']
    },
    {
      code: '500',
      name: 'Internal Server Error',
      category: 'Server Errors',
      description: 'An error occurred on the server',
      causes: ['Server malfunction', 'Database connectivity issues', 'Third-party service failure'],
      solutions: ['Retry the request', 'Check API status page', 'Contact support if persistent']
    },
    {
      code: '502',
      name: 'Bad Gateway',
      category: 'Server Errors',
      description: 'Invalid response from upstream server',
      causes: ['Gateway timeout', 'Upstream server error', 'Network connectivity issues'],
      solutions: ['Retry after delay', 'Check network connectivity', 'Monitor API status']
    },
    {
      code: '503',
      name: 'Service Unavailable',
      category: 'Server Errors',
      description: 'Service is temporarily unavailable',
      causes: ['Scheduled maintenance', 'Server overload', 'Service degradation'],
      solutions: ['Wait and retry', 'Check maintenance schedule', 'Implement exponential backoff']
    }
  ];

  const categories = ['all', ...new Set(errorCodes.map(error => error.category))];

  const filteredErrors = errorCodes.filter(error => {
    const matchesSearch = error.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         error.code.includes(searchTerm) ||
                         error.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || error.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const errorHandlingCode = `// Comprehensive error handling example
async function makeAPIRequest(endpoint, payload) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${publicToken}\`,
        'X-Auth-Signature': generateSignature(payload, secretKey),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    // Check if response is successful
    if (!response.ok) {
      await handleAPIError(response);
      return null;
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Network or parsing error:', error);
    throw new Error('Request failed: ' + error.message);
  }
}

async function handleAPIError(response) {
  const errorData = await response.json().catch(() => ({}));
  
  switch (response.status) {
    case 400:
      console.error('Bad Request:', errorData.message);
      throw new Error(\`Invalid request: \${errorData.message}\`);
      
    case 401:
      console.error('Unauthorized:', errorData.message);
      // Refresh token or re-authenticate
      throw new Error('Authentication failed');
      
    case 403:
      console.error('Forbidden:', errorData.message);
      // Check signature generation
      throw new Error('Request signature invalid');
      
    case 404:
      console.error('Not Found:', errorData.message);
      throw new Error('Resource not found');
      
    case 422:
      console.error('Validation Error:', errorData.errors);
      throw new Error(\`Validation failed: \${JSON.stringify(errorData.errors)}\`);
      
    case 429:
      console.error('Rate Limited:', errorData.message);
      // Implement exponential backoff
      await delay(calculateBackoffDelay(response.headers));
      throw new Error('Rate limit exceeded, retry after delay');
      
    case 500:
    case 502:
    case 503:
      console.error('Server Error:', response.status, errorData.message);
      // Implement retry logic
      throw new Error('Server error, please retry');
      
    default:
      console.error('Unexpected Error:', response.status, errorData);
      throw new Error(\`Unexpected error: \${response.status}\`);
  }
}`;

  const retryLogicCode = `// Retry logic with exponential backoff
class APIClient {
  constructor(config) {
    this.config = config;
    this.maxRetries = 3;
    this.baseDelay = 1000; // 1 second
  }

  async makeRequestWithRetry(endpoint, payload, attempt = 1) {
    try {
      return await this.makeRequest(endpoint, payload);
    } catch (error) {
      // Don't retry client errors (4xx)
      if (error.status >= 400 && error.status < 500) {
        throw error;
      }

      // Retry server errors (5xx) and network errors
      if (attempt < this.maxRetries) {
        const delay = this.calculateDelay(attempt);
        console.log(\`Retrying request in \${delay}ms (attempt \${attempt + 1})\`);
        
        await this.delay(delay);
        return this.makeRequestWithRetry(endpoint, payload, attempt + 1);
      }

      throw error;
    }
  }

  calculateDelay(attempt) {
    // Exponential backoff with jitter
    const exponentialDelay = this.baseDelay * Math.pow(2, attempt - 1);
    const jitter = Math.random() * 1000; // Add randomness
    return Math.min(exponentialDelay + jitter, 30000); // Max 30 seconds
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}`;

  const validationCode = `// Input validation helpers
function validatePaymentRequest(payload) {
  const errors = [];

  // Required fields validation
  if (!payload.serviceId) {
    errors.push('serviceId is required');
  }

  if (!payload.amount || payload.amount <= 0) {
    errors.push('amount must be a positive number');
  }

  if (!payload.currency) {
    errors.push('currency is required');
  }

  if (!payload.customerReference) {
    errors.push('customerReference is required');
  }

  // Format validation
  if (payload.amount && !Number.isInteger(payload.amount)) {
    errors.push('amount must be an integer (minor units)');
  }

  if (payload.currency && !['XAF', 'USD', 'EUR'].includes(payload.currency)) {
    errors.push('currency must be one of: XAF, USD, EUR');
  }

  // Customer reference format (example for electricity)
  if (payload.serviceId === 'ELEC001' && payload.customerReference) {
    if (!/^[A-Z]\\d{9}$/.test(payload.customerReference)) {
      errors.push('customerReference must be in format: A123456789');
    }
  }

  if (errors.length > 0) {
    throw new ValidationError('Request validation failed', errors);
  }

  return true;
}

class ValidationError extends Error {
  constructor(message, errors) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}`;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Error Handling</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive guide to handling errors, implementing retry logic, 
          and troubleshooting common issues with the S3P API.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search error codes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-4 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
            >
              <option value="all">All Categories</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Error Codes */}
      <div className="space-y-4">
        {filteredErrors.map(error => (
          <div key={error.code} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                    error.code.startsWith('4') ? 'bg-yellow-100' :
                    error.code.startsWith('5') ? 'bg-red-100' : 'bg-gray-100'
                  }`}>
                    {error.code.startsWith('4') ? (
                      <AlertCircle className="h-6 w-6 text-yellow-600" />
                    ) : error.code.startsWith('5') ? (
                      <XCircle className="h-6 w-6 text-red-600" />
                    ) : (
                      <Info className="h-6 w-6 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {error.code} - {error.name}
                    </h3>
                    <span className="text-sm font-medium text-primary-600 bg-primary-100 px-2 py-1 rounded">
                      {error.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">{error.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Common Causes</h4>
                  <ul className="space-y-2">
                    {error.causes.map((cause, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        {cause}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Solutions</h4>
                  <ul className="space-y-2">
                    {error.solutions.map((solution, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700">
                        <Info className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Error Handling Implementation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Error Handling Implementation</h2>
        <p className="text-gray-700 mb-6">
          Implement comprehensive error handling to gracefully manage API errors and provide 
          better user experience:
        </p>
        <CodeBlock code={errorHandlingCode} language="javascript" />
      </div>

      {/* Retry Logic */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Retry Logic</h2>
        <p className="text-gray-700 mb-6">
          Implement exponential backoff retry logic for transient errors:
        </p>
        <CodeBlock code={retryLogicCode} language="javascript" />
      </div>

      {/* Input Validation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Input Validation</h2>
        <p className="text-gray-700 mb-6">
          Validate input data before making API requests to prevent client errors:
        </p>
        <CodeBlock code={validationCode} language="javascript" />
      </div>

      {/* Best Practices */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Best Practices</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Error Handling</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                Always check HTTP status codes before processing responses
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                Parse error response bodies for detailed error information
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                Log errors with sufficient context for debugging
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                Provide user-friendly error messages in your application
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Retry Strategy</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                Only retry transient errors (5xx status codes)
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                Use exponential backoff with jitter to avoid thundering herd
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                Set maximum retry limits to prevent infinite loops
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                Respect rate limits and retry-after headers
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorsPage;