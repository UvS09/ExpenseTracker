const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Food', 'Travel', 'Bills', 'Other', 'Transfer'],
    default: 'Other',
  },
  date: {
    type: Date,
    required: true,
  },
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
