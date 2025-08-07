import React, { useState } from 'react';
import { Search, Filter, Zap, Lightbulb, Droplet, Tv, Phone, CreditCard, School, Wallet, ShoppingCart, ExternalLink } from 'lucide-react';
import CodeBlock from '../components/ui/CodeBlock';

const ServicesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const services = [
    {
      id: 'ELEC001',
      name: 'Electricity Bill Payment',
      category: 'Bill Payments',
      description: 'Process electricity bill payments for various providers across Africa',
      icon: <Lightbulb className="h-8 w-8 text-accent-500" />,
      providers: ['ENEO', 'AES-SONEL', 'EDM'],
      fields: [
        { name: 'customerNumber', type: 'string', required: true, description: 'Customer account number' },
        { name: 'amount', type: 'number', required: true, description: 'Payment amount in minor units' }
      ]
    },
    {
      id: 'WATER001',
      name: 'Water Bill Payment',
      category: 'Bill Payments',
      description: 'Process water utility bill payments for residential and commercial customers',
      icon: <Droplet className="h-8 w-8 text-accent-500" />,
      providers: ['CAMWATER', 'CDE'],
      fields: [
        { name: 'customerNumber', type: 'string', required: true, description: 'Customer account number' },
        { name: 'amount', type: 'number', required: true, description: 'Payment amount in minor units' }
      ]
    },
    {
      id: 'CABLE001',
      name: 'Cable TV Subscription',
      category: 'Product Services',
      description: 'Pay for cable TV subscriptions and packages from major providers',
      icon: <Tv className="h-8 w-8 text-accent-500" />,
      providers: ['CANAL+', 'STARTIMES', 'AZAM TV'],
      fields: [
        { name: 'smartCardNumber', type: 'string', required: true, description: 'Smart card number' },
        { name: 'packageId', type: 'string', required: true, description: 'Subscription package ID' }
      ]
    },
    {
      id: 'AIRTIME001',
      name: 'Mobile Airtime Top-up',
      category: 'Top-up Services',
      description: 'Top-up mobile airtime for all major telecommunications operators',
      icon: <Phone className="h-8 w-8 text-accent-500" />,
      providers: ['MTN', 'ORANGE', 'CAMTEL'],
      fields: [
        { name: 'phoneNumber', type: 'string', required: true, description: 'Mobile phone number' },
        { name: 'amount', type: 'number', required: true, description: 'Top-up amount in minor units' }
      ]
    },
    {
      id: 'INSURANCE001',
      name: 'Insurance Premium',
      category: 'Subscription Payments',
      description: 'Process recurring subscription and insurance premium payments',
      icon: <CreditCard className="h-8 w-8 text-accent-500" />,
      providers: ['ACTIVA', 'SAHAM', 'ALLIANZ'],
      fields: [
        { name: 'policyNumber', type: 'string', required: true, description: 'Insurance policy number' },
        { name: 'amount', type: 'number', required: true, description: 'Premium amount in minor units' }
      ]
    },
    {
      id: 'SCHOOL001',
      name: 'School Fee Payment',
      category: 'Fee Payments',
      description: 'Collect school tuition and association membership fees efficiently',
      icon: <School className="h-8 w-8 text-accent-500" />,
      providers: ['Various Schools', 'Universities'],
      fields: [
        { name: 'studentId', type: 'string', required: true, description: 'Student identification number' },
        { name: 'amount', type: 'number', required: true, description: 'Fee amount in minor units' },
        { name: 'academicYear', type: 'string', required: false, description: 'Academic year' }
      ]
    },
    {
      id: 'WALLET001',
      name: 'Mobile Money Cash-In',
      category: 'Mobile Wallet',
      description: 'Facilitate cash-in operations with mobile money wallets',
      icon: <Wallet className="h-8 w-8 text-accent-500" />,
      providers: ['MTN MOMO', 'ORANGE MONEY'],
      fields: [
        { name: 'phoneNumber', type: 'string', required: true, description: 'Mobile money account number' },
        { name: 'amount', type: 'number', required: true, description: 'Cash-in amount in minor units' }
      ]
    },
    {
      id: 'ECOMMERCE001',
      name: 'Online Payment',
      category: 'Online Payments',
      description: 'Accept and process secure online payments for e-commerce transactions',
      icon: <ShoppingCart className="h-8 w-8 text-accent-500" />,
      providers: ['Various Payment Methods'],
      fields: [
        { name: 'orderId', type: 'string', required: true, description: 'Unique order identifier' },
        { name: 'amount', type: 'number', required: true, description: 'Payment amount in minor units' },
        { name: 'customerEmail', type: 'string', required: true, description: 'Customer email address' }
      ]
    }
  ];

  const categories = ['all', ...new Set(services.map(service => service.category))];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const exampleCode = `// Get all available services
const services = await client.services.getAll();

// Get specific service details
const service = await client.services.getById('ELEC001');

// Initiate payment for electricity bill
const payment = await client.payments.initiate({
  serviceId: 'ELEC001',
  amount: 5000, // 50.00 XAF
  currency: 'XAF',
  customerReference: 'A123456789',
  callbackUrl: 'https://your-app.com/webhook'
});`;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">API Services</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive payment services covering bills, mobile money, subscriptions, 
          and online transactions across Africa.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
            >
              <option value="all">All Categories</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map(service => (
          <div key={service.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  {service.icon}
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                    <span className="text-xs font-medium text-primary-600 bg-primary-100 px-2 py-1 rounded">
                      {service.id}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{service.description}</p>
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Providers</h4>
                <div className="flex flex-wrap gap-1">
                  {service.providers.map(provider => (
                    <span key={provider} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {provider}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Required Fields</h4>
                <div className="space-y-1">
                  {service.fields.slice(0, 2).map(field => (
                    <div key={field.name} className="text-xs text-gray-600">
                      <code className="bg-gray-100 px-1 rounded">{field.name}</code>
                      <span className="ml-1">({field.type})</span>
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </div>
                  ))}
                  {service.fields.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{service.fields.length - 2} more fields
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* API Usage Example */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">API Usage Example</h2>
            <a
              href="https://apidocs.smobilpay.com/s3papi/services"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 hover:text-primary-800 font-medium flex items-center text-sm"
            >
              Full API Reference <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="p-6">
          <CodeBlock code={exampleCode} language="javascript" />
        </div>
      </div>

      {/* Service Categories Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.slice(1).map(category => {
          const categoryServices = services.filter(s => s.category === category);
          return (
            <div key={category} className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-6 border border-primary-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-2">{category}</h3>
              <p className="text-sm text-primary-700 mb-3">
                {categoryServices.length} service{categoryServices.length !== 1 ? 's' : ''} available
              </p>
              <div className="space-y-1">
                {categoryServices.slice(0, 3).map(service => (
                  <div key={service.id} className="text-xs text-primary-600">
                    • {service.name}
                  </div>
                ))}
                {categoryServices.length > 3 && (
                  <div className="text-xs text-primary-500">
                    +{categoryServices.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesPage;