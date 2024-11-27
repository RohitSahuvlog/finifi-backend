// models/invoice.js
const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    vendorName: { type: String, required: true },
    invoice: { type: String, required: true },
    status: { type: String, required: true },
    netAmount: { type: Number, required: true },
    invoiceDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    department: { type: String, required: true },
    costCenter: { type: String, required: true },
    vendorGST: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Invoice', InvoiceSchema);
