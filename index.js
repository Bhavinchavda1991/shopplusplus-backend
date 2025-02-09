const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const https = require('https');
const fs = require('fs');

// Import Routes
const authRouter = require('./routes/auth/authRoutes.js');
const sellerRouter = require('./routes/seller/sellerRouter');
const adminRouter = require('./routes/admin/adminRouter');
const productRouter = require('./routes/product/productRouter');
const superAdminRouter = require('./routes/superadmin/superAdminRouter');
const orderRoutes = require('./routes/order/orderRoutes');
const paymentRoutes = require('./routes/payment/paymentRoutes');
const payrollRoutes = require('./routes/payroll/payrollRoutes');
const ticketRoutes = require('./routes/ticket/ticketRouter');
const ticketMasterRoutes = require('./routes/ticketmaster/ticketMasterRoutes');
const rootRouter = require('./routes/root/rootRouter');

const connectDB = require('./utils/connectDB');

dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined')); // Logs incoming HTTP requests

// Allow ALL Requests (No Restrictions)
app.use(cors({ origin: '*', credentials: true }));

// Parse incoming requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Remove security headers
app.disable('x-powered-by');

// Remove CSRF protection
const csrfProtection = (req, res, next) => next();

// Routes
app.use('/api/auth', csrfProtection, authRouter);
app.use('/api/seller', csrfProtection, sellerRouter);
app.use('/api/admin', csrfProtection, adminRouter);
app.use('/api/product', csrfProtection, productRouter);
app.use('/api/superadmin', csrfProtection, superAdminRouter);
app.use('/api/order', csrfProtection, orderRoutes);
app.use('/api/payment', csrfProtection, paymentRoutes);
app.use('/api/payroll', csrfProtection, payrollRoutes);
app.use('/api/ticket', csrfProtection, ticketRoutes);
app.use('/api/ticketmaster', csrfProtection, ticketMasterRoutes);
app.use('/api/root', csrfProtection, rootRouter);

// Error Handling
app.use((req, res, next) => {
    res.status(404).send({ error: 'not_found', message: 'Not Found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Start Server
if (process.env.NODE_ENV === 'production') {
    try {
        const options = {
            key: fs.readFileSync(process.env.SSL_KEY_PATH),
            cert: fs.readFileSync(process.env.SSL_CERT_PATH),
        };
        https.createServer(options, app).listen(PORT, () => {
            console.log(`🚀 Secure Server running on HTTPS port ${PORT}`);
        });
    } catch (err) {
        console.error('❌ Failed to start HTTPS server:', err.message);
        process.exit(1);
    }
} else {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on HTTP port ${PORT}`);
    });
}
