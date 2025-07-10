import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/expense.dart';
import '../services/api_service.dart';
import '../services/auth_service.dart';
import 'root_nav.dart';

class AddExpenseScreen extends StatefulWidget {
  const AddExpenseScreen({super.key});

  @override
  State<AddExpenseScreen> createState() => _AddExpenseScreenState();
}

class _AddExpenseScreenState extends State<AddExpenseScreen> {
  final _formKey = GlobalKey<FormState>();
  final _descController = TextEditingController();
  final _amountController = TextEditingController();

  String selectedCategory = 'Food';
  DateTime selectedDate = DateTime.now();
  List<String> categories = ['Food', 'Travel', 'Bills', 'Other', 'Transfer'];

  Future<void> _submitExpense() async {
    if (_formKey.currentState!.validate()) {
      final expense = Expense(
        userId: AuthService.email ?? '',
        amount: double.parse(_amountController.text.trim()),
        description: _descController.text.trim(),
        category: selectedCategory,
        date: selectedDate,
      );

      bool success = await ApiService.addExpense(expense);

      if (!mounted) return;

      if (success) {
        // Navigate back to home by replacing current route with root nav
        Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(builder: (_) => const RootNavigation()),
          (route) => false,
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Failed to add expense')),
        );
      }
    }
  }

  Future<void> _pickDate() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: selectedDate,
      firstDate: DateTime(2020),
      lastDate: DateTime.now(),
    );
    if (picked != null) {
      setState(() => selectedDate = picked);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Add Expense")),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: _descController,
                textCapitalization: TextCapitalization.sentences,
                decoration: const InputDecoration(labelText: 'Description'),
                validator: (val) =>
                    val == null || val.isEmpty ? 'Enter description' : null,
              ),
              Builder(
                builder: (context) {
                  return Localizations.override(
                    context: context,
                    locale: const Locale('en', 'US'), // Ensure English numerals
                    child: TextFormField(
                      controller: _amountController,
                      keyboardType: TextInputType.number,
                      decoration: const InputDecoration(labelText: 'Amount'),
                      validator: (val) =>
                          val == null || val.isEmpty ? 'Enter amount' : null,
                    ),
                  );
                },
              ),
              const SizedBox(height: 12),
              DropdownButtonFormField<String>(
                value: selectedCategory,
                items: categories
                    .map((cat) => DropdownMenuItem(value: cat, child: Text(cat)))
                    .toList(),
                onChanged: (val) => setState(() => selectedCategory = val!),
                decoration: const InputDecoration(labelText: 'Category'),
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Text("Date: ${DateFormat('yyyy-MM-dd').format(selectedDate)}"),
                  const Spacer(),
                  TextButton(
                    onPressed: _pickDate,
                    child: const Text("Pick Date"),
                  ),
                ],
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: _submitExpense,
                style: ElevatedButton.styleFrom(backgroundColor: Colors.teal),
                child: const Text("Add Expense"),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
