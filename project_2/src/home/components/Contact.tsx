import React from 'react';
import { Mail, Phone, MessageCircle, Check, ExternalLink } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get Started</h2>
          <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Ready to integrate with the Smobilpay S3P API? Get in touch with our
            support team for credentials and assistance.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-2xl font-semibold text-primary-900 mb-6">Request API Credentials</h3>
              <p className="text-gray-700 mb-8">
                To start using the Smobilpay S3P API, you'll need to obtain your
                unique merchant ID, public token, and secret key. Complete the form
                to request your credentials.
              </p>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="john.doe@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Your Company Ltd."
                  />
                </div>
                
                <div>
                  <label htmlFor="usage" className="block text-sm font-medium text-gray-700 mb-1">
                    Intended API Usage
                  </label>
                  <select
                    id="usage"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select your primary use case</option>
                    <option value="bill-payments">Bill Payments</option>
                    <option value="mobile-money">Mobile Money Operations</option>
                    <option value="ecommerce">E-commerce Integration</option>
                    <option value="school-fees">School Fee Collections</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Please describe your integration needs in more detail..."
                  ></textarea>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="text-gray-700">
                      I agree to the <a href="#" className="text-primary-700 hover:underline">terms and conditions</a> and <a href="#" className="text-primary-700 hover:underline">privacy policy</a>
                    </label>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-primary py-3 px-4 flex justify-center"
                >
                  Submit Request
                </button>
              </form>
            </div>
            
            <div className="space-y-8">
              <div className="bg-primary-50 p-8 rounded-lg border border-primary-100">
                <h3 className="text-2xl font-semibold text-primary-900 mb-6">Support Channels</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <Mail className="h-5 w-5 text-primary-700" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900">Email Support</h4>
                      <p className="text-gray-700 mt-1">
                        <a href="mailto:api-support@smobilpay.com" className="hover:underline">
                          api-support@smobilpay.com
                        </a>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        24/7 support for urgent integration issues
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <Phone className="h-5 w-5 text-primary-700" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900">Phone Support</h4>
                      <p className="text-gray-700 mt-1">
                        <a href="tel:+237200000000" className="hover:underline">
                          +237 200 000 000
                        </a>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Available Monday-Friday, 8:00 AM - 5:00 PM (CAT)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <MessageCircle className="h-5 w-5 text-primary-700" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900">Developer Community</h4>
                      <p className="text-gray-700 mt-1">
                        <a 
                          href="https://community.smobilpay.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center hover:underline"
                        >
                          Join our developer forum <ExternalLink className="ml-1 h-4 w-4" />
                        </a>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Connect with other developers and get community support
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-accent-50 p-8 rounded-lg border border-accent-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Integration Resources</h3>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-accent-600" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-lg font-medium text-gray-900">Developer Documentation</h4>
                      <p className="text-sm text-gray-700 mt-1">
                        Comprehensive guides, API reference, and examples
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-accent-600" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-lg font-medium text-gray-900">Integration SDKs</h4>
                      <p className="text-sm text-gray-700 mt-1">
                        Client libraries for PHP, Java, and Python
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-accent-600" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-lg font-medium text-gray-900">Sandbox Environment</h4>
                      <p className="text-sm text-gray-700 mt-1">
                        Test your integration without real transactions
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-accent-600" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-lg font-medium text-gray-900">Implementation Consultancy</h4>
                      <p className="text-sm text-gray-700 mt-1">
                        Get expert assistance with your specific integration needs
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;