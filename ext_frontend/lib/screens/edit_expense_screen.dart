import 'package:flutter/material.dart';
import '../models/expense.dart';
import '../utils/mock_data.dart';

class EditExpenseScreen extends StatefulWidget {
  final Expense expense;
  final int index;

  const EditExpenseScreen({super.key, required this.expense, required this.index});

  @override
  State<EditExpenseScreen> createState() => _EditExpenseScreenState();
}

class _EditExpenseScreenState extends State<EditExpenseScreen> {
  late TextEditingController amountCtrl;
  late TextEditingController descCtrl;
  late String selectedCategory;
  late DateTime selectedDate;

  @override
  void initState() {
    super.initState();
    amountCtrl = TextEditingController(text: widget.expense.amount.toString());
    descCtrl = TextEditingController(text: widget.expense.description);
    selectedCategory = widget.expense.category;
    selectedDate = widget.expense.date;
  }

  void _pickDate() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: selectedDate,
      firstDate: DateTime(2020),
      lastDate: DateTime.now(),
    );
    if (picked != null) {
      setState(() {
        selectedDate = picked;
      });
    }
  }

  void saveChanges() {
    final amt = double.tryParse(amountCtrl.text);
    if (amt == null || descCtrl.text.isEmpty) return;

    mockTransactions[widget.index] = Expense(
      id: widget.expense.id,
      userId: widget.expense.userId,
      amount: amt,
      description: descCtrl.text,
      category: selectedCategory,
      date: selectedDate,
    );

    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Edit Expense")),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            TextField(
              controller: amountCtrl,
              decoration: const InputDecoration(labelText: 'Amount'),
              keyboardType: TextInputType.number,
            ),
            const SizedBox(height: 10),
            TextField(
              controller: descCtrl,
              decoration: const InputDecoration(labelText: 'Description'),
            ),
            const SizedBox(height: 10),
            DropdownButtonFormField<String>(
              value: selectedCategory,
              items: ['Food', 'Travel','Personal','Bills', 'Other', 'Transfer'].map((c) =>
                  DropdownMenuItem(value: c, child: Text(c))).toList(),
              onChanged: (val) => setState(() => selectedCategory = val!),
              decoration: const InputDecoration(labelText: 'Category'),
            ),
            const SizedBox(height: 10),
            Row(
              children: [
                Expanded(
                  child: Text("Date: ${selectedDate.toLocal().toString().split(' ')[0]}"),
                ),
                TextButton(
                  onPressed: _pickDate,
                  child: const Text("Change Date"),
                ),
              ],
            ),
            const SizedBox(height: 20),
            ElevatedButton(onPressed: saveChanges, child: const Text('Save Changes')),
          ],
        ),
      ),
    );
  }
}
