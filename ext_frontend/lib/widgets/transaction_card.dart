import 'package:flutter/material.dart';
import '../models/expense.dart';

class TransactionCard extends StatelessWidget {
  final Expense txn;
  const TransactionCard({super.key, required this.txn});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: ListTile(
        title: Text('${txn.description} - ₹${txn.amount.toStringAsFixed(2)}'),
        subtitle: Text('${txn.category} • ${txn.date.toLocal().toString().split(' ')[0]}'),
      ),
    );
  }
}
