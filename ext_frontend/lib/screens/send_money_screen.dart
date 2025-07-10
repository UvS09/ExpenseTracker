import 'package:flutter/material.dart';
import '../utils/mock_data.dart';
import 'pin_entry_screen.dart';
import 'root_nav.dart';
import '../services/api_service.dart';
import '../services/auth_service.dart';
import '../models/expense.dart';

class SendMoneyScreen extends StatefulWidget {
  const SendMoneyScreen({super.key});

  @override
  State<SendMoneyScreen> createState() => _SendMoneyScreenState();
}

class _SendMoneyScreenState extends State<SendMoneyScreen> {
  String selectedUser = 'Dad';
  final amountCtrl = TextEditingController();

  void proceedToPIN() async {
    if (amountCtrl.text.isEmpty) return;
    final amount = double.tryParse(amountCtrl.text);
    if (amount == null || amount <= 0) return;

    if (amount > mockBalance) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Not enough balance')),
      );
      return;
    }

    final bool? isConfirmed = await Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => PinEntryScreen(amount: amount, receiver: selectedUser),
      ),
    );

    if (isConfirmed == true) {
      // Record as expense with Transfer category
      final expense = Expense(
        userId: AuthService.email ?? '',
        amount: amount,
        description: "Transfer to $selectedUser",
        category: 'Transfer',
        date: DateTime.now(),
      );

      bool success = await ApiService.addExpense(expense);

      if (success && mounted) {
        Navigator.pushAndRemoveUntil(
          context,
          MaterialPageRoute(builder: (_) => const RootNavigation()),
          (route) => false,
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("Transfer failed")),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Send Money")),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            DropdownButtonFormField<String>(
              value: selectedUser,
              items: ['Dad', 'Mom', 'Bro'].map((name) {
                return DropdownMenuItem(value: name, child: Text(name));
              }).toList(),
              onChanged: (val) => setState(() => selectedUser = val!),
              decoration: const InputDecoration(labelText: 'Send To'),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: amountCtrl,
              decoration: const InputDecoration(labelText: 'Amount'),
              keyboardType: TextInputType.number,
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: proceedToPIN,
              style: ElevatedButton.styleFrom(backgroundColor: Colors.teal),
              child: const Text('Send Money'),
            ),
          ],
        ),
      ),
    );
  }
}
