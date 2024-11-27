const express = require('express');
const mongooseConnect = require('./config/db');
const invoiceRouter = require('./routes/invoice');
require('dotenv').config();
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // add cors middleware

// Connect to MongoDB
mongooseConnect();

// Routes
app.use('/api/invoices', invoiceRouter);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});