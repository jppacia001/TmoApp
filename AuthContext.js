import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user details
  const [loading, setLoading] = useState(true); // Handle loading state

  // Function to log in the user
  const login = async (userData) => {
    try {
      console.log('Logging in user:', userData); // Debugging
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData); // Update user state
    } catch (error) {
      console.error('Failed to log in:', error);
    }
  };

  // Function to log out the user
  const logout = async () => {
    try {
      console.log('Logging out user'); // Debugging
      await AsyncStorage.removeItem('user');
      setUser(null); // Clear user state
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  // Load user details from AsyncStorage when app starts
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        console.log('Loaded user from storage:', storedUser); // Debugging
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          console.warn('No user found in storage'); // Warning for debugging
        }
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setLoading(false); // Loading complete
      }
    };

    loadUser();
  }, []);

  // Context value to provide
  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
