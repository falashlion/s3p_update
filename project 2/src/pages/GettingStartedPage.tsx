import React, { useState } from 'react';
import { CheckCircle, Copy, ExternalLink, ArrowRight, AlertCircle } from 'lucide-react';
import CodeBlock from '../components/ui/CodeBlock';
import { Link } from 'react-router-dom';

const GettingStartedPage: React.FC = () => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepNumber) 
        ? prev.filter(n => n !== stepNumber)
        : [...prev, stepNumber]
    );
  };

  const installationCode = `# Using npm
npm install @maviance/s3p-api

# Using yarn
yarn add @maviance/s3p-api

# Using composer (PHP)
composer require maviance/smobilpay-s3p

# Using pip (Python)
pip install smobilpay-s3p`;

  const quickStartCode = `const S3PClient = require('@maviance/s3p-api');

// Initialize the client
const client = new S3PClient({
  merchantId: 'YOUR_MERCHANT_ID',
  publicToken: 'YOUR_PUBLIC_TOKEN',
  secretKey: 'YOUR_SECRET_KEY',
  environment: 'sandbox' // Use 'production' for live
});

// Example: Get all available services
async function getServices() {
  try {
    const services = await client.services.getAll();
    console.log('Available services:', services);
    return services;
  } catch (error) {
    console.error('Error fetching services:', error);
  }
}

// Example: Initiate a payment
async function initiatePayment() {
  try {
    const payment = await client.payments.initiate({
      serviceId: 'ELEC001', // Electricity service
      amount: 5000, // Amount in minor units (5000 = 50.00 XAF)
      currency: 'XAF',
      customerReference: 'A123456789', // Customer account number
      callbackUrl: 'https://your-app.com/webhook'
    });
    
    console.log('Payment initiated:', payment);
    return payment;
  } catch (error) {
    console.error('Payment initiation failed:', error);
  }
}`;

  const authenticationCode = `const crypto = require('crypto');

function generateSignature(payload, secretKey) {
  // Sort payload keys alphabetically
  const sortedPayload = Object.keys(payload)
    .sort()
    .reduce((acc, key) => {
      acc[key] = payload[key];
      return acc;
    }, {});
  
  // Create string representation
  const payloadString = JSON.stringify(sortedPayload);
  
  // Generate HMAC-SHA256 signature
  return crypto
    .createHmac('sha256', secretKey)
    .update(payloadString)
    .digest('hex');
}

// Usage in API request
const payload = {
  merchantId: 'YOUR_MERCHANT_ID',
  timestamp: new Date().toISOString(),
  amount: 5000,
  currency: 'XAF'
};

const signature = generateSignature(payload, 'YOUR_SECRET_KEY');

// Include in request headers
const headers = {
  'Authorization': 'Bearer YOUR_PUBLIC_TOKEN',
  'X-Auth-Signature': signature,
  'Content-Type': 'application/json'
};`;

  const steps = [
    {
      number: 1,
      title: 'Get API Credentials',
      description: 'Register with Maviance to obtain your merchant ID, public token, and secret key.',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            To start using the S3P API, you'll need to register with Maviance and obtain your API credentials:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li><strong>Merchant ID:</strong> Your unique merchant identifier</li>
            <li><strong>Public Token:</strong> Used for API authentication</li>
            <li><strong>Secret Key:</strong> Used for request signing (keep this secure!)</li>
          </ul>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-sm">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800">Important</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Never expose your secret key in client-side code. Always keep it secure on your server.
                </p>
              </div>
            </div>
          </div>
          <Link
            to="/support"
            className="inline-flex items-center text-primary-700 hover:text-primary-800 font-medium"
          >
            Request API Credentials <ExternalLink className="ml-1 h-4 w-4" />
          </Link>
        </div>
      )
    },
    {
      number: 2,
      title: 'Install SDK',
      description: 'Install the S3P API client library for your preferred programming language.',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Choose your preferred programming language and install the corresponding SDK:
          </p>
          <CodeBlock code={installationCode} language="bash" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Link
              to="/client-libraries"
              className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
            >
              <h4 className="font-semibold text-gray-900 mb-2">Node.js/JavaScript</h4>
              <p className="text-sm text-gray-600">Full-featured SDK with TypeScript support</p>
            </Link>
            <Link
              to="/client-libraries"
              className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
            >
              <h4 className="font-semibold text-gray-900 mb-2">PHP</h4>
              <p className="text-sm text-gray-600">Compatible with PHP 7.4+ and 8.x</p>
            </Link>
            <Link
              to="/client-libraries"
              className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
            >
              <h4 className="font-semibold text-gray-900 mb-2">Python</h4>
              <p className="text-sm text-gray-600">Works with Python 3.6+</p>
            </Link>
          </div>
        </div>
      )
    },
    {
      number: 3,
      title: 'Initialize Client',
      description: 'Set up the API client with your credentials and make your first API call.',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Initialize the S3P API client with your credentials and start making API calls:
          </p>
          <CodeBlock code={quickStartCode} language="javascript" />
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-sm">
            <div className="flex">
              <CheckCircle className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-800">Pro Tip</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Always use the sandbox environment during development and testing. 
                  Switch to production only when you're ready to process real transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      number: 4,
      title: 'Understand Authentication',
      description: 'Learn how to properly authenticate your API requests with signatures.',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            The S3P API uses HMAC-SHA256 signatures for request authentication. Here's how to generate them:
          </p>
          <CodeBlock code={authenticationCode} language="javascript" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Authentication Flow</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                <li>Sort payload parameters alphabetically</li>
                <li>Convert to JSON string</li>
                <li>Generate HMAC-SHA256 hash</li>
                <li>Include in X-Auth-Signature header</li>
              </ol>
            </div>
            <div className="bg-white p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Required Headers</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li><code className="text-xs bg-gray-100 px-1 rounded">Authorization</code>: Bearer token</li>
                <li><code className="text-xs bg-gray-100 px-1 rounded">X-Auth-Signature</code>: Request signature</li>
                <li><code className="text-xs bg-gray-100 px-1 rounded">Content-Type</code>: application/json</li>
              </ul>
            </div>
          </div>
          <Link
            to="/authentication"
            className="inline-flex items-center text-primary-700 hover:text-primary-800 font-medium"
          >
            Learn More About Authentication <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      )
    },
    {
      number: 5,
      title: 'Test in Sandbox',
      description: 'Use the sandbox environment to test your integration without real money.',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Before going live, thoroughly test your integration in our sandbox environment:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Sandbox Benefits</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
                <li>No real money transactions</li>
                <li>Same API endpoints and responses</li>
                <li>Test all payment scenarios</li>
                <li>Debug integration issues safely</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Test Scenarios</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
                <li>Successful payments</li>
                <li>Failed transactions</li>
                <li>Network timeouts</li>
                <li>Invalid parameters</li>
              </ul>
            </div>
          </div>
          <Link
            to="/sandbox"
            className="inline-flex items-center text-primary-700 hover:text-primary-800 font-medium"
          >
            Access Sandbox Environment <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Getting Started</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Follow this step-by-step guide to integrate the Smobilpay S3P API 
          into your application in just a few minutes.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Progress</h2>
          <span className="text-sm text-gray-600">
            {completedSteps.length} of {steps.length} completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-8">
        {steps.map((step) => {
          const isCompleted = completedSteps.includes(step.number);
          
          return (
            <div
              key={step.number}
              className={`bg-white rounded-lg shadow-sm border-2 transition-all duration-200 ${
                isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <button
                      onClick={() => toggleStep(step.number)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-200 ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                      }`}
                    >
                      {isCompleted ? <CheckCircle className="h-5 w-5" /> : step.number}
                    </button>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {step.title}
                      </h3>
                      {isCompleted && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                          Completed
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <div className="prose max-w-none">
                      {step.content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 rounded-lg p-8 text-white">
        <h2 className="text-2xl font-semibold mb-4">Ready for Production?</h2>
        <p className="text-primary-100 mb-6">
          Once you've completed testing in the sandbox, you're ready to go live with real transactions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/sandbox"
            className="bg-white text-primary-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center"
          >
            Test in Sandbox
          </Link>
          <Link
            to="/support"
            className="border border-primary-300 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center justify-center"
          >
            Request Production Access
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GettingStartedPage;