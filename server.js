const express = require('express');
const sgMail = require('@sendgrid/mail');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Admin email
const ADMIN_EMAIL = 'arunkumarpalani428@gmail.com';

// Initialize SendGrid with error handling
let sendGridConfigured = false;
if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY.startsWith('SG.')) {
    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        sendGridConfigured = true;
        console.log('SendGrid configured successfully');
    } catch (error) {
        console.error('SendGrid configuration failed:', error.message);
    }
} else {
    console.log('SendGrid API key not properly configured');
}

// Route to send order notification emails
app.post('/send-order-email', async (req, res) => {
    try {
        const order = req.body;
        console.log('Received order for email notification:', order.id);
        
        if (!sendGridConfigured) {
            console.log('SendGrid not configured - order saved but no email sent');
            return res.json({ 
                success: false, 
                message: 'Order saved successfully, but email notification requires SendGrid setup' 
            });
        }
        
        const msg = {
            to: ADMIN_EMAIL,
            from: ADMIN_EMAIL, // Must be verified in SendGrid
            subject: `🛒 New Order Received - ${order.id}`,
            html: generateOrderEmailHTML(order)
        };

        await sgMail.send(msg);
        console.log('Order notification email sent successfully to:', ADMIN_EMAIL);
        
        res.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('SendGrid Error:', error);
        
        res.json({ 
            success: false, 
            message: 'Order saved successfully, but email sending failed: ' + error.message
        });
    }
});

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
                .btn { background: #4a148c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
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
                        <a href="${process.env.REPLIT_DOMAINS ? 'https://' + process.env.REPLIT_DOMAINS.split(',')[0] + '/admin-orders.html' : 'http://localhost:5000/admin-orders.html'}" class="btn">
                            View Order in Admin Panel
                        </a>
                    </div>
                </div>
                
                <div class="footer">
                    <p>© 2025 Zomo Store - Premium Electronics & Gadgets</p>
                    <p>This is an automated notification from your e-commerce store.</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('*.html', (req, res) => {
    const filePath = req.path.substring(1);
    res.sendFile(path.join(__dirname, filePath));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Zomo Store server running on port ${PORT}`);
    console.log('SendGrid API Key:', process.env.SENDGRID_API_KEY ? 'Configured ✓' : 'Missing ✗');
});