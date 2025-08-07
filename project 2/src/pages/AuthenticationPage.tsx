import React, { useState } from 'react';
import { Shield, Key, Lock, AlertTriangle, CheckCircle, Copy } from 'lucide-react';
import CodeBlock from '../components/ui/CodeBlock';

const AuthenticationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'tokens', label: 'Public Tokens', icon: Key },
    { id: 'signatures', label: 'Signatures', icon: Lock },
    { id: 'examples', label: 'Examples', icon: CheckCircle },
  ];

  const signatureGenerationCode = `const crypto = require('crypto');

function generateSignature(payload, secretKey) {
  // Step 1: Sort payload keys alphabetically
  const sortedPayload = Object.keys(payload)
    .sort()
    .reduce((acc, key) => {
      acc[key] = payload[key];
      return acc;
    }, {});
  
  // Step 2: Convert to JSON string (no spaces)
  const payloadString = JSON.stringify(sortedPayload);
  
  // Step 3: Generate HMAC-SHA256 signature
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(payloadString)
    .digest('hex');
  
  return signature;
}

// Example usage
const payload = {
  merchantId: 'MERCH123',
  timestamp: '2024-01-15T10:30:00Z',
  amount: 5000,
  currency: 'XAF',
  serviceId: 'ELEC001'
};

const secretKey = 'your-secret-key-here';
const signature = generateSignature(payload, secretKey);

console.log('Generated signature:', signature);`;

  const requestExampleCode = `// Complete request example with authentication
const axios = require('axios');
const crypto = require('crypto');

async function makeAuthenticatedRequest() {
  const payload = {
    merchantId: 'YOUR_MERCHANT_ID',
    timestamp: new Date().toISOString(),
    serviceId: 'ELEC001',
    amount: 5000,
    currency: 'XAF',
    customerReference: 'A123456789'
  };

  // Generate signature
  const signature = generateSignature(payload, 'YOUR_SECRET_KEY');

  // Make request
  try {
    const response = await axios.post(
      'https://api.smobilpay.com/s3papi/payments/initiate',
      payload,
      {
        headers: {
          'Authorization': 'Bearer YOUR_PUBLIC_TOKEN',
          'X-Auth-Signature': signature,
          'Content-Type': 'application/json',
          'User-Agent': 'YourApp/1.0'
        }
      }
    );

    console.log('Payment initiated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Request failed:', error.response?.data || error.message);
    throw error;
  }
}`;

  const phpExampleCode = `<?php
// PHP signature generation example
function generateSignature($payload, $secretKey) {
    // Sort payload keys alphabetically
    ksort($payload);
    
    // Convert to JSON string
    $payloadString = json_encode($payload, JSON_UNESCAPED_SLASHES);
    
    // Generate HMAC-SHA256 signature
    $signature = hash_hmac('sha256', $payloadString, $secretKey);
    
    return $signature;
}

// Example usage
$payload = [
    'merchantId' => 'YOUR_MERCHANT_ID',
    'timestamp' => date('c'),
    'amount' => 5000,
    'currency' => 'XAF',
    'serviceId' => 'ELEC001'
];

$secretKey = 'your-secret-key-here';
$signature = generateSignature($payload, $secretKey);

// Make authenticated request
$headers = [
    'Authorization: Bearer YOUR_PUBLIC_TOKEN',
    'X-Auth-Signature: ' . $signature,
    'Content-Type: application/json'
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.smobilpay.com/s3papi/payments/initiate');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>`;

  const pythonExampleCode = `import hmac
import hashlib
import json
import requests
from datetime import datetime

def generate_signature(payload, secret_key):
    """Generate HMAC-SHA256 signature for API request"""
    # Sort payload keys alphabetically
    sorted_payload = dict(sorted(payload.items()))
    
    # Convert to JSON string
    payload_string = json.dumps(sorted_payload, separators=(',', ':'))
    
    # Generate HMAC-SHA256 signature
    signature = hmac.new(
        secret_key.encode('utf-8'),
        payload_string.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    return signature

# Example usage
payload = {
    'merchantId': 'YOUR_MERCHANT_ID',
    'timestamp': datetime.utcnow().isoformat() + 'Z',
    'amount': 5000,
    'currency': 'XAF',
    'serviceId': 'ELEC001'
}

secret_key = 'your-secret-key-here'
signature = generate_signature(payload, secret_key)

# Make authenticated request
headers = {
    'Authorization': 'Bearer YOUR_PUBLIC_TOKEN',
    'X-Auth-Signature': signature,
    'Content-Type': 'application/json'
}

response = requests.post(
    'https://api.smobilpay.com/s3papi/payments/initiate',
    json=payload,
    headers=headers
)

print('Response:', response.json())`;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Authentication</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Learn how to securely authenticate your API requests using public tokens, 
          secret keys, and HMAC-SHA256 signatures.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Authentication Overview</h2>
                <p className="text-gray-700 mb-6">
                  The S3P API uses a multi-layered authentication approach to ensure maximum security 
                  for all transactions. Every API request must include proper authentication headers 
                  and a cryptographic signature.
                </p>
              </div>

              {/* Authentication Flow */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Authentication Flow</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-sm font-semibold text-primary-700">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Prepare Request Payload</h4>
                      <p className="text-gray-600 text-sm">
                        Create your request payload with all required parameters including merchantId and timestamp.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-sm font-semibold text-primary-700">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Generate Signature</h4>
                      <p className="text-gray-600 text-sm">
                        Sort payload parameters alphabetically, convert to JSON, and generate HMAC-SHA256 signature.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-sm font-semibold text-primary-700">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Include Headers</h4>
                      <p className="text-gray-600 text-sm">
                        Add Authorization header with your public token and X-Auth-Signature header with the signature.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-sm font-semibold text-primary-700">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Send Request</h4>
                      <p className="text-gray-600 text-sm">
                        Make the API request with proper headers and payload to the S3P API endpoint.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Components */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Key className="h-8 w-8 text-primary-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900">Public Token</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Identifies your application and is included in the Authorization header 
                    of every API request.
                  </p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Lock className="h-8 w-8 text-primary-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900">Secret Key</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Private key used to sign requests. Must be kept secure and never 
                    exposed in client-side code.
                  </p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Shield className="h-8 w-8 text-primary-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900">Signature</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    HMAC-SHA256 hash that verifies request authenticity and prevents 
                    tampering during transmission.
                  </p>
                </div>
              </div>

              {/* Security Warning */}
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-sm">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-red-800">Security Warning</h4>
                    <p className="text-sm text-red-700 mt-1">
                      Never expose your secret key in client-side applications, version control, 
                      or any publicly accessible location. Always store it securely on your server.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tokens' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Public Tokens</h2>
                <p className="text-gray-700 mb-6">
                  Public tokens are used to identify your application when making API requests. 
                  They are included in the Authorization header using the Bearer token format.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Token Format</h3>
                <p className="text-gray-700 mb-4">
                  Public tokens follow the standard Bearer token format:
                </p>
                <CodeBlock 
                  code="Authorization: Bearer pk_sandbox_1234567890abcdef" 
                  language="http" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Sandbox Tokens</h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• Start with <code className="bg-blue-100 px-1 rounded">pk_sandbox_</code></li>
                    <li>• Used for testing and development</li>
                    <li>• No real money transactions</li>
                    <li>• Same API endpoints as production</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Production Tokens</h3>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>• Start with <code className="bg-green-100 px-1 rounded">pk_live_</code></li>
                    <li>• Used for live transactions</li>
                    <li>• Process real money</li>
                    <li>• Require additional verification</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-sm">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">Best Practices</h4>
                    <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                      <li>• Store tokens securely in environment variables</li>
                      <li>• Use different tokens for different environments</li>
                      <li>• Rotate tokens periodically for enhanced security</li>
                      <li>• Never commit tokens to version control</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'signatures' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Request Signatures</h2>
                <p className="text-gray-700 mb-6">
                  Request signatures are HMAC-SHA256 hashes that verify the authenticity and 
                  integrity of your API requests. Every request must include a valid signature.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Signature Generation Process</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-1">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Sort Parameters</h4>
                      <p className="text-gray-600 text-sm">
                        Sort all request payload parameters alphabetically by key name.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-1">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">JSON Stringify</h4>
                      <p className="text-gray-600 text-sm">
                        Convert the sorted payload to a JSON string without spaces.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-1">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Generate HMAC</h4>
                      <p className="text-gray-600 text-sm">
                        Create HMAC-SHA256 hash using your secret key and the JSON string.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-1">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Hex Encode</h4>
                      <p className="text-gray-600 text-sm">
                        Convert the hash to a hexadecimal string representation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Implementation Example</h3>
                <CodeBlock code={signatureGenerationCode} language="javascript" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">✓ Correct Signature</h4>
                  <p className="text-sm text-green-800 mb-2">
                    Parameters sorted alphabetically:
                  </p>
                  <code className="text-xs bg-green-100 p-2 rounded block">
                    {`{"amount":5000,"currency":"XAF","merchantId":"MERCH123","timestamp":"2024-01-15T10:30:00Z"}`}
                  </code>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-2">✗ Incorrect Signature</h4>
                  <p className="text-sm text-red-800 mb-2">
                    Parameters not sorted:
                  </p>
                  <code className="text-xs bg-red-100 p-2 rounded block">
                    {`{"merchantId":"MERCH123","amount":5000,"timestamp":"2024-01-15T10:30:00Z","currency":"XAF"}`}
                  </code>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'examples' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Implementation Examples</h2>
                <p className="text-gray-700 mb-6">
                  Here are complete examples showing how to implement authentication 
                  in different programming languages.
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Node.js / JavaScript</h3>
                  <CodeBlock code={requestExampleCode} language="javascript" />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">PHP</h3>
                  <CodeBlock code={phpExampleCode} language="php" />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Python</h3>
                  <CodeBlock code={pythonExampleCode} language="python" />
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-sm">
                <div className="flex">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">Testing Your Implementation</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Use our sandbox environment to test your authentication implementation. 
                      All requests should return a 200 status code with valid signatures.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;