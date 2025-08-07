import React, { useState } from 'react';
import { CreditCard, Clock, CheckCircle, XCircle, AlertCircle, ArrowRight } from 'lucide-react';
import CodeBlock from '../components/ui/CodeBlock';

const PaymentsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('initiate');

  const tabs = [
    { id: 'initiate', label: 'Initiate Payment', icon: CreditCard },
    { id: 'status', label: 'Check Status', icon: Clock },
    { id: 'webhook', label: 'Webhooks', icon: AlertCircle },
  ];

  const initiatePaymentCode = `// Initiate a payment transaction
const payment = await client.payments.initiate({
  serviceId: 'ELEC001',
  amount: 5000, // Amount in minor units (5000 = 50.00 XAF)
  currency: 'XAF',
  customerReference: 'A123456789', // Customer account number
  callbackUrl: 'https://your-app.com/webhook',
  returnUrl: 'https://your-app.com/payment/success',
  metadata: {
    customerName: 'John Doe',
    customerEmail: 'john@example.com'
  }
});

console.log('Payment initiated:', payment);
// Response:
// {
//   "success": true,
//   "data": {
//     "transactionId": "TRX123456789",
//     "status": "pending",
//     "amount": 5000,
//     "currency": "XAF",
//     "paymentUrl": "https://pay.smobilpay.com/checkout/TRX123456789",
//     "expiresAt": "2024-01-15T13:30:45Z"
//   }
// }`;

  const checkStatusCode = `// Check payment status
const status = await client.payments.getStatus('TRX123456789');

console.log('Payment status:', status);
// Response:
// {
//   "success": true,
//   "data": {
//     "transactionId": "TRX123456789",
//     "status": "completed",
//     "amount": 5000,
//     "currency": "XAF",
//     "createdAt": "2024-01-15T12:30:45Z",
//     "completedAt": "2024-01-15T12:35:12Z",
//     "receipt": {
//       "number": "REC-987654321",
//       "url": "https://api.smobilpay.com/receipts/REC-987654321"
//     }
//   }
// }`;

  const webhookCode = `// Handle webhook notifications
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-smobilpay-signature'];
  const payload = JSON.stringify(req.body);
  
  // Verify webhook signature
  const expectedSignature = crypto
    .createHmac('sha256', process.env.WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');
  
  if (signature !== expectedSignature) {
    return res.status(401).send('Invalid signature');
  }
  
  const event = req.body;
  
  switch (event.type) {
    case 'payment.completed':
      console.log('Payment completed:', event.data);
      // Update your database
      // Send confirmation email
      break;
      
    case 'payment.failed':
      console.log('Payment failed:', event.data);
      // Handle failed payment
      break;
      
    case 'payment.cancelled':
      console.log('Payment cancelled:', event.data);
      // Handle cancelled payment
      break;
  }
  
  res.status(200).send('OK');
});`;

  const paymentStates = [
    {
      status: 'pending',
      icon: <Clock className="h-6 w-6 text-yellow-500" />,
      title: 'Pending',
      description: 'Payment has been initiated and is waiting for customer action',
      color: 'bg-yellow-50 border-yellow-200 text-yellow-800'
    },
    {
      status: 'processing',
      icon: <AlertCircle className="h-6 w-6 text-blue-500" />,
      title: 'Processing',
      description: 'Payment is being processed by the payment provider',
      color: 'bg-blue-50 border-blue-200 text-blue-800'
    },
    {
      status: 'completed',
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      title: 'Completed',
      description: 'Payment has been successfully processed and confirmed',
      color: 'bg-green-50 border-green-200 text-green-800'
    },
    {
      status: 'failed',
      icon: <XCircle className="h-6 w-6 text-red-500" />,
      title: 'Failed',
      description: 'Payment failed due to insufficient funds or other issues',
      color: 'bg-red-50 border-red-200 text-red-800'
    },
    {
      status: 'cancelled',
      icon: <XCircle className="h-6 w-6 text-gray-500" />,
      title: 'Cancelled',
      description: 'Payment was cancelled by the customer or expired',
      color: 'bg-gray-50 border-gray-200 text-gray-800'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Payment Processing</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Learn how to initiate payments, check transaction status, and handle 
          payment notifications through webhooks.
        </p>
      </div>

      {/* Payment Flow Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Payment Flow</h2>
        <div className="relative">
          <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-200"></div>
          <div className="space-y-8">
            <div className="relative flex items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold text-primary-700">1</span>
              </div>
              <div className="ml-6">
                <h3 className="text-lg font-semibold text-gray-900">Initiate Payment</h3>
                <p className="text-gray-600">
                  Create a payment transaction with service details, amount, and customer information.
                </p>
              </div>
            </div>
            
            <div className="relative flex items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold text-primary-700">2</span>
              </div>
              <div className="ml-6">
                <h3 className="text-lg font-semibold text-gray-900">Customer Payment</h3>
                <p className="text-gray-600">
                  Redirect customer to payment page or provide payment instructions.
                </p>
              </div>
            </div>
            
            <div className="relative flex items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold text-primary-700">3</span>
              </div>
              <div className="ml-6">
                <h3 className="text-lg font-semibold text-gray-900">Process & Confirm</h3>
                <p className="text-gray-600">
                  Payment is processed and you receive webhook notifications with the result.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment States */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Payment States</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paymentStates.map(state => (
            <div key={state.status} className={`p-4 rounded-lg border-2 ${state.color}`}>
              <div className="flex items-center mb-2">
                {state.icon}
                <h3 className="ml-2 font-semibold">{state.title}</h3>
              </div>
              <p className="text-sm opacity-80">{state.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'initiate' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Initiating Payments</h2>
                <p className="text-gray-700 mb-6">
                  To initiate a payment, you need to provide the service ID, amount, currency, 
                  and customer reference. The API will return a transaction ID and payment URL.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Required Parameters</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li><code className="bg-white px-1 rounded">serviceId</code> - Service identifier</li>
                    <li><code className="bg-white px-1 rounded">amount</code> - Amount in minor units</li>
                    <li><code className="bg-white px-1 rounded">currency</code> - Currency code (XAF, USD, etc.)</li>
                    <li><code className="bg-white px-1 rounded">customerReference</code> - Customer account/ID</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Optional Parameters</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li><code className="bg-white px-1 rounded">callbackUrl</code> - Webhook notification URL</li>
                    <li><code className="bg-white px-1 rounded">returnUrl</code> - Success redirect URL</li>
                    <li><code className="bg-white px-1 rounded">metadata</code> - Additional data</li>
                    <li><code className="bg-white px-1 rounded">description</code> - Payment description</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Implementation Example</h3>
                <CodeBlock code={initiatePaymentCode} language="javascript" />
              </div>
            </div>
          )}

          {activeTab === 'status' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Checking Payment Status</h2>
                <p className="text-gray-700 mb-6">
                  You can check the status of any payment using its transaction ID. 
                  This is useful for polling payment status or handling delayed notifications.
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-sm">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">Best Practice</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      While you can poll for payment status, we recommend using webhooks 
                      for real-time notifications to avoid unnecessary API calls.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Implementation Example</h3>
                <CodeBlock code={checkStatusCode} language="javascript" />
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Polling Strategy</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <p><strong>Immediate:</strong> Check status immediately after payment initiation</p>
                  <p><strong>Short intervals:</strong> Poll every 10-30 seconds for the first 5 minutes</p>
                  <p><strong>Longer intervals:</strong> Poll every 1-2 minutes for up to 30 minutes</p>
                  <p><strong>Final check:</strong> Make a final status check after 30 minutes</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'webhook' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Webhook Notifications</h2>
                <p className="text-gray-700 mb-6">
                  Webhooks provide real-time notifications about payment status changes. 
                  Set up a webhook endpoint to receive instant updates when payments are completed, failed, or cancelled.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-3">Webhook Events</h3>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>• <code>payment.completed</code> - Payment successful</li>
                    <li>• <code>payment.failed</code> - Payment failed</li>
                    <li>• <code>payment.cancelled</code> - Payment cancelled</li>
                    <li>• <code>payment.expired</code> - Payment expired</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-3">Security</h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• Verify webhook signatures</li>
                    <li>• Use HTTPS endpoints only</li>
                    <li>• Implement idempotency</li>
                    <li>• Return 200 status code</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Webhook Handler Example</h3>
                <CodeBlock code={webhookCode} language="javascript" />
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-sm">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">Important</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Always verify webhook signatures to ensure the request is from Smobilpay. 
                      Implement proper error handling and return appropriate HTTP status codes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;