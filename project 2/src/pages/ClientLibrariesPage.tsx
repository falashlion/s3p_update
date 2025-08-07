import React from 'react';
import { Github, Download, Code, BookOpen, ExternalLink, Copy } from 'lucide-react';
import CodeBlock from '../components/ui/CodeBlock';

const ClientLibrariesPage: React.FC = () => {
  const libraries = [
    {
      id: 'javascript',
      name: 'JavaScript/Node.js SDK',
      description: 'Official JavaScript client library with TypeScript support for Node.js and browser environments.',
      version: 'v2.1.0',
      language: 'JavaScript',
      logo: '🟨',
      github: 'https://github.com/maviance/smobilpay-js',
      npm: 'https://www.npmjs.com/package/@maviance/s3p-api',
      docs: 'https://apidocs.smobilpay.com/s3papi/clients/javascript',
      installCommand: 'npm install @maviance/s3p-api',
      features: ['TypeScript support', 'Promise-based API', 'Automatic retries', 'Built-in validation'],
      example: `const S3PClient = require('@maviance/s3p-api');

const client = new S3PClient({
  merchantId: 'YOUR_MERCHANT_ID',
  publicToken: 'YOUR_PUBLIC_TOKEN',
  secretKey: 'YOUR_SECRET_KEY',
  environment: 'sandbox'
});

// Get services
const services = await client.services.getAll();

// Initiate payment
const payment = await client.payments.initiate({
  serviceId: 'ELEC001',
  amount: 5000,
  currency: 'XAF',
  customerReference: 'A123456789'
});`
    },
    {
      id: 'php',
      name: 'PHP SDK',
      description: 'Comprehensive PHP client library compatible with PHP 7.4+ and 8.x versions.',
      version: 'v2.0.3',
      language: 'PHP',
      logo: '🐘',
      github: 'https://github.com/maviance/smobilpay-php',
      packagist: 'https://packagist.org/packages/maviance/smobilpay-s3p',
      docs: 'https://apidocs.smobilpay.com/s3papi/clients/php',
      installCommand: 'composer require maviance/smobilpay-s3p',
      features: ['PSR-4 autoloading', 'Exception handling', 'Guzzle HTTP client', 'Laravel integration'],
      example: `<?php
use Maviance\\S3P\\S3PClient;

$client = new S3PClient([
    'merchantId' => 'YOUR_MERCHANT_ID',
    'publicToken' => 'YOUR_PUBLIC_TOKEN',
    'secretKey' => 'YOUR_SECRET_KEY',
    'environment' => 'sandbox'
]);

// Get services
$services = $client->services()->getAll();

// Initiate payment
$payment = $client->payments()->initiate([
    'serviceId' => 'ELEC001',
    'amount' => 5000,
    'currency' => 'XAF',
    'customerReference' => 'A123456789'
]);`
    },
    {
      id: 'python',
      name: 'Python SDK',
      description: 'Python client library with async support, compatible with Python 3.7+ versions.',
      version: 'v1.8.1',
      language: 'Python',
      logo: '🐍',
      github: 'https://github.com/maviance/smobilpay-python',
      pypi: 'https://pypi.org/project/smobilpay-s3p/',
      docs: 'https://apidocs.smobilpay.com/s3papi/clients/python',
      installCommand: 'pip install smobilpay-s3p',
      features: ['Async/await support', 'Type hints', 'Pydantic models', 'Django integration'],
      example: `from smobilpay_s3p import S3PClient

client = S3PClient(
    merchant_id='YOUR_MERCHANT_ID',
    public_token='YOUR_PUBLIC_TOKEN',
    secret_key='YOUR_SECRET_KEY',
    environment='sandbox'
)

# Get services
services = await client.services.get_all()

# Initiate payment
payment = await client.payments.initiate(
    service_id='ELEC001',
    amount=5000,
    currency='XAF',
    customer_reference='A123456789'
)`
    },
    {
      id: 'java',
      name: 'Java SDK',
      description: 'Robust Java client library with Spring Boot integration, compatible with Java 8+.',
      version: 'v1.5.2',
      language: 'Java',
      logo: '☕',
      github: 'https://github.com/maviance/smobilpay-java',
      maven: 'https://mvnrepository.com/artifact/com.maviance/smobilpay-s3p',
      docs: 'https://apidocs.smobilpay.com/s3papi/clients/java',
      installCommand: 'implementation "com.maviance:smobilpay-s3p:1.5.2"',
      features: ['Spring Boot starter', 'Reactive support', 'Jackson serialization', 'Comprehensive logging'],
      example: `import com.maviance.s3p.S3PClient;
import com.maviance.s3p.model.PaymentRequest;

S3PClient client = S3PClient.builder()
    .merchantId("YOUR_MERCHANT_ID")
    .publicToken("YOUR_PUBLIC_TOKEN")
    .secretKey("YOUR_SECRET_KEY")
    .environment("sandbox")
    .build();

// Get services
List<Service> services = client.services().getAll();

// Initiate payment
PaymentRequest request = PaymentRequest.builder()
    .serviceId("ELEC001")
    .amount(5000)
    .currency("XAF")
    .customerReference("A123456789")
    .build();

Payment payment = client.payments().initiate(request);`
    }
  ];

  const quickStartCode = `// Quick start example - JavaScript
const S3PClient = require('@maviance/s3p-api');

// Initialize client
const client = new S3PClient({
  merchantId: process.env.S3P_MERCHANT_ID,
  publicToken: process.env.S3P_PUBLIC_TOKEN,
  secretKey: process.env.S3P_SECRET_KEY,
  environment: 'sandbox' // or 'production'
});

// Example: Pay electricity bill
async function payElectricityBill(customerNumber, amount) {
  try {
    // Initiate payment
    const payment = await client.payments.initiate({
      serviceId: 'ELEC001',
      amount: amount * 100, // Convert to minor units
      currency: 'XAF',
      customerReference: customerNumber,
      callbackUrl: 'https://your-app.com/webhook'
    });

    console.log('Payment initiated:', payment.transactionId);
    
    // Check status
    const status = await client.payments.getStatus(payment.transactionId);
    console.log('Payment status:', status.status);
    
    return payment;
  } catch (error) {
    console.error('Payment failed:', error.message);
    throw error;
  }
}`;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Client Libraries</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Official SDKs and client libraries to accelerate your integration 
          with the Smobilpay S3P API across multiple programming languages.
        </p>
      </div>

      {/* Quick Start */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-2xl font-semibold text-gray-900">Quick Start</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-700 mb-4">
            Get started quickly with our JavaScript SDK. Install the package and start processing payments in minutes:
          </p>
          <CodeBlock code={quickStartCode} language="javascript" />
        </div>
      </div>

      {/* Libraries Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {libraries.map(library => (
          <div key={library.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="text-3xl mr-3">{library.logo}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{library.name}</h3>
                    <span className="text-sm font-medium text-primary-600 bg-primary-100 px-2 py-1 rounded">
                      {library.version}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{library.description}</p>
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Features</h4>
                <div className="grid grid-cols-2 gap-1">
                  {library.features.map(feature => (
                    <div key={feature} className="text-xs text-gray-600 flex items-center">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Installation</h4>
                <div className="bg-gray-100 rounded p-3 font-mono text-sm text-gray-800 overflow-x-auto relative group">
                  <code>{library.installCommand}</code>
                  <button
                    onClick={() => navigator.clipboard.writeText(library.installCommand)}
                    className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded"
                  >
                    <Copy className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <a 
                  href={library.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-outline-primary flex items-center justify-center text-sm"
                >
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </a>
                <a 
                  href={library.docs} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-outline-primary flex items-center justify-center text-sm"
                >
                  <BookOpen className="mr-2 h-4 w-4" /> Docs
                </a>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                {library.npm && (
                  <a 
                    href={library.npm} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-center py-2 px-3 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                  >
                    <ExternalLink className="inline h-3 w-3 mr-1" /> NPM Package
                  </a>
                )}
                {library.packagist && (
                  <a 
                    href={library.packagist} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-center py-2 px-3 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                  >
                    <ExternalLink className="inline h-3 w-3 mr-1" /> Packagist
                  </a>
                )}
                {library.pypi && (
                  <a 
                    href={library.pypi} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-center py-2 px-3 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                  >
                    <ExternalLink className="inline h-3 w-3 mr-1" /> PyPI
                  </a>
                )}
                {library.maven && (
                  <a 
                    href={library.maven} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-center py-2 px-3 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                  >
                    <ExternalLink className="inline h-3 w-3 mr-1" /> Maven Central
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Code Examples */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Code Examples</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how easy it is to integrate with the S3P API using our official client libraries.
          </p>
        </div>
        
        {libraries.map(library => (
          <div key={library.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center">
                <div className="text-2xl mr-3">{library.logo}</div>
                <h3 className="text-xl font-semibold text-gray-900">{library.name} Example</h3>
              </div>
            </div>
            <div className="p-6">
              <CodeBlock code={library.example} language={library.language.toLowerCase()} />
            </div>
          </div>
        ))}
      </div>

      {/* Community Libraries */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Community Libraries</h2>
        <p className="text-gray-700 mb-6">
          Don't see a library for your preferred language? The S3P API follows RESTful principles 
          and can be integrated with any programming language that supports HTTP requests.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">🦀 Rust</h3>
            <p className="text-sm text-gray-600 mb-3">
              Community-maintained Rust crate for S3P API integration.
            </p>
            <a href="#" className="text-primary-700 hover:text-primary-800 text-sm font-medium">
              View on crates.io →
            </a>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">🔷 C#/.NET</h3>
            <p className="text-sm text-gray-600 mb-3">
              NuGet package for .NET applications and services.
            </p>
            <a href="#" className="text-primary-700 hover:text-primary-800 text-sm font-medium">
              View on NuGet →
            </a>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">🐹 Go</h3>
            <p className="text-sm text-gray-600 mb-3">
              Go module for high-performance API integration.
            </p>
            <a href="#" className="text-primary-700 hover:text-primary-800 text-sm font-medium">
              View on pkg.go.dev →
            </a>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-sm">
          <div className="flex">
            <Code className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-800">Need a Custom Library?</h4>
              <p className="text-sm text-blue-700 mt-1">
                Contact our developer support team if you need assistance creating a client library 
                for a specific programming language or framework.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Support */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 rounded-lg p-8 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Need Help with Integration?</h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Our developer support team is here to help you get started with any of our client libraries. 
            Get personalized assistance with your integration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:api-support@smobilpay.com"
              className="bg-white text-primary-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="https://community.smobilpay.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-primary-300 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
            >
              Join Community
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLibrariesPage;