import React, { useState } from 'react';
import { Lightbulb, Wallet, ShoppingCart } from 'lucide-react';
import CodeBlock from './ui/CodeBlock';

const UseCases: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bill-payment');

  const tabs = [
    { id: 'bill-payment', label: 'Bill Payment', icon: <Lightbulb className="h-5 w-5" /> },
    { id: 'mobile-wallet', label: 'Mobile Wallet', icon: <Wallet className="h-5 w-5" /> },
    { id: 'online-payment', label: 'Online Payment', icon: <ShoppingCart className="h-5 w-5" /> },
  ];

  const billPaymentCode = `// Step 1: Initialize payment for electricity bill
const initiatePayment = async () => {
  try {
    const response = await fetch('https://api.smobilpay.com/s3papi/payments/initiate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${publicToken}\`,
        'X-Auth-Signature': generateSignature(payload, secretKey)
      },
      body: JSON.stringify({
        merchantId: 'YOUR_MERCHANT_ID',
        timestamp: new Date().toISOString(),
        serviceId: 'ELEC001', // Electricity service ID
        amount: 5000,
        currency: 'XAF',
        customerReference: 'A123456789', // Customer's electricity account number
        callbackUrl: 'https://your-app.com/callbacks/payments'
      })
    });
    
    const data = await response.json();
    
    // Step 2: Store transaction ID for status checks
    const transactionId = data.data.transactionId;
    
    // Step 3: Redirect user to payment page or show payment instructions
    redirectToPaymentPage(transactionId);
    
  } catch (error) {
    console.error('Payment initiation failed:', error);
  }
};`;

  const mobileWalletCode = `// Cash-in to mobile wallet example
const processCashIn = async () => {
  try {
    const response = await fetch('https://api.smobilpay.com/s3papi/wallet/cash-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${publicToken}\`,
        'X-Auth-Signature': generateSignature(payload, secretKey)
      },
      body: JSON.stringify({
        merchantId: 'YOUR_MERCHANT_ID',
        timestamp: new Date().toISOString(),
        walletProvider: 'MTN_MOMO', // Mobile money provider
        phoneNumber: '237600000000', // Customer's phone number
        amount: 10000,
        currency: 'XAF',
        reference: generateUniqueReference(),
        callbackUrl: 'https://your-app.com/callbacks/wallet'
      })
    });
    
    const data = await response.json();
    
    // Handle the cash-in response
    if (data.success) {
      // Display transaction details to user
      displayTransactionDetails(data.data);
      
      // Check transaction status after a delay
      setTimeout(() => checkTransactionStatus(data.data.transactionId), 5000);
    }
    
  } catch (error) {
    console.error('Cash-in processing failed:', error);
  }
};`;

  const onlinePaymentCode = `// E-commerce payment integration example
const processEcommercePayment = async (cart, customer) => {
  try {
    // Step 1: Create itemized list of products
    const items = cart.items.map(item => ({
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.price,
      totalPrice: item.quantity * item.price
    }));
    
    // Step 2: Calculate total amount
    const totalAmount = cart.items.reduce(
      (sum, item) => sum + (item.quantity * item.price), 0
    );
    
    // Step 3: Initiate payment transaction
    const response = await fetch('https://api.smobilpay.com/s3papi/ecommerce/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${publicToken}\`,
        'X-Auth-Signature': generateSignature(payload, secretKey)
      },
      body: JSON.stringify({
        merchantId: 'YOUR_MERCHANT_ID',
        timestamp: new Date().toISOString(),
        orderId: cart.id,
        items: items,
        amount: totalAmount,
        currency: 'XAF',
        customer: {
          name: customer.name,
          email: customer.email,
          phone: customer.phone
        },
        callbackUrl: 'https://your-store.com/order/callback',
        returnUrl: 'https://your-store.com/order/confirmation'
      })
    });
    
    const data = await response.json();
    
    // Step 4: Redirect customer to payment page
    if (data.success) {
      window.location.href = data.data.paymentUrl;
    }
    
  } catch (error) {
    console.error('E-commerce payment processing failed:', error);
  }
};`;

  return (
    <section id="use-cases" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Use Cases</h2>
          <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Explore real-world implementation examples showing how to integrate
            various S3P API services into your applications.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="flex flex-wrap border-b border-gray-200">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`flex items-center px-5 py-4 font-medium text-sm focus:outline-none transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'text-primary-800 border-b-2 border-primary-700 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className={`mr-2 ${activeTab === tab.id ? 'text-primary-700' : 'text-gray-500'}`}>
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 'bill-payment' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-primary-900">Electricity Bill Payment</h3>
                  <p className="text-gray-700">
                    This example demonstrates how to implement a complete electricity bill
                    payment flow using the S3P API, from initiating the payment to checking
                    the transaction status and handling the receipt.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="space-y-4">
                      <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-lg font-bold text-primary-700">1</span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">Initiate Payment</h4>
                      <p className="text-sm text-gray-700">
                        Collect customer's account number and payment amount, then initialize
                        a payment transaction through the S3P API.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-lg font-bold text-primary-700">2</span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">Process Payment</h4>
                      <p className="text-sm text-gray-700">
                        Direct the customer to complete the payment using their preferred
                        payment method (mobile money, bank transfer, etc.).
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-lg font-bold text-primary-700">3</span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">Confirm & Receipt</h4>
                      <p className="text-sm text-gray-700">
                        Verify the payment status and provide the customer with a digital
                        receipt for their electricity bill payment.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Implementation Example</h4>
                    <CodeBlock code={billPaymentCode} language="javascript" />
                  </div>
                  
                  <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-sm">
                    <h5 className="text-base font-semibold text-green-800 mb-2">Pro Tip</h5>
                    <p className="text-sm text-green-700">
                      Always implement a robust error handling mechanism and provide clear feedback
                      to users at each step of the payment process. For electricity bills, it's also
                      recommended to validate the account number format before initiating the payment.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'mobile-wallet' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-primary-900">Mobile Wallet Integration</h3>
                  <p className="text-gray-700">
                    Learn how to integrate with mobile money wallets through the S3P API,
                    enabling your application to perform cash-in and cash-out operations
                    with popular mobile money providers.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div className="bg-primary-50 p-6 rounded-lg border border-primary-100">
                      <h4 className="text-xl font-semibold text-primary-900 mb-4">Cash-In Operation</h4>
                      <p className="text-gray-700 mb-4">
                        Cash-in allows customers to deposit money into their mobile wallet
                        through your application. This is particularly useful for:
                      </p>
                      <ul className="space-y-2 ml-6">
                        <li className="list-disc text-gray-700">
                          Funding e-wallet accounts
                        </li>
                        <li className="list-disc text-gray-700">
                          Account top-ups
                        </li>
                        <li className="list-disc text-gray-700">
                          Receiving payments from customers
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-primary-50 p-6 rounded-lg border border-primary-100">
                      <h4 className="text-xl font-semibold text-primary-900 mb-4">Cash-Out Operation</h4>
                      <p className="text-gray-700 mb-4">
                        Cash-out allows customers to withdraw money from their mobile wallet
                        to your service. This is commonly used for:
                      </p>
                      <ul className="space-y-2 ml-6">
                        <li className="list-disc text-gray-700">
                          Disbursing funds to beneficiaries
                        </li>
                        <li className="list-disc text-gray-700">
                          Paying out winnings or refunds
                        </li>
                        <li className="list-disc text-gray-700">
                          Salary payments to workers
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Implementation Example</h4>
                    <CodeBlock code={mobileWalletCode} language="javascript" />
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-sm">
                    <h5 className="text-base font-semibold text-blue-800 mb-2">Important Note</h5>
                    <p className="text-sm text-blue-700">
                      When working with mobile wallets, always verify the phone number format
                      and ensure it's registered with the selected mobile money provider.
                      Different providers may have different requirements for phone number formats.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'online-payment' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-primary-900">E-commerce Payment Processing</h3>
                  <p className="text-gray-700">
                    Integrate the S3P API into your e-commerce platform to provide a seamless
                    checkout experience for your customers with multiple payment options.
                  </p>
                  
                  <div className="mt-8 space-y-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <h4 className="text-lg font-semibold text-primary-900 mb-4">
                        E-commerce Checkout Flow
                      </h4>
                      <div className="relative">
                        <div className="absolute left-5 top-0 h-full w-0.5 bg-gray-200"></div>
                        <div className="space-y-8">
                          <div className="relative pl-10">
                            <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-primary-700 flex items-center justify-center">
                              <span className="text-sm font-medium text-white">1</span>
                            </div>
                            <h5 className="text-base font-semibold text-gray-900 mb-1">
                              Cart Checkout
                            </h5>
                            <p className="text-sm text-gray-700">
                              User completes shopping and proceeds to checkout with their cart items.
                            </p>
                          </div>
                          
                          <div className="relative pl-10">
                            <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-primary-700 flex items-center justify-center">
                              <span className="text-sm font-medium text-white">2</span>
                            </div>
                            <h5 className="text-base font-semibold text-gray-900 mb-1">
                              Payment Initiation
                            </h5>
                            <p className="text-sm text-gray-700">
                              Your application initiates a payment transaction through the S3P API,
                              sending product details, amounts, and customer information.
                            </p>
                          </div>
                          
                          <div className="relative pl-10">
                            <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-primary-700 flex items-center justify-center">
                              <span className="text-sm font-medium text-white">3</span>
                            </div>
                            <h5 className="text-base font-semibold text-gray-900 mb-1">
                              Payment Method Selection
                            </h5>
                            <p className="text-sm text-gray-700">
                              Customer is redirected to a payment page where they can choose
                              from multiple payment methods (mobile money, cards, bank transfers).
                            </p>
                          </div>
                          
                          <div className="relative pl-10">
                            <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-primary-700 flex items-center justify-center">
                              <span className="text-sm font-medium text-white">4</span>
                            </div>
                            <h5 className="text-base font-semibold text-gray-900 mb-1">
                              Order Confirmation
                            </h5>
                            <p className="text-sm text-gray-700">
                              After successful payment, customer is redirected back to your
                              application with order confirmation and receipt details.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Implementation Example</h4>
                      <CodeBlock code={onlinePaymentCode} language="javascript" />
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-sm">
                    <h5 className="text-base font-semibold text-yellow-800 mb-2">Best Practice</h5>
                    <p className="text-sm text-yellow-700">
                      For e-commerce integrations, always implement a robust notification system
                      to handle asynchronous payment confirmations. Use both the callback URL
                      (server-to-server) and the return URL (user redirection) to ensure reliable
                      order processing even if users close their browsers during payment.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;