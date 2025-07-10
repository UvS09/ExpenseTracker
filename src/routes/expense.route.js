const router = require('express').Router();
const { authenticate } = require('../middlewares/auth.middleware');
const {
  createExpense,
  getExpenses,
  updateExpense,
} = require('../controllers/expense.controller');

// POST /api/expense/create - Create new expense
router.post('/create', authenticate, createExpense);

// GET /api/expense/all - Fetch all expenses for logged-in user
router.get('/all', authenticate, getExpenses);

// PUT /api/expense/update - Update an existing expense
router.put('/update', authenticate, updateExpense);

module.exports = router;
