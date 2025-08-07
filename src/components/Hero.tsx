import React from 'react';
import { Code, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-primary-900 to-primary-700 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block text-black px-3 py-1 bg-accent-500 bg-opacity-20 rounded-full text-accent-300 font-medium text-sm mb-2">
              Developer Documentation
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Smobilpay S3P API
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              A comprehensive payment solution for bill payments, mobile money, and online transactions across Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="#api" 
                className="btn-primary flex items-center justify-center"
              >
                Explore API <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a 
                href="#services" 
                className="btn-secondary flex items-center justify-center"
              >
                View Services
              </a>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="bg-gray-900 rounded-lg shadow-xl p-6 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 text-xs text-gray-400">S3P API Request</div>
              </div>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>
{`GET /s3papi/services HTTP/1.1
Host: api.smobilpay.com
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
X-Auth-Signature: YOUR_GENERATED_SIGNATURE

{
  "merchantId": "YOUR_MERCHANT_ID",
  "timestamp": "${new Date().toISOString()}"
}`}
                </code>
              </pre>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-accent-500 rounded-lg shadow-lg p-4 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              <Code className="w-12 h-12 text-primary-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-gray-50"></div>
    </section>
  );
};

export default Hero;
