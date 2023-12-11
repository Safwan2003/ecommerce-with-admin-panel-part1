const express = require('express');
const router = express.Router();
const Sales = require('../models/sales');

// GET all sales
router.get('/', async (req, res) => {
  try {
    const sales = await Sales.find();
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific sale
router.get('/:id', async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.json(sale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a new sale (add authentication middleware here if required)
router.post('/', async (req, res) => {
  const sale = new Sales({
    productname: req.body.productname,
    quantity: req.body.quantity,
    // Add more fields as needed
  });

  try {
    const newSale = await sale.save();
    res.status(201).json(newSale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a sale (add authentication middleware here if required)
router.put('/:id', async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    sale.productname = req.body.productname;
    sale.quantity = req.body.quantity;
    // Update other fields as needed

    const updatedSale = await sale.save();
    res.json(updatedSale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a sale (add authentication middleware here if required)
router.delete('/:id', async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    await sale.remove();
    res.json({ message: 'Sale deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
