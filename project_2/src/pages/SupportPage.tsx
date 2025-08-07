import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, ExternalLink, Clock, CheckCircle, AlertCircle, Search } from 'lucide-react';

const SupportPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('general');

  const supportChannels = [
    {
      id: 'email',
      name: 'Email Support',
      icon: <Mail className="h-6 w-6 text-primary-600" />,
      description: '24/7 support for urgent integration issues',
      contact: 'api-support@smobilpay.com',
      responseTime: 'Within 4 hours',
      availability: '24/7'
    },
    {
      id: 'phone',
      name: 'Phone Support',
      icon: <Phone className="h-6 w-6 text-primary-600" />,
      description: 'Direct phone support for critical issues',
      contact: '+237 200 000 000',
      responseTime: 'Immediate',
      availability: 'Mon-Fri, 8:00 AM - 5:00 PM (CAT)'
    },
    {
      id: 'community',
      name: 'Developer Community',
      icon: <MessageCircle className="h-6 w-6 text-primary-600" />,
      description: 'Connect with other developers and get community support',
      contact: 'community.smobilpay.com',
      responseTime: 'Varies',
      availability: '24/7'
    }
  ];

  const faqCategories = [
    { id: 'general', name: 'General' },
    { id: 'authentication', name: 'Authentication' },
    { id: 'payments', name: 'Payments' },
    { id: 'webhooks', name: 'Webhooks' },
    { id: 'errors', name: 'Errors' }
  ];

  const faqs = {
    general: [
      {
        question: 'How do I get started with the S3P API?',
        answer: 'To get started, you need to register for API credentials, install one of our client libraries, and follow our getting started guide. You can test your integration in our sandbox environment before going live.'
      },
      {
        question: 'What programming languages are supported?',
        answer: 'We provide official client libraries for JavaScript/Node.js, PHP, Python, and Java. The API follows REST principles and can be integrated with any language that supports HTTP requests.'
      },
      {
        question: 'Is there a rate limit for API requests?',
        answer: 'Yes, the API has rate limits to ensure fair usage. The default limit is 1000 requests per hour per API key. Contact support if you need higher limits for your use case.'
      },
      {
        question: 'How much does it cost to use the S3P API?',
        answer: 'Pricing varies based on transaction volume and services used. Contact our sales team for detailed pricing information and custom enterprise plans.'
      }
    ],
    authentication: [
      {
        question: 'How does API authentication work?',
        answer: 'The S3P API uses HMAC-SHA256 signature-based authentication. Each request must include your public token in the Authorization header and a signature in the X-Auth-Signature header.'
      },
      {
        question: 'What should I do if my API key is compromised?',
        answer: 'Immediately contact our support team to revoke the compromised key and issue new credentials. Update your application with the new credentials as soon as possible.'
      },
      {
        question: 'Can I use the same API keys for sandbox and production?',
        answer: 'No, sandbox and production environments use different API keys. Always use sandbox keys for testing and production keys only for live transactions.'
      }
    ],
    payments: [
      {
        question: 'How long does it take for payments to be processed?',
        answer: 'Payment processing times vary by service and provider. Most payments are processed within 30 seconds to 5 minutes. You will receive webhook notifications when the payment status changes.'
      },
      {
        question: 'What happens if a payment fails?',
        answer: 'Failed payments will have a status of "failed" and include a failure reason. You can retry the payment or provide alternative payment options to your customers.'
      },
      {
        question: 'Can I refund a payment through the API?',
        answer: 'Refund capabilities depend on the specific service and provider. Contact support to discuss refund options for your use case.'
      }
    ],
    webhooks: [
      {
        question: 'How do I verify webhook signatures?',
        answer: 'Webhook signatures are generated using HMAC-SHA256 with your webhook secret. Always verify signatures to ensure the webhook is from Smobilpay and hasn\'t been tampered with.'
      },
      {
        question: 'What should I do if I miss a webhook?',
        answer: 'We automatically retry failed webhooks with exponential backoff. You can also poll the payment status endpoint to get the latest status if needed.'
      },
      {
        question: 'Can I test webhooks locally?',
        answer: 'Yes, you can use tools like ngrok to expose your local development server and test webhook delivery during development.'
      }
    ],
    errors: [
      {
        question: 'What does error code 403 mean?',
        answer: 'Error 403 (Forbidden) typically indicates that your request signature is invalid. Check your signature generation logic and ensure you\'re using the correct secret key.'
      },
      {
        question: 'How should I handle rate limiting errors?',
        answer: 'When you receive a 429 (Too Many Requests) error, implement exponential backoff and retry the request after the time specified in the Retry-After header.'
      },
      {
        question: 'What should I do if I get a 500 error?',
        answer: 'Error 500 indicates a server error. These are usually temporary - implement retry logic with exponential backoff. If the error persists, contact support.'
      }
    ]
  };

  const resources = [
    {
      title: 'API Documentation',
      description: 'Complete API reference with examples and guides',
      link: 'https://apidocs.smobilpay.com/s3papi/',
      icon: '📚'
    },
    {
      title: 'Client Libraries',
      description: 'Official SDKs for multiple programming languages',
      link: '/client-libraries',
      icon: '🛠️'
    },
    {
      title: 'Sandbox Environment',
      description: 'Test your integration without real transactions',
      link: '/sandbox',
      icon: '🧪'
    },
    {
      title: 'Status Page',
      description: 'Real-time API status and maintenance updates',
      link: 'https://status.smobilpay.com',
      icon: '📊'
    },
    {
      title: 'Migration Guides',
      description: 'Step-by-step guides for API version upgrades',
      link: '/changelog',
      icon: '🔄'
    },
    {
      title: 'Best Practices',
      description: 'Security and performance recommendations',
      link: '#',
      icon: '✅'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Developer Support</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get help with your S3P API integration. Our support team and community 
          are here to help you succeed.
        </p>
      </div>

      {/* Support Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {supportChannels.map(channel => (
          <div key={channel.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              {channel.icon}
              <h3 className="text-lg font-semibold text-gray-900 ml-3">{channel.name}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{channel.description}</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Contact:</span>
                <span className="font-medium text-gray-900">{channel.contact}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Response:</span>
                <span className="font-medium text-gray-900">{channel.responseTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Available:</span>
                <span className="font-medium text-gray-900">{channel.availability}</span>
              </div>
            </div>
            
            <div className="mt-6">
              {channel.id === 'email' && (
                <a
                  href={`mailto:${channel.contact}`}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </a>
              )}
              {channel.id === 'phone' && (
                <a
                  href={`tel:${channel.contact}`}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </a>
              )}
              {channel.id === 'community' && (
                <a
                  href={`https://${channel.contact}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full flex items-center justify-center"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Join Community
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-2xl font-semibold text-gray-900">Frequently Asked Questions</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4">
          {/* Category Sidebar */}
          <div className="lg:border-r border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
              {faqCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-100 text-primary-900 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* FAQ Content */}
          <div className="lg:col-span-3 p-6">
            <div className="space-y-6">
              {faqs[selectedCategory as keyof typeof faqs]?.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Helpful Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              target={resource.link.startsWith('http') ? '_blank' : '_self'}
              rel={resource.link.startsWith('http') ? 'noopener noreferrer' : ''}
              className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 group"
            >
              <div className="flex items-start">
                <div className="text-2xl mr-3">{resource.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-700">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-600">{resource.description}</p>
                </div>
                {resource.link.startsWith('http') && (
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-primary-600" />
                )}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Support</h2>
        <p className="text-gray-700 mb-6">
          Can't find what you're looking for? Send us a message and we'll get back to you as soon as possible.
        </p>
        
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Your full name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="your.email@example.com"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Brief description of your issue"
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Select a category</option>
              <option value="integration">Integration Help</option>
              <option value="authentication">Authentication Issues</option>
              <option value="payments">Payment Problems</option>
              <option value="webhooks">Webhook Issues</option>
              <option value="billing">Billing Questions</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              rows={6}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Please provide as much detail as possible about your issue, including any error messages, code snippets, or steps to reproduce the problem."
            ></textarea>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="urgent"
                type="checkbox"
                className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="urgent" className="text-gray-700">
                This is an urgent issue affecting production systems
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            className="btn-primary px-8 py-3"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* SLA Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <Clock className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Support SLA</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                <span><strong>Critical Issues:</strong> Response within 1 hour</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                <span><strong>High Priority:</strong> Response within 4 hours</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                <span><strong>Normal Priority:</strong> Response within 24 hours</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                <span><strong>Low Priority:</strong> Response within 48 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;