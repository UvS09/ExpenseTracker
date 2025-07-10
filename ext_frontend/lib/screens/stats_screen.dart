import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import '../services/api_service.dart';
import '../models/expense.dart';

class StatsScreen extends StatefulWidget {
  const StatsScreen({super.key});

  @override
  State<StatsScreen> createState() => _StatsScreenState();
}

class _StatsScreenState extends State<StatsScreen> {
  Map<String, double> categoryTotals = {};

  @override
  void initState() {
    super.initState();
    loadData();
  }

  void loadData() async {
    final expenses = await ApiService.fetchExpenses();
    final Map<String, double> totals = {};
    for (var e in expenses) {
      totals[e.category] = (totals[e.category] ?? 0) + e.amount;
    }
    setState(() => categoryTotals = totals);
  }

  @override
  Widget build(BuildContext context) {
    final categories = categoryTotals.keys.toList();
    return Scaffold(
      appBar: AppBar(title: const Text('Expense Breakdown')),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: categoryTotals.isEmpty
            ? const Center(child: Text("No data"))
            : BarChart(
                BarChartData(
                  alignment: BarChartAlignment.spaceAround,
                  maxY: categoryTotals.values.reduce((a, b) => a > b ? a : b) + 100,
                  barGroups: List.generate(categories.length, (i) {
                    return BarChartGroupData(
                      x: i,
                      barRods: [
                        BarChartRodData(
                          toY: categoryTotals[categories[i]]!,
                          color: Colors.teal,
                          width: 22,
                        ),
                      ],
                    );
                  }),
                  titlesData: FlTitlesData(
                    leftTitles: AxisTitles(
                      sideTitles: SideTitles(showTitles: true),
                    ),
                    bottomTitles: AxisTitles(
                      sideTitles: SideTitles(
                        showTitles: true,
                        getTitlesWidget: (value, meta) {
                          final index = value.toInt();
                          return Text(categories[index], style: const TextStyle(fontSize: 10));
                        },
                      ),
                    ),
                  ),
                ),
              ),
      ),
    );
  }
}
