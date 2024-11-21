import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Import the useAuth hook

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth(); // Access setUser from context

  const handleLogin = async () => {
    try {
      const response = await axios.post('http:///192.168.100.73/etiket/login.php', {
        email,
        password
      });

      if (response.data.status === 'success') {
        // Check if the user object exists before accessing its properties
        if (response.data.user) {
          setUser({
            id: response.data.user.id,
            name: response.data.user.name,
            email: response.data.user.email
          });

          Alert.alert('Login successful');
          setEmail(''); // Clear email field
          setPassword(''); // Clear password field
          navigation.navigate('DrawerNavigator');
        } else {
          Alert.alert('Login failed', 'User data not found in response');
        }
      } else {
        Alert.alert('Login failed', response.data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Network error or server issue');
      console.error('Error:', error); // Log error for debugging
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/images/E-Tiket.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#A9A9A9"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#A9A9A9"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signupButtonText}>SIGN-UP</Text>
      </TouchableOpacity>
      <View style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('RecoverScreen')}>
          <Text style={styles.forgotPasswordButton}>Click Here.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#F5F5F5',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#696969',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#32CD32',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
  signupButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  forgotPasswordText: {
    color: '#000',
    marginRight: 5,
  },
  forgotPasswordButton: {
    color: '#696969',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
