import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthService {
  getCurrentUser() {
    return AsyncStorage.getItem('user');
  }
}

export default new AuthService();
