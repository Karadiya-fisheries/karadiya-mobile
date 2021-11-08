import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthService {
  async getCurrentUser() {
    return await AsyncStorage.getItem('user');
  }
}

export default new AuthService();
