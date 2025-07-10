import 'package:shared_preferences/shared_preferences.dart';

class AuthService {
  static String? token;
  static String? email;
  static String? name;

  // Load saved login info
  static Future<void> loadSession() async {
    final prefs = await SharedPreferences.getInstance();
    token = prefs.getString('token');
    email = prefs.getString('email');
    name = prefs.getString('name');
  }

  static Future<void> saveSession({
    required String tokenVal,
    required String emailVal,
    required String nameVal,
  }) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('token', tokenVal);
    await prefs.setString('email', emailVal);
    await prefs.setString('name', nameVal);

    token = tokenVal;
    email = emailVal;
    name = nameVal;
  }

  static Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.clear();
    token = null;
    email = null;
    name = null;
  }

  static bool isLoggedIn() => token != null;
}
