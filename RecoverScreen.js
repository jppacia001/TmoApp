// RecoverScreen.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const RecoverScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RECOVER</Text>
      <View style={styles.formGroup}>
        <TextInput 
          style={styles.input} 
          placeholder="Email" 
          keyboardType="email-address" 
          autoCapitalize="none" 
          autoCorrect={false} 
        />
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
  formGroup: {
    width: '80%',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  cancelButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    width: '48%',
  },
  cancelButtonText: {
    fontSize: 16,
  },
  resetButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#333',
    alignItems: 'center',
    width: '48%',
  },
  resetButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default RecoverScreen;
