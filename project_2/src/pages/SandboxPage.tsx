import React, { useState } from 'react';
import { TestTube, Play, Copy, CheckCircle, AlertCircle, Code } from 'lucide-react';
import CodeBlock from '../components/ui/CodeBlock';

const SandboxPage: React.FC = () => {
  const [activeEndpoint, setActiveEndpoint] = useState('services');
  const [testResult, setTestResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const endpoints = [
    {
      id: 'services',
      name: 'Get Services',
      method: 'GET',
      path: '/s3papi/services',
      description: 'Retrieve all available payment services'
    },
    {
      id: 'service-detail',
      name: 'Service Details',
      method: 'GET',
      path: '/s3papi/services/{serviceId}',
      description: 'Get details for a specific service'
    },
    {
      id: 'initiate-payment',
      name: 'Initiate Payment',
      method: 'POST',
      path: '/s3papi/payments/initiate',
      description: 'Start a new payment transaction'
    },
    {
      id: 'payment-status',
      name: 'Payment Status',
      method: 'GET',
      path: '/s3papi/payments/{transactionId}/status',
      description: 'Check payment transaction status'
    }
  ];

  const testCredentials = {
    merchantId: 'SANDBOX_MERCHANT_123',
    publicToken: 'pk_sandbox_1234567890abcdef',
    secretKey: 'sk_sandbox_abcdef1234567890',
    baseUrl: 'https://sandbox-api.smobilpay.com'
  };

  const sandboxSetupCode = `// Sandbox environment setup
const S3PClient = require('@maviance/s3p-api');

const client = new S3PClient({
  merchantId: '${testCredentials.merchantId}',
  publicToken: '${testCredentials.publicToken}',
  secretKey: '${testCredentials.secretKey}',
  environment: 'sandbox', // Important: Use sandbox environment
  baseUrl: '${testCredentials.baseUrl}'
});

// Test connection
async function testConnection() {
  try {
    const services = await client.services.getAll();
    console.log('✅ Sandbox connection successful');
    console.log('Available services:', services.length);
    return services;
  } catch (error) {
    console.error('❌ Sandbox connection failed:', error.message);
    throw error;
  }
}`;

  const testScenarios = [
    {
      id: 'successful-payment',
      title: 'Successful Payment',
      description: 'Test a complete successful payment flow',
      customerReference: 'TEST_SUCCESS_123',
      amount: 1000,
      expectedResult: 'completed'
    },
    {
      id: 'insufficient-funds',
      title: 'Insufficient Funds',
      description: 'Test payment failure due to insufficient funds',
      customerReference: 'TEST_INSUFFICIENT_456',
      amount: 999999,
      expectedResult: 'failed'
    },
    {
      id: 'invalid-customer',
      title: 'Invalid Customer',
      description: 'Test payment with invalid customer reference',
      customerReference: 'INVALID_CUSTOMER_789',
      amount: 1000,
      expectedResult: 'failed'
    },
    {
      id: 'timeout-scenario',
      title: 'Timeout Scenario',
      description: 'Test payment timeout handling',
      customerReference: 'TEST_TIMEOUT_999',
      amount: 1000,
      expectedResult: 'expired'
    }
  ];

  const testPaymentCode = `// Test payment scenarios in sandbox
async function testPaymentScenarios() {
  const testCases = [
    {
      name: 'Successful Payment',
      customerReference: 'TEST_SUCCESS_123',
      amount: 1000,
      expected: 'completed'
    },
    {
      name: 'Insufficient Funds',
      customerReference: 'TEST_INSUFFICIENT_456', 
      amount: 999999,
      expected: 'failed'
    },
    {
      name: 'Invalid Customer',
      customerReference: 'INVALID_CUSTOMER_789',
      amount: 1000,
      expected: 'failed'
    }
  ];

  for (const testCase of testCases) {
    console.log(\`\\n🧪 Testing: \${testCase.name}\`);
    
    try {
      // Initiate payment
      const payment = await client.payments.initiate({
        serviceId: 'ELEC001',
        amount: testCase.amount,
        currency: 'XAF',
        customerReference: testCase.customerReference
      });
      
      console.log(\`Payment initiated: \${payment.transactionId}\`);
      
      // Wait and check status
      await new Promise(resolve => setTimeout(resolve, 2000));
      const status = await client.payments.getStatus(payment.transactionId);
      
      console.log(\`Status: \${status.status}\`);
      console.log(\`Expected: \${testCase.expected}\`);
      console.log(status.status === testCase.expected ? '✅ PASS' : '❌ FAIL');
      
    } catch (error) {
      console.error(\`❌ Test failed: \${error.message}\`);
    }
  }
}`;

  const webhookTestingCode = `// Test webhook handling in sandbox
const express = require('express');
const ngrok = require('ngrok');

const app = express();
app.use(express.json());

// Webhook endpoint
app.post('/webhook', (req, res) => {
  console.log('📨 Webhook received:', req.body);
  
  const event = req.body;
  
  // Log event details
  console.log(\`Event Type: \${event.type}\`);
  console.log(\`Transaction ID: \${event.data.transactionId}\`);
  console.log(\`Status: \${event.data.status}\`);
  
  // Acknowledge receipt
  res.status(200).json({ received: true });
});

// Start server and expose with ngrok
async function startWebhookTesting() {
  const server = app.listen(3000, () => {
    console.log('🚀 Webhook server running on port 3000');
  });
  
  // Expose local server with ngrok
  const url = await ngrok.connect(3000);
  console.log(\`🌐 Webhook URL: \${url}/webhook\`);
  console.log('Use this URL as your callbackUrl in payment requests');
  
  return url;
}`;

  const simulateAPICall = async (endpoint: string) => {
    setIsLoading(true);
    setTestResult(null);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock responses based on endpoint
    let mockResponse;
    switch (endpoint) {
      case 'services':
        mockResponse = {
          success: true,
          data: [
            { id: 'ELEC001', name: 'Electricity Bill Payment', category: 'utilities' },
            { id: 'WATER001', name: 'Water Bill Payment', category: 'utilities' },
            { id: 'CABLE001', name: 'Cable TV Subscription', category: 'entertainment' }
          ]
        };
        break;
      case 'initiate-payment':
        mockResponse = {
          success: true,
          data: {
            transactionId: 'TRX_SANDBOX_' + Math.random().toString(36).substr(2, 9),
            status: 'pending',
            amount: 5000,
            currency: 'XAF',
            paymentUrl: 'https://sandbox-pay.smobilpay.com/checkout/...',
            expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString()
          }
        };
        break;
      default:
        mockResponse = { success: true, data: { message: 'Sandbox response' } };
    }
    
    setTestResult(mockResponse);
    setIsLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Sandbox Testing</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Test your S3P API integration safely in our sandbox environment 
          without processing real transactions or affecting live data.
        </p>
      </div>

      {/* Sandbox Credentials */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <TestTube className="h-6 w-6 text-primary-600 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-900">Sandbox Credentials</h2>
        </div>
        <p className="text-gray-700 mb-6">
          Use these test credentials to connect to the sandbox environment. 
          These credentials are safe to use and won't process real payments.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Merchant ID</label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md p-3">
                <code className="flex-1 text-sm text-gray-800">{testCredentials.merchantId}</code>
                <button
                  onClick={() => navigator.clipboard.writeText(testCredentials.merchantId)}
                  className="ml-2 p-1 hover:bg-gray-200 rounded"
                >
                  <Copy className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Public Token</label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md p-3">
                <code className="flex-1 text-sm text-gray-800">{testCredentials.publicToken}</code>
                <button
                  onClick={() => navigator.clipboard.writeText(testCredentials.publicToken)}
                  className="ml-2 p-1 hover:bg-gray-200 rounded"
                >
                  <Copy className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Secret Key</label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md p-3">
                <code className="flex-1 text-sm text-gray-800">{testCredentials.secretKey}</code>
                <button
                  onClick={() => navigator.clipboard.writeText(testCredentials.secretKey)}
                  className="ml-2 p-1 hover:bg-gray-200 rounded"
                >
                  <Copy className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Base URL</label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md p-3">
                <code className="flex-1 text-sm text-gray-800">{testCredentials.baseUrl}</code>
                <button
                  onClick={() => navigator.clipboard.writeText(testCredentials.baseUrl)}
                  className="ml-2 p-1 hover:bg-gray-200 rounded"
                >
                  <Copy className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Setup Instructions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Sandbox Setup</h2>
        <p className="text-gray-700 mb-4">
          Configure your client to use the sandbox environment:
        </p>
        <CodeBlock code={sandboxSetupCode} language="javascript" />
      </div>

      {/* API Testing Interface */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-2xl font-semibold text-gray-900">API Testing Interface</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* Endpoint Selection */}
          <div className="lg:border-r border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Endpoint</h3>
            <div className="space-y-2">
              {endpoints.map(endpoint => (
                <button
                  key={endpoint.id}
                  onClick={() => setActiveEndpoint(endpoint.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    activeEndpoint === endpoint.id
                      ? 'border-primary-300 bg-primary-50 text-primary-900'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{endpoint.name}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      endpoint.method === 'GET' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {endpoint.method}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{endpoint.description}</p>
                </button>
              ))}
            </div>
          </div>
          
          {/* Test Interface */}
          <div className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Test {endpoints.find(e => e.id === activeEndpoint)?.name}
              </h3>
              <button
                onClick={() => simulateAPICall(activeEndpoint)}
                disabled={isLoading}
                className="btn-primary flex items-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Testing...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Test API Call
                  </>
                )}
              </button>
            </div>
            
            {/* Request Details */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Request</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded mr-2 ${
                    endpoints.find(e => e.id === activeEndpoint)?.method === 'GET'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {endpoints.find(e => e.id === activeEndpoint)?.method}
                  </span>
                  <code className="text-sm text-gray-800">
                    {endpoints.find(e => e.id === activeEndpoint)?.path}
                  </code>
                </div>
                <p className="text-sm text-gray-600">
                  {endpoints.find(e => e.id === activeEndpoint)?.description}
                </p>
              </div>
            </div>
            
            {/* Response */}
            {testResult && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Response</h4>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    {JSON.stringify(testResult, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Test Scenarios */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Test Scenarios</h2>
        <p className="text-gray-700 mb-6">
          Use these predefined test scenarios to verify different payment outcomes:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {testScenarios.map(scenario => (
            <div key={scenario.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{scenario.title}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  scenario.expectedResult === 'completed' 
                    ? 'bg-green-100 text-green-800'
                    : scenario.expectedResult === 'failed'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {scenario.expectedResult}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{scenario.description}</p>
              <div className="space-y-1 text-xs">
                <div><strong>Customer Ref:</strong> <code>{scenario.customerReference}</code></div>
                <div><strong>Amount:</strong> {scenario.amount} XAF</div>
              </div>
            </div>
          ))}
        </div>
        
        <CodeBlock code={testPaymentCode} language="javascript" />
      </div>

      {/* Webhook Testing */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Webhook Testing</h2>
        <p className="text-gray-700 mb-6">
          Test webhook notifications locally using ngrok to expose your development server:
        </p>
        <CodeBlock code={webhookTestingCode} language="javascript" />
        
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-sm">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-800">Webhook Testing Tips</h4>
              <ul className="text-sm text-blue-700 mt-1 space-y-1">
                <li>• Use ngrok or similar tools to expose your local webhook endpoint</li>
                <li>• Test with different payment scenarios to verify webhook handling</li>
                <li>• Verify signature validation in your webhook handler</li>
                <li>• Test error scenarios and retry logic</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Sandbox Best Practices</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Testing Strategy</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Test all payment scenarios (success, failure, timeout)
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Verify webhook handling and signature validation
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Test error handling and retry logic
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Validate input parameters and formats
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Environment Management</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Keep sandbox and production credentials separate
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Use environment variables for configuration
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Test thoroughly before switching to production
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Monitor sandbox usage and limits
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SandboxPage;