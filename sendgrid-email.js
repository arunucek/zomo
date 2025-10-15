// SendGrid Email Service for Order Notifications
class EmailService {
    constructor() {
        this.apiKey = process.env.SENDGRID_API_KEY;
        this.fromEmail = 'noreply@zomostore.com'; // Change to your verified sender
        this.adminEmail = 'arunkumarpalani428@gmail.com';
    }

    async sendOrderNotification(order) {
        const emailData = {
            personalizations: [{
                to: [{ email: this.adminEmail }],
                subject: `New Order Received - ${order.id}`
            }],
            from: { email: this.fromEmail, name: 'Zomo Store' },
            content: [{
                type: 'text/html',
                value: this.generateOrderEmailHTML(order)
            }]
        };

        try {
            const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(emailData)
            });

            if (response.ok) {
                console.log('Order notification email sent successfully');
                return true;
            } else {
                console.error('Failed to send email:', response.status, response.statusText);
                return false;
            }
        } catch (error) {
            console.error('Error sending email:', error);
            return false;
        }
    }

    generateOrderEmailHTML(order) {
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
                            <a href="${window.location.origin}/admin-orders.html" 
                               style="background: #4a148c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                                View Order in Admin Panel
                            </a>
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
}

// Export for use in the main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EmailService;
} else {
    window.EmailService = EmailService;
}