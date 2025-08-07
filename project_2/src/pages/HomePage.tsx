import React from 'react';
import { ArrowRight, Zap, Shield, Globe, Code, BookOpen, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import CodeBlock from '../components/ui/CodeBlock';

const HomePage: React.FC = () => {
  const quickStartCode = `// Initialize S3P API Client
const S3PClient = require('@maviance/s3p-api');

const client = new S3PClient({
  merchantId: 'YOUR_MERCHANT_ID',
  publicToken: 'YOUR_PUBLIC_TOKEN',
  secretKey: 'YOUR_SECRET_KEY',
  environment: 'sandbox' // or 'production'
});

// Get available services
const services = await client.services.getAll();
console.log('Available services:', services);

// Initiate a payment
const payment = await client.payments.initiate({
  serviceId: 'ELEC001',
  amount: 5000,
  currency: 'XAF',
  customerReference: 'A123456789'
});

console.log('Payment initiated:', payment.transactionId);`;

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-accent-500" />,
      title: 'Lightning Fast',
      description: 'Process payments in seconds with our optimized API infrastructure'
    },
    {
      icon: <Shield className="h-8 w-8 text-accent-500" />,
      title: 'Bank-Grade Security',
      description: 'Enterprise-level security with end-to-end encryption and compliance'
    },
    {
      icon: <Globe className="h-8 w-8 text-accent-500" />,
      title: 'Pan-African Coverage',
      description: 'Support for multiple countries and payment methods across Africa'
    },
    {
      icon: <Code className="h-8 w-8 text-accent-500" />,
      title: 'Developer Friendly',
      description: 'RESTful API with comprehensive SDKs and detailed documentation'
    }
  ];

  const useCases = [
    {
      title: 'Bill Payments',
      description: 'Electricity, water, cable TV, and utility bill processing',
      color: 'bg-blue-50 border-blue-200 text-blue-800'
    },
    {
      title: 'Mobile Money',
      description: 'Cash-in, cash-out, and wallet-to-wallet transfers',
      color: 'bg-green-50 border-green-200 text-green-800'
    },
    {
      title: 'E-commerce',
      description: 'Online payment processing for digital marketplaces',
      color: 'bg-purple-50 border-purple-200 text-purple-800'
    },
    {
      title: 'Subscriptions',
      description: 'Recurring payments and subscription management',
      color: 'bg-orange-50 border-orange-200 text-orange-800'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Smobilpay S3P API
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The most comprehensive payment API for Africa. Process bills, mobile money, 
            and online payments with a single, powerful integration.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/getting-started"
            className="btn-primary flex items-center justify-center text-lg px-8 py-4"
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <a
            href="https://apidocs.smobilpay.com/s3papi/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center justify-center text-lg px-8 py-4"
          >
            View Live Docs <ExternalLink className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Quick Start Code */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">Quick Start</h2>
            <Link
              to="/getting-started"
              className="text-primary-700 hover:text-primary-800 font-medium flex items-center"
            >
              Full Guide <BookOpen className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="p-6">
          <CodeBlock code={quickStartCode} language="javascript" />
        </div>
      </div>

      {/* Use Cases */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Built for Every Use Case</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From simple bill payments to complex e-commerce integrations, 
            S3P API handles it all with ease.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border-2 ${useCase.color} hover:shadow-md transition-all duration-300`}
            >
              <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
              <p className="text-sm opacity-80">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* API Stats */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 rounded-xl p-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-accent-400 mb-2">99.9%</div>
            <div className="text-primary-100">Uptime SLA</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-accent-400 mb-2">50+</div>
            <div className="text-primary-100">Payment Services</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-accent-400 mb-2">10M+</div>
            <div className="text-primary-100">Transactions/Month</div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Ready to Get Started?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/getting-started"
            className="p-6 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 group"
          >
            <BookOpen className="h-8 w-8 text-primary-600 mb-3 group-hover:text-primary-700" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Read the Guide</h3>
            <p className="text-gray-600 text-sm">
              Step-by-step integration guide with examples
            </p>
          </Link>
          
          <Link
            to="/sandbox"
            className="p-6 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 group"
          >
            <Code className="h-8 w-8 text-primary-600 mb-3 group-hover:text-primary-700" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Try the Sandbox</h3>
            <p className="text-gray-600 text-sm">
              Test API calls in our sandbox environment
            </p>
          </Link>
          
          <Link
            to="/support"
            className="p-6 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 group"
          >
            <Shield className="h-8 w-8 text-primary-600 mb-3 group-hover:text-primary-700" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Support</h3>
            <p className="text-gray-600 text-sm">
              Contact our developer support team
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;