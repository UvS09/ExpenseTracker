class Expense {
  final String? id;
  final String userId;
  final double amount;
  final String description;
  final String category;
  final DateTime date;

  Expense({
    this.id,
    required this.userId,
    required this.amount,
    required this.description,
    required this.category,
    required this.date,
  });

  factory Expense.fromJson(Map<String, dynamic> json) {
    return Expense(
      id: json['_id']?.toString(), 
      userId: json['userId'],
      amount: (json['amount'] as num).toDouble(),
      description: json['description'],
      category: json['category'],
      date: DateTime.parse(json['date']),
    );
  }

  Map<String, dynamic> toJson({bool includeId = false}) {
    final data = {
      'userId': userId,
      'amount': amount,
      'description': description,
      'category': category,
      'date': date.toIso8601String(),
    };
    if (includeId && id != null) data['expenseId'] = id as Object;
    return data;
  }
}
