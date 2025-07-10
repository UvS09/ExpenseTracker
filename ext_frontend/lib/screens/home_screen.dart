import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/expense.dart';
import '../services/api_service.dart';
import '../services/auth_service.dart';
import 'add_expense_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<Expense> expenses = [];
  double balance = 10000;

  @override
  void initState() {
    super.initState();
    loadExpenses();
  }

  void loadExpenses() async {
    final fetched = await ApiService.fetchExpenses();
    setState(() {
      expenses = fetched;
      balance = _calculateBalance(fetched);
    });
  }

  double _calculateBalance(List<Expense> expenses) {
    double total = 10000;
    for (var exp in expenses) {
      if (exp.category == 'Transfer') {
        total -= exp.amount;
      } else {
        total -= exp.amount;
      }
    }
    return total;
  }

  void _goToAddExpense() async {
    final added = await Navigator.push(
      context,
      MaterialPageRoute(builder: (_) => const AddExpenseScreen()),
    );
    if (added == true) {
      loadExpenses();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: ListView(
          children: [
            const SizedBox(height: 50),
            Text("Hi ${AuthService.name ?? ''}!", style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
            const Text("Welcome back 👋", style: TextStyle(color: Colors.grey)),
            const SizedBox(height: 24),
            const Text("Balance", style: TextStyle(fontSize: 16)),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.teal.shade100,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text("Balance", style: TextStyle(fontSize: 16)),
                  Text("₹${balance.toStringAsFixed(2)}", style: const TextStyle(fontSize: 30, fontWeight: FontWeight.bold)),
                ],
              ),
            ),

            const Text("Transactions", style: TextStyle(fontSize: 20)),
            const SizedBox(height: 12),
            ...expenses.map((exp) => Card(
              child: ListTile(
                title: Text("${exp.description} - ₹${exp.amount.toStringAsFixed(2)}"),
                subtitle: Text("${exp.category} • ${DateFormat('yyyy-MM-dd').format(exp.date)}"),
              ),
            )),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.teal,
        onPressed: _goToAddExpense,
        child: const Icon(Icons.add),
      ),
    );
  }
}
