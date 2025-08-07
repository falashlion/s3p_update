import React, { useState } from 'react';
import { Key, Lock, Shield } from 'lucide-react';
import CodeBlock from './ui/CodeBlock';

const Authentication: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'tokens', label: 'Public Tokens' },
    { id: 'keys', label: 'Secret Keys' },
    { id: 'signatures', label: 'Signatures' },
  ];

  const signatureCodeExample = `// JavaScript example of signature generation
const crypto = require('crypto');

function generateSignature(payload, secretKey) {
  // Sort payload keys alphabetically
  const sortedPayload = Object.keys(payload)
    .sort()
    .reduce((acc, key) => {
      acc[key] = payload[key];
      return acc;
    }, {});
  
  // Create a string representation
  const payloadString = JSON.stringify(sortedPayload);
  
  // Generate HMAC using SHA256
  return crypto
    .createHmac('sha256', secretKey)
    .update(payloadString)
    .digest('hex');
}

// Example usage
const payload = {
  merchantId: 'YOUR_MERCHANT_ID',
  timestamp: new Date().toISOString(),
  amount: 1000,
  currency: 'XAF'
};

const signature = generateSignature(payload, 'YOUR_SECRET_KEY');
console.log(signature);`;

  return (
    <section id="authentication" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Authentication</h2>
          <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Secure your API requests with S3P's robust authentication mechanisms,
            designed for maximum security and ease of implementation.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap border-b border-gray-200 mb-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`px-5 py-3 font-medium text-sm leading-5 rounded-t-lg focus:outline-none transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'text-primary-800 border-b-2 border-primary-700 bg-gray-50'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-6 md:p-8 shadow-sm">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-primary-900">Authentication Process</h3>
                <p className="text-gray-700">
                  The S3P API uses a multi-layered authentication approach to ensure
                  that all transactions are secure and that only authorized applications
                  can access the API.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-primary-100 rounded-full">
                        <Key className="h-8 w-8 text-primary-700" />
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-primary-900 text-center mb-2">Public Tokens</h4>
                    <p className="text-sm text-gray-700 text-center">
                      Used to identify your application when making API requests
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-primary-100 rounded-full">
                        <Lock className="h-8 w-8 text-primary-700" />
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-primary-900 text-center mb-2">Secret Keys</h4>
                    <p className="text-sm text-gray-700 text-center">
                      Private keys used to sign requests and verify your identity
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-primary-100 rounded-full">
                        <Shield className="h-8 w-8 text-primary-700" />
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-primary-900 text-center mb-2">Request Signatures</h4>
                    <p className="text-sm text-gray-700 text-center">
                      Cryptographic signatures to ensure request integrity
                    </p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-xl font-semibold text-primary-900 mb-4">Authentication Flow</h4>
                  <ol className="space-y-4 ml-6">
                    <li className="list-decimal text-gray-700">
                      <span className="font-medium">Obtain credentials</span>: Register your application to receive your unique merchant ID, public token, and secret key.
                    </li>
                    <li className="list-decimal text-gray-700">
                      <span className="font-medium">Generate a signature</span>: For each request, create a cryptographic signature using your secret key and request payload.
                    </li>
                    <li className="list-decimal text-gray-700">
                      <span className="font-medium">Include authentication headers</span>: Add your public token in the Authorization header and your signature in the X-Auth-Signature header.
                    </li>
                    <li className="list-decimal text-gray-700">
                      <span className="font-medium">Make API request</span>: Send your request with proper authentication headers to the S3P API endpoint.
                    </li>
                  </ol>
                </div>
              </div>
            )}

            {activeTab === 'tokens' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-primary-900">Public Tokens</h3>
                <p className="text-gray-700">
                  Public tokens are used to identify your application when making API requests.
                  These tokens are included in the Authorization header of your requests.
                </p>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-6">
                  <h4 className="text-lg font-semibold text-primary-900 mb-4">Token Format</h4>
                  <p className="text-gray-700 mb-4">
                    Public tokens follow this format:
                  </p>
                  <CodeBlock code="Bearer YOUR_PUBLIC_TOKEN" language="bash" />
                  
                  <h4 className="text-lg font-semibold text-primary-900 mt-6 mb-4">Using Tokens in Requests</h4>
                  <CodeBlock 
                    code={`// Example HTTP request with Authorization header
GET /s3papi/services HTTP/1.1
Host: api.smobilpay.com
Content-Type: application/json
Authorization: Bearer YOUR_PUBLIC_TOKEN
X-Auth-Signature: YOUR_GENERATED_SIGNATURE

{
  "merchantId": "YOUR_MERCHANT_ID",
  "timestamp": "2023-07-14T12:00:00Z"
}`} 
                    language="bash" 
                  />
                  
                  <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-sm">
                    <h5 className="text-base font-semibold text-yellow-800 mb-2">Important Note</h5>
                    <p className="text-sm text-yellow-700">
                      Never share your public token in client-side code. Always make API requests from your server
                      to protect your credentials.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'keys' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-primary-900">Secret Keys</h3>
                <p className="text-gray-700">
                  Secret keys are private credentials used to sign your API requests.
                  These keys should never be shared or exposed in client-side code.
                </p>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-6">
                  <h4 className="text-lg font-semibold text-primary-900 mb-4">Key Security</h4>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Your secret key is used to generate request signatures that verify the authenticity
                      of your API requests. Protect your secret key with these best practices:
                    </p>
                    
                    <ul className="space-y-2 ml-6">
                      <li className="list-disc text-gray-700">
                        <span className="font-medium">Never hardcode</span> your secret key in client-side applications
                      </li>
                      <li className="list-disc text-gray-700">
                        <span className="font-medium">Store securely</span> in environment variables or a secure vault
                      </li>
                      <li className="list-disc text-gray-700">
                        <span className="font-medium">Rotate keys periodically</span> for enhanced security
                      </li>
                      <li className="list-disc text-gray-700">
                        <span className="font-medium">Use separate keys</span> for development and production environments
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-sm">
                    <h5 className="text-base font-semibold text-red-800 mb-2">Security Warning</h5>
                    <p className="text-sm text-red-700">
                      If you suspect your secret key has been compromised, contact Maviance support
                      immediately to revoke and replace it.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'signatures' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-primary-900">Request Signatures</h3>
                <p className="text-gray-700">
                  Request signatures are cryptographic hashes that verify the authenticity and integrity
                  of your API requests. Each request must include a signature generated using your secret key.
                </p>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-6">
                  <h4 className="text-lg font-semibold text-primary-900 mb-4">Signature Generation</h4>
                  <p className="text-gray-700 mb-4">
                    Follow these steps to generate a valid signature:
                  </p>
                  
                  <ol className="space-y-3 ml-6 mb-6">
                    <li className="list-decimal text-gray-700">
                      Sort all request payload parameters alphabetically by key
                    </li>
                    <li className="list-decimal text-gray-700">
                      Convert the sorted payload to a JSON string
                    </li>
                    <li className="list-decimal text-gray-700">
                      Generate an HMAC-SHA256 hash of the string using your secret key
                    </li>
                    <li className="list-decimal text-gray-700">
                      Convert the hash to a hexadecimal string
                    </li>
                    <li className="list-decimal text-gray-700">
                      Include this signature in the X-Auth-Signature header
                    </li>
                  </ol>
                  
                  <h4 className="text-lg font-semibold text-primary-900 mb-4">Signature Code Example</h4>
                  <CodeBlock code={signatureCodeExample} language="javascript" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Authentication;