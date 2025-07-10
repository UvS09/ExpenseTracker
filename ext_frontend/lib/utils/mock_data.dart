import '../models/expense.dart';

double mockBalance = 10000.0;

List<Expense> mockTransactions = [
  Expense(
    id: 't1',
    userId: 'u1',
    amount: 250.0,
    description: 'Groceries',
    category: 'Food',
    date: DateTime(2024, 12, 21),
  ),
  Expense(
    id: 't2',
    userId: 'u1',
    amount: 1200.0,
    description: 'Cab to Airport',
    category: 'Travel',
    date: DateTime(2025, 1, 10),
  ),
];
