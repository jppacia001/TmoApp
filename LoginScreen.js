import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useAuth } from './AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false); // State to track login success
  const { login } = useAuth();

  const handleLogin = async () => {
    setLoading(true); // Start loading effect

    try {
      const response = await axios.post('http://192.168.239.73/etiket/login.php', {
        email,
        password
      });

      setTimeout(async () => {
        setLoading(false); // End loading effect after 1.5 seconds

        if (response.data.status === 'success') {
          if (response.data.user) {
            login({
              id: response.data.user.id,
              name: response.data.user.name,
              email: response.data.user.email
            });

            setLoginSuccess(true); // Set login success state to true
            setEmail(''); // Clear email field
            setPassword(''); // Clear password field

            // Redirect after 2 seconds to give user time to read the success message
            setTimeout(() => {
              setLoginSuccess(false); // Reset success state
              navigation.navigate('DrawerNavigator'); // Navigate to the next screen
            }, 1000);
          } else {
            Alert.alert('Login failed', 'User data not found in response');
          }
        } else {
          Alert.alert('Login failed', response.data.message);
        }
      }, 1500); // Simulate 1.5 seconds delay for loading effect
    } catch (error) {
      setLoading(false); // End loading effect if error occurs
      Alert.alert('Error', 'Network error or server issue');
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/images/E-Tiket.png')} style={styles.logo} />

      {/* Display loading spinner or success message based on state */}
      {loading ? (
        <ActivityIndicator size="large" color="#696969" style={styles.loadingIndicator} />
      ) : loginSuccess ? (
        // Show success message after login is successful
        <View style={styles.successMessageContainer}>
          <Text style={styles.successMessageText}>Login Successful!</Text>
        </View>
      ) : (
        // Show the login form when not loading or showing success message
        <>
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
        </>
      )}
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
  loadingIndicator: {
    marginBottom: 20,
  },
  successMessageContainer: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  successMessageText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
