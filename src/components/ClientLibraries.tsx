import React from 'react';
import { Github, Download, Code, BookOpen } from 'lucide-react';

const libraries = [
  {
    id: 'php',
    name: 'PHP Library',
    description: 'Official PHP client library for the Smobilpay S3P API. Supports PHP 7.4 and above.',
    version: 'v2.1.0',
    language: 'PHP',
    github: 'https://github.com/maviance/smobilpay-php',
    docs: 'https://apidocs.smobilpay.com/s3papi/clients/php',
    download: 'https://github.com/maviance/smobilpay-php/archive/refs/tags/v2.1.0.zip',
    installCommand: 'composer require maviance/smobilpay-s3p'
  },
  {
    id: 'java',
    name: 'Java SDK',
    description: 'Java client SDK for integrating with the S3P API. Compatible with Java 8+.',
    version: 'v1.8.2',
    language: 'Java',
    github: 'https://github.com/maviance/smobilpay-java',
    docs: 'https://apidocs.smobilpay.com/s3papi/clients/java',
    download: 'https://github.com/maviance/smobilpay-java/releases/download/v1.8.2/smobilpay-s3p-1.8.2.jar',
    installCommand: 'implementation "com.maviance:smobilpay-s3p:1.8.2"'
  },
  {
    id: 'python',
    name: 'Python SDK',
    description: 'Python client library for the S3P API. Works with Python 3.6 and newer versions.',
    version: 'v1.5.0',
    language: 'Python',
    github: 'https://github.com/maviance/smobilpay-python',
    docs: 'https://apidocs.smobilpay.com/s3papi/clients/python',
    download: 'https://github.com/maviance/smobilpay-python/archive/refs/tags/v1.5.0.zip',
    installCommand: 'pip install smobilpay-s3p'
  }
];

const ClientLibraries: React.FC = () => {
  return (
    <section id="libraries" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Client Libraries</h2>
          <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Accelerate your integration with our official client libraries,
            available for multiple programming languages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {libraries.map(library => (
            <div 
              key={library.id} 
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-primary-900">{library.name}</h3>
                  <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded">
                    {library.version}
                  </span>
                </div>
                <p className="text-gray-700 mb-6">
                  {library.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Installation</h4>
                  <div className="bg-gray-100 rounded p-3 font-mono text-sm text-gray-800 overflow-x-auto">
                    {library.installCommand}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <a 
                    href={library.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-outline-primary flex items-center justify-center"
                  >
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </a>
                  <a 
                    href={library.download} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-outline-primary flex items-center justify-center"
                  >
                    <Download className="mr-2 h-4 w-4" /> Download
                  </a>
                  <a 
                    href={library.docs} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="col-span-2 btn-primary flex items-center justify-center"
                  >
                    <BookOpen className="mr-2 h-4 w-4" /> Documentation
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block p-6 bg-primary-50 rounded-lg border border-primary-100">
            <h3 className="text-lg font-semibold text-primary-900 mb-4">
              Need a library for another language?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl">
              Our API follows RESTful principles and can be integrated with any language.
              Contact us if you need assistance with a specific programming language.
            </p>
            <a 
              href="#contact" 
              className="btn-secondary inline-flex items-center"
            >
              <Code className="mr-2 h-5 w-5" /> Request Custom Library
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLibraries;
