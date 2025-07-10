import 'dart:convert';
import 'package:http/http.dart' as http;
import 'auth_service.dart';
import '../models/expense.dart';

class ApiService {
  static const String baseUrl = 'http://localhost:8080';

  // LOGIN
  static Future<bool> loginUser(String email, String password) async {
    final url = Uri.parse('$baseUrl/api/user/login');
    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email, 'password': password}),
      );
      final resData = jsonDecode(response.body);

      if (response.statusCode == 200 && resData['data']['token'] != null) {
        AuthService.saveSession(
          tokenVal: resData['data']['token'],
          emailVal: resData['data']['email'],
          nameVal: resData['data']['firstName'],
        );
        return true;
      } else {
        print('Login failed: ${resData['message']}');
        return false;
      }
    } catch (e) {
      print('Login error: $e');
      return false;
    }
  }

  // REGISTER
  static Future<bool> registerUser(String firstName, String email, String password) async {
    final url = Uri.parse('$baseUrl/api/user/register');
    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'firstName': firstName, 'email': email, 'password': password}),
      );

      if (response.statusCode == 201) {
        return true;
      } else {
        final resData = jsonDecode(response.body);
        print('Register failed: ${resData['message']}');
        return false;
      }
    } catch (e) {
      print('Register error: $e');
      return false;
    }
  }

  // ADD EXPENSE
  static Future<bool> addExpense(Expense expense) async {
    if (AuthService.token == null) return false;

    final url = Uri.parse('$baseUrl/api/expense/create');
    try {
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ${AuthService.token}',
        },
        body: jsonEncode(expense.toJson()),
      );

      if (response.statusCode == 201) return true;

      print('Add expense failed: ${response.body}');
      return false;
    } catch (e) {
      print('Add expense error: $e');
      return false;
    }
  }

  // FETCH EXPENSES
  static Future<List<Expense>> fetchExpenses() async {
    if (AuthService.token == null) return [];

    final url = Uri.parse('$baseUrl/api/expense/all');
    try {
      final response = await http.get(
        url,
        headers: {
          'Authorization': 'Bearer ${AuthService.token}',
        },
      );

      if (response.statusCode == 200) {
        final resData = jsonDecode(response.body);
        return (resData['expenses'] as List)
            .map((e) => Expense.fromJson(e))
            .toList();
      } else {
        print('Fetch expenses failed: ${response.body}');
      }
    } catch (e) {
      print('Fetch expenses error: $e');
    }
    return [];
  }

  // UPDATE EXPENSE
  static Future<bool> updateExpense(Expense expense) async {
    if (AuthService.token == null) return false;

    final url = Uri.parse('$baseUrl/api/expense/update');
    try {
      final response = await http.put(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ${AuthService.token}',
        },
        body: jsonEncode(expense.toJson(includeId: true)),
      );

      if (response.statusCode == 200) return true;

      print('Update expense failed: ${response.body}');
      return false;
    } catch (e) {
      print('Update error: $e');
      return false;
    }
  }
}
