const http = require('http');
const https = require('https');
const url = require('url');
const querystring = require('querystring');

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const ADMIN_EMAIL = 'arunkumarpalani428@gmail.com'&&'arunkumarpalani74@gmail.com';
const FROM_EMAIL = 'noreply@zomostore.com'; // You'll need to verify this in SendGrid

function sendEmail(orderData) {
    const emailData = {
        personalizations: [{
            to: [{ email: ADMIN_EMAIL }],
            subject: `New Order Received - ${orderData.id}`
        }],
        from: { email: FROM_EMAIL, name: 'Zomo Store' },
        content: [{
            type: 'text/html',
            value: generateOrderEmailHTML(orderData)
        }]
    };

    const postData = JSON.stringify(emailData);
    
    const options = {
        hostname: 'api.sendgrid.com',
        port: 443,
        path: '/v3/mail/send',
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${SENDGRID_API_KEY}`,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    console.log('Email sent successfully');
                    resolve(true);
                } else {
                    console.error('SendGrid error:', res.statusCode, data);
                    reject(new Error(`SendGrid error: ${res.statusCode}`));
                }
            });
        });

        req.on('error', (error) => {
            console.error('Request error:', error);
            reject(error);
        });

        req.write(postData);
        req.end();
    });
}

function generateOrderEmailHTML(order) {
    const orderDate = new Date(order.orderDate).toLocaleString();
    
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #4a148c, #7b1fa2); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4a148c; }
                .customer-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffd700; }
                .highlight { color: #4a148c; font-weight: bold; }
                .total { font-size: 18px; color: #28a745; font-weight: bold; }
                .footer { text-align: center; padding: 20px; color: #666; }
                table { width: 100%; border-collapse: collapse; }
                td { padding: 8px 0; border-bottom: 1px solid #eee; }
                .label { font-weight: bold; width: 40%; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🛒 New Order Received!</h1>
                    <p>Order ID: ${order.id}</p>
                </div>
                
                <div class="content">
                    <h2>📦 Order Details</h2>
                    <div class="order-details">
                        <table>
                            <tr>
                                <td class="label">Order ID:</td>
                                <td class="highlight">${order.id}</td>
                            </tr>
                            <tr>
                                <td class="label">Date:</td>
                                <td>${orderDate}</td>
                            </tr>
                            <tr>
                                <td class="label">Product:</td>
                                <td><strong>${order.productName}</strong></td>
                            </tr>
                            <tr>
                                <td class="label">Price:</td>
                                <td>$${order.productPrice.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td class="label">Quantity:</td>
                                <td>${order.quantity}</td>
                            </tr>
                            <tr>
                                <td class="label">Total:</td>
                                <td class="total">$${order.total.toFixed(2)}</td>
                            </tr>
                        </table>
                    </div>

                    <h2>👤 Customer Information</h2>
                    <div class="customer-details">
                        <table>
                            <tr>
                                <td class="label">Name:</td>
                                <td><strong>${order.customer.name}</strong></td>
                            </tr>
                            <tr>
                                <td class="label">Email:</td>
                                <td>${order.customer.email}</td>
                            </tr>
                            <tr>
                                <td class="label">Phone:</td>
                                <td>${order.customer.phone}</td>
                            </tr>
                            <tr>
                                <td class="label">Address:</td>
                                <td>${order.customer.address}</td>
                            </tr>
                        </table>
                    </div>

                    <div style="text-align: center; margin: 30px 0;">
                        <p><strong>⚠️ Action Required:</strong></p>
                        <p>Please log in to your admin panel to confirm this order.</p>
                    </div>
                </div>
                
                <div class="footer">
                    <p>© 2025 Zomo Store - Premium Electronics & Gadgets</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

// Create HTTP server
const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    
    if (req.method === 'POST' && parsedUrl.pathname === '/send-order-email') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', async () => {
            try {
                const orderData = JSON.parse(body);
                await sendEmail(orderData);
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Email sent successfully' }));
            } catch (error) {
                console.error('Error processing order email:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: error.message }));
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Email server running on port ${PORT}`);
});