import React from 'react';
import { Zap, Tv, Phone, CreditCard, School, Wallet, ShoppingCart, Lightbulb, Droplet } from 'lucide-react';
import ServiceCard from './ui/ServiceCard';

const services = [
  {
    id: 'electricity',
    title: 'Electricity Payments',
    description: 'Process electricity bill payments for various providers across Africa.',
    icon: <Lightbulb className="h-10 w-10 text-accent-500" />,
    category: 'Bill Payments',
  },
  {
    id: 'water',
    title: 'Water Bills',
    description: 'Process water utility bill payments for residential and commercial customers.',
    icon: <Droplet className="h-10 w-10 text-accent-500" />,
    category: 'Bill Payments',
  },
  {
    id: 'cable',
    title: 'Cable TV Services',
    description: 'Pay for cable TV subscriptions and packages from major providers.',
    icon: <Tv className="h-10 w-10 text-accent-500" />,
    category: 'Product Services',
  },
  {
    id: 'airtime',
    title: 'Mobile Airtime',
    description: 'Top-up mobile airtime for all major telecommunications operators.',
    icon: <Phone className="h-10 w-10 text-accent-500" />,
    category: 'Top-up Services',
  },
  {
    id: 'subscription',
    title: 'Subscriptions & Insurance',
    description: 'Process recurring subscription and insurance premium payments.',
    icon: <CreditCard className="h-10 w-10 text-accent-500" />,
    category: 'Subscription Payments',
  },
  {
    id: 'school',
    title: 'School & Association Fees',
    description: 'Collect school tuition and association membership fees efficiently.',
    icon: <School className="h-10 w-10 text-accent-500" />,
    category: 'Fee Payments',
  },
  {
    id: 'wallet',
    title: 'Mobile Wallet Operations',
    description: 'Facilitate cash-in and cash-out operations with mobile money wallets.',
    icon: <Wallet className="h-10 w-10 text-accent-500" />,
    category: 'Mobile Wallet',
  },
  {
    id: 'online',
    title: 'Online Payments',
    description: 'Accept and process secure online payments for e-commerce transactions.',
    icon: <ShoppingCart className="h-10 w-10 text-accent-500" />,
    category: 'Online Payments',
  }
];

const Services: React.FC = () => {
  const categories = [...new Set(services.map(service => service.category))];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">API Services</h2>
          <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            The Smobilpay S3P API provides a comprehensive suite of payment services
            to meet various financial transaction needs.
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((category, index) => (
            <div key={index} className="space-y-6">
              <h3 className="text-2xl font-semibold text-primary-900 border-l-4 border-accent-500 pl-3">
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {services
                  .filter(service => service.category === category)
                  .map(service => (
                    <ServiceCard 
                      key={service.id} 
                      title={service.title} 
                      description={service.description} 
                      icon={service.icon} 
                    />
                  ))
                }
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="https://apidocs.smobilpay.com/s3papi/services" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center"
          >
            View Full Services Documentation <Zap className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
