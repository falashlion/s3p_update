import React, { useState } from 'react';
import { Code, Server, Info, ArrowRight, Globe } from 'lucide-react';

const endpoints = [
  {
    id: 'get-services',
    method: 'GET',
    path: '/s3papi/services',
    description: 'Retrieve a list of all available services',
    response: `{
  "success": true,
  "data": [
    {
      "id": "123",
      "name": "Electricity Bill Payment",
      "category": "utilities",
      "description": "Pay for electricity bills"
    },
    {
      "id": "124",
      "name": "Water Bill Payment",
      "category": "utilities",
      "description": "Pay for water bills"
    }
  ]
}`
  },
  {
    id: 'get-service',
    method: 'GET',
    path: '/s3papi/services/{serviceId}',
    description: 'Get details for a specific service',
    response: `{
  "success": true,
  "data": {
    "id": "123",
    "name": "Electricity Bill Payment",
    "category": "utilities",
    "description": "Pay for electricity bills",
    "fields": [
      {
        "name": "customerNumber",
        "type": "string",
        "required": true,
        "description": "Customer account number"
      },
      {
        "name": "amount",
        "type": "number",
        "required": true,
        "description": "Payment amount"
      }
    ]
  }
}`
  },
  {
    id: 'initiate-payment',
    method: 'POST',
    path: '/s3papi/payments/initiate',
    description: 'Initiate a new payment transaction',
    response: `{
  "success": true,
  "data": {
    "transactionId": "TRX123456789",
    "status": "pending",
    "amount": 5000,
    "currency": "XAF",
    "createdAt": "2023-07-14T12:30:45Z",
    "expiresAt": "2023-07-14T13:30:45Z"
  }
}`
  },
  {
    id: 'payment-status',
    method: 'GET',
    path: '/s3papi/payments/{transactionId}/status',
    description: 'Check the status of a payment',
    response: `{
  "success": true,
  "data": {
    "transactionId": "TRX123456789",
    "status": "completed",
    "amount": 5000,
    "currency": "XAF",
    "createdAt": "2023-07-14T12:30:45Z",
    "completedAt": "2023-07-14T12:35:12Z",
    "receipt": {
      "number": "REC-987654321",
      "url": "https://api.smobilpay.com/receipts/REC-987654321"
    }
  }
}`
  }
];

const ApiReference: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0].id);

  const getEndpoint = (id: string) => endpoints.find(endpoint => endpoint.id === id) || endpoints[0];
  const activeEndpoint = getEndpoint(selectedEndpoint);

  return (
    <section id="api" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">API Reference</h2>
          <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Browse the S3P API endpoints, request formats, and response schemas to
            jumpstart your integration.
          </p>
        </div>

        <div className="max-w-6xl mx-auto bg-gray-50 rounded-lg shadow-sm overflow-hidden border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            <div className="md:border-r border-gray-200 bg-gray-100">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <Server className="h-5 w-5 text-primary-700" />
                  <h3 className="text-lg font-semibold text-gray-900">Endpoints</h3>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {endpoints.map(endpoint => (
                  <button
                    key={endpoint.id}
                    className={`w-full text-left p-4 transition-colors duration-200 ${
                      selectedEndpoint === endpoint.id
                        ? 'bg-primary-50 border-l-4 border-primary-600'
                        : 'hover:bg-gray-50 border-l-4 border-transparent'
                    }`}
                    onClick={() => setSelectedEndpoint(endpoint.id)}
                  >
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          endpoint.method === 'GET'
                            ? 'bg-green-100 text-green-800'
                            : endpoint.method === 'POST'
                            ? 'bg-blue-100 text-blue-800'
                            : endpoint.method === 'PUT'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {endpoint.method}
                      </span>
                      <span className="text-sm font-medium text-gray-700 truncate">
                        {endpoint.path.split('/').pop()}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 truncate">
                      {endpoint.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="col-span-1 md:col-span-2 lg:col-span-3 p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        activeEndpoint.method === 'GET'
                          ? 'bg-green-100 text-green-800'
                          : activeEndpoint.method === 'POST'
                          ? 'bg-blue-100 text-blue-800'
                          : activeEndpoint.method === 'PUT'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {activeEndpoint.method}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {activeEndpoint.path}
                    </h3>
                  </div>
                  <p className="text-gray-700 mb-6">
                    {activeEndpoint.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                      Request Format
                    </h4>
                    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-x-auto">
                      {activeEndpoint.method === 'GET' ? (
                        <pre>{`${activeEndpoint.method} ${activeEndpoint.path} HTTP/1.1
Host: api.smobilpay.com
Content-Type: application/json
Authorization: Bearer YOUR_PUBLIC_TOKEN
X-Auth-Signature: YOUR_GENERATED_SIGNATURE`}</pre>
                      ) : (
                        <pre>{`${activeEndpoint.method} ${activeEndpoint.path} HTTP/1.1
Host: api.smobilpay.com
Content-Type: application/json
Authorization: Bearer YOUR_PUBLIC_TOKEN
X-Auth-Signature: YOUR_GENERATED_SIGNATURE

{
  "merchantId": "YOUR_MERCHANT_ID",
  "timestamp": "${new Date().toISOString()}",
  "amount": 5000,
  "currency": "XAF",
  "customerReference": "CUST123456"
}`}</pre>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                      Response Format
                    </h4>
                    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-x-auto">
                      <pre>{activeEndpoint.response}</pre>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-100">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Info className="h-5 w-5 text-primary-700" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-primary-800">Documentation Note</h4>
                      <p className="mt-1 text-sm text-primary-700">
                        This is a simplified version of the API reference. For complete documentation,
                        parameter details, and error handling, please refer to the full API documentation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <a 
                  href="https://apidocs.smobilpay.com/s3papi/reference" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-700 hover:text-primary-800 font-medium flex items-center"
                >
                  <Globe className="mr-2 h-5 w-5" />
                  View Full API Reference
                </a>
                
                <a 
                  href={`https://apidocs.smobilpay.com/s3papi/reference${activeEndpoint.path}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-700 hover:text-primary-800 font-medium flex items-center"
                >
                  View Endpoint Details
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApiReference;