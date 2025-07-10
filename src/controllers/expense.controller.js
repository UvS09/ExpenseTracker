const Expense = require('../models/Expense');

// POST /api/expense/create
const createExpense = async (req, res) => {
  try {
    const { amount, description, category, date } = req.body;
    const userId = req.user.id; // Use `.id` (from JWT) not `._id`

    const newExpense = new Expense({
      userId,
      amount,
      description,
      category,
      date,
    });

    await newExpense.save();

    res.status(201).json({ success: true, expense: newExpense });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error creating expense',
      error: err.message,
    });
  }
};

// GET /api/expense/all
const getExpenses = async (req, res) => {
  try {
    const userId = req.user.id;

    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    res.status(200).json({ success: true, expenses });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching expenses',
      error: err.message,
    });
  }
};

// PUT /api/expense/update
const updateExpense = async (req, res) => {
  try {
    const { expenseId, amount, description, category, date } = req.body;
    const userId = req.user.id;

    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: expenseId, userId },
      { amount, description, category, date },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found or unauthorized',
      });
    }

    res.status(200).json({ success: true, expense: updatedExpense });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating expense',
      error: err.message,
    });
  }
};

module.exports = {
  createExpense,
  getExpenses,
  updateExpense,
};
