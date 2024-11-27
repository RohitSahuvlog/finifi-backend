const express = require('express');
const Invoice = require('../models/invoice');
const router = express.Router();

// Get all Invoices
router.get('/', async (req, res) => {
    const { status } = req.query;

    try {
        const query = status && status !== 'All' ? { status } : {};
        const invoices = await Invoice.find(query);
        return res.status(200).json(invoices);
    } catch (error) {
        console.error('Error fetching invoices:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
});

// Create Invoice
router.post('/', async (req, res) => {
    const { vendorName, invoice, netAmount, invoiceDate, dueDate, department, costCenter, status, vendorGST } = req.body;

    if (!vendorName || !invoice || !netAmount || !invoiceDate || !dueDate || !department || !costCenter || !status) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const invoiceRecord = new Invoice({ vendorName, invoice, netAmount, invoiceDate, dueDate, department, costCenter, status, vendorGST });
        await invoiceRecord.save();
        return res.status(201).json({ message: 'Invoice added successfully', invoice: invoiceRecord });
    } catch (error) {
        console.error('Error creating invoice:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
});

// Update Invoice
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { vendorName, invoice, netAmount, invoiceDate, dueDate, department, costCenter, status, vendorGST } = req.body;

    if (!vendorName || !invoice || !netAmount || !invoiceDate || !dueDate || !department || !costCenter || !status) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const invoiceRecord = await Invoice.findByIdAndUpdate(
            id,
            { vendorName, invoice, netAmount, invoiceDate, dueDate, department, costCenter, status, vendorGST },
            { new: true }
        );
        if (!invoiceRecord) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        return res.status(200).json({ message: 'Invoice updated successfully', invoice: invoiceRecord });
    } catch (error) {
        console.error('Error updating invoice:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
});

// Delete Invoice
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const invoiceRecord = await Invoice.findByIdAndDelete(id);
        if (!invoiceRecord) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        return res.status(200).json({ message: 'Invoice deleted successfully' });
    } catch (error) {
        console.error('Error deleting invoice:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;