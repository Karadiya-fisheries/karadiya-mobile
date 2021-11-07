import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthService {
  getCurrentUser() {
    return JSON.parse(AsyncStorage.getItem('user'));
  }
}

export default new AuthService();
