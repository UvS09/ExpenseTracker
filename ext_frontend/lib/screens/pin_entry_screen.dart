import 'package:flutter/material.dart';
import '../models/expense.dart';
import '../utils/mock_data.dart';

class PinEntryScreen extends StatefulWidget {
  final double amount;
  final String receiver;

  const PinEntryScreen({super.key, required this.amount, required this.receiver});

  @override
  State<PinEntryScreen> createState() => _PinEntryScreenState();
}

class _PinEntryScreenState extends State<PinEntryScreen> {
  final pinCtrl = TextEditingController();

  void confirmTransaction() {
    if (pinCtrl.text.trim() == '1234') {
      
      mockBalance -= widget.amount;

  
      mockTransactions.add(
        Expense(
          id: DateTime.now().millisecondsSinceEpoch.toString(),
          userId: 'u1',
          amount: widget.amount,
          description: 'Sent to ${widget.receiver}',
          category: 'Transfer',
          date: DateTime.now(),
        ),
      );

      
      Navigator.pop(context, true);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Incorrect PIN")),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Enter PIN")),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            const Text("Enter your 4-digit PIN to confirm", style: TextStyle(fontSize: 16)),
            const SizedBox(height: 16),
            TextField(
              controller: pinCtrl,
              obscureText: true,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: "PIN"),
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: confirmTransaction,
              child: const Text("Confirm"),
            )
          ],
        ),
      ),
    );
  }
}
