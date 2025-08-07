import React from 'react';
import { Webhook, Shield, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import CodeBlock from '../components/ui/CodeBlock';

const WebhooksPage: React.FC = () => {
  const webhookSetupCode = `// Express.js webhook handler
const express = require('express');
const crypto = require('crypto');
const app = express();

// Middleware to capture raw body for signature verification
app.use('/webhook', express.raw({ type: 'application/json' }));

app.post('/webhook', (req, res) => {
  const signature = req.headers['x-smobilpay-signature'];
  const timestamp = req.headers['x-smobilpay-timestamp'];
  const payload = req.body;
  
  // Verify webhook signature
  if (!verifyWebhookSignature(payload, signature, timestamp)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  const event = JSON.parse(payload);
  
  // Handle the event
  handleWebhookEvent(event);
  
  // Return 200 to acknowledge receipt
  res.status(200).json({ received: true });
});

function verifyWebhookSignature(payload, signature, timestamp) {
  const webhookSecret = process.env.SMOBILPAY_WEBHOOK_SECRET;
  const signedPayload = timestamp + '.' + payload;
  
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(signedPayload, 'utf8')
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}`;

  const eventHandlerCode = `function handleWebhookEvent(event) {
  console.log('Received webhook event:', event.type);
  
  switch (event.type) {
    case 'payment.completed':
      handlePaymentCompleted(event.data);
      break;
      
    case 'payment.failed':
      handlePaymentFailed(event.data);
      break;
      
    case 'payment.cancelled':
      handlePaymentCancelled(event.data);
      break;
      
    case 'payment.expired':
      handlePaymentExpired(event.data);
      break;
      
    default:
      console.log('Unhandled event type:', event.type);
  }
}

async function handlePaymentCompleted(paymentData) {
  const { transactionId, amount, customerReference } = paymentData;
  
  try {
    // Update payment status in database
    await updatePaymentStatus(transactionId, 'completed');
    
    // Send confirmation email to customer
    await sendConfirmationEmail(customerReference, {
      transactionId,
      amount,
      status: 'completed'
    });
    
    // Update customer account/service
    await activateService(customerReference, paymentData.serviceId);
    
    console.log(\`Payment \${transactionId} completed successfully\`);
  } catch (error) {
    console.error('Error handling payment completion:', error);
    // Implement retry logic or alert system
  }
}

async function handlePaymentFailed(paymentData) {
  const { transactionId, failureReason } = paymentData;
  
  try {
    // Update payment status
    await updatePaymentStatus(transactionId, 'failed', failureReason);
    
    // Notify customer of failure
    await sendFailureNotification(paymentData.customerReference, {
      transactionId,
      reason: failureReason
    });
    
    console.log(\`Payment \${transactionId} failed: \${failureReason}\`);
  } catch (error) {
    console.error('Error handling payment failure:', error);
  }
}`;

  const retryLogicCode = `// Implement exponential backoff for webhook retries
class WebhookRetryHandler {
  constructor() {
    this.maxRetries = 5;
    this.baseDelay = 1000; // 1 second
  }
  
  async processWebhook(event, attempt = 1) {
    try {
      await this.handleEvent(event);
      console.log(\`Webhook processed successfully on attempt \${attempt}\`);
    } catch (error) {
      console.error(\`Webhook processing failed on attempt \${attempt}:\`, error);
      
      if (attempt < this.maxRetries) {
        const delay = this.baseDelay * Math.pow(2, attempt - 1);
        console.log(\`Retrying in \${delay}ms...\`);
        
        setTimeout(() => {
          this.processWebhook(event, attempt + 1);
        }, delay);
      } else {
        console.error('Max retries exceeded, webhook processing failed');
        // Send alert to monitoring system
        await this.alertFailure(event, error);
      }
    }
  }
  
  async handleEvent(event) {
    // Your event handling logic here
    // Throw error if processing fails
  }
  
  async alertFailure(event, error) {
    // Send alert to monitoring system
    // Log to error tracking service
    // Notify development team
  }
}`;

  const testingCode = `// Testing webhook endpoints locally with ngrok
// 1. Install ngrok: npm install -g ngrok
// 2. Start your local server: node server.js
// 3. Expose local server: ngrok http 3000
// 4. Use the ngrok URL as your webhook endpoint

// Test webhook handler
const testWebhookPayload = {
  id: 'evt_test_123',
  type: 'payment.completed',
  created: Math.floor(Date.now() / 1000),
  data: {
    transactionId: 'TRX123456789',
    status: 'completed',
    amount: 5000,
    currency: 'XAF',
    serviceId: 'ELEC001',
    customerReference: 'A123456789',
    completedAt: new Date().toISOString(),
    receipt: {
      number: 'REC-987654321',
      url: 'https://api.smobilpay.com/receipts/REC-987654321'
    }
  }
};

// Send test webhook
async function sendTestWebhook() {
  const response = await fetch('http://localhost:3000/webhook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Smobilpay-Signature': generateTestSignature(testWebhookPayload),
      'X-Smobilpay-Timestamp': Math.floor(Date.now() / 1000).toString()
    },
    body: JSON.stringify(testWebhookPayload)
  });
  
  console.log('Test webhook response:', response.status);
}`;

  const events = [
    {
      type: 'payment.completed',
      description: 'Payment has been successfully processed and confirmed',
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      color: 'bg-green-50 border-green-200'
    },
    {
      type: 'payment.failed',
      description: 'Payment failed due to insufficient funds or other issues',
      icon: <AlertTriangle className="h-6 w-6 text-red-500" />,
      color: 'bg-red-50 border-red-200'
    },
    {
      type: 'payment.cancelled',
      description: 'Payment was cancelled by the customer',
      icon: <AlertTriangle className="h-6 w-6 text-yellow-500" />,
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      type: 'payment.expired',
      description: 'Payment expired without completion',
      icon: <Clock className="h-6 w-6 text-gray-500" />,
      color: 'bg-gray-50 border-gray-200'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Webhooks</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Receive real-time notifications about payment status changes through 
          secure webhook endpoints.
        </p>
      </div>

      {/* Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <Webhook className="h-8 w-8 text-primary-600 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-900">What are Webhooks?</h2>
        </div>
        <p className="text-gray-700 mb-6">
          Webhooks are HTTP callbacks that Smobilpay sends to your application when specific 
          events occur. Instead of repeatedly polling our API for payment status updates, 
          webhooks provide real-time notifications, making your integration more efficient and responsive.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Real-time</h3>
            <p className="text-sm text-gray-600">
              Instant notifications when events occur
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Secure</h3>
            <p className="text-sm text-gray-600">
              Cryptographically signed for authenticity
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Reliable</h3>
            <p className="text-sm text-gray-600">
              Automatic retries with exponential backoff
            </p>
          </div>
        </div>
      </div>

      {/* Webhook Events */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Webhook Events</h2>
        <div className="space-y-4">
          {events.map(event => (
            <div key={event.type} className={`p-4 rounded-lg border-2 ${event.color}`}>
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  {event.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    <code className="text-sm bg-white bg-opacity-50 px-2 py-1 rounded">
                      {event.type}
                    </code>
                  </h3>
                  <p className="text-sm text-gray-700">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Setup Guide */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Setting Up Webhooks</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Create Webhook Endpoint</h3>
            <p className="text-gray-700 mb-4">
              Create an HTTP endpoint in your application to receive webhook notifications:
            </p>
            <CodeBlock code={webhookSetupCode} language="javascript" />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Handle Events</h3>
            <p className="text-gray-700 mb-4">
              Process different types of webhook events based on your business logic:
            </p>
            <CodeBlock code={eventHandlerCode} language="javascript" />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Implement Retry Logic</h3>
            <p className="text-gray-700 mb-4">
              Handle failures gracefully with exponential backoff retry logic:
            </p>
            <CodeBlock code={retryLogicCode} language="javascript" />
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Best Practices</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Security</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Always verify webhook signatures
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Use HTTPS endpoints only
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Validate timestamp to prevent replay attacks
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Store webhook secrets securely
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Reliability</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Return 200 status code for successful processing
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Implement idempotency for duplicate events
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Process webhooks asynchronously
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Log all webhook events for debugging
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Testing */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Testing Webhooks</h2>
        <p className="text-gray-700 mb-4">
          Test your webhook implementation locally using ngrok to expose your local server:
        </p>
        <CodeBlock code={testingCode} language="javascript" />
        
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-sm">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-800">Testing Tips</h4>
              <ul className="text-sm text-blue-700 mt-1 space-y-1">
                <li>• Use ngrok or similar tools to expose local endpoints</li>
                <li>• Test with different event types and scenarios</li>
                <li>• Verify signature validation works correctly</li>
                <li>• Test error handling and retry logic</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebhooksPage;