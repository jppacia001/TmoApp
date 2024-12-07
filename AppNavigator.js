import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from './AuthContext'; // Ensure the AuthContext file path is correct

// Import screens
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import RecoverScreen from './RecoverScreen';
import DashboardScreen from './DashboardScreen';
import AddRecordScreen from './AddRecordScreen';
import SearchRecordsScreen from './SearchRecordsScreen';
import SettingsScreen from './SettingsScreen';
import AccidentReportScreen from './AccidentReportScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Custom Drawer Content
const CustomDrawerContent = (props) => {
  const { navigation } = props;
  const { logout } = useAuth();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const handleLogout = () => {
    logout();
    navigation.replace('Login');
  };

  return (
    <DrawerContentScrollView contentContainerStyle={styles.drawerContent}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>E-TIKET</Text>
      </View>
      <View style={styles.drawerItems}>
        <DrawerItem
          label="Dashboard"
          icon={() => <Ionicons name="home" size={24} color="black" />}
          onPress={() => navigateToScreen('Dashboard')}
        />
        <DrawerItem
          label="Add Record"
          icon={() => <Ionicons name="add-circle" size={24} color="black" />}
          onPress={() => navigateToScreen('AddRecord')}
        />
        <DrawerItem
          label="Search Records"
          icon={() => <Ionicons name="search-circle" size={24} color="black" />}
          onPress={() => navigateToScreen('SearchRecords')}
        />
        <DrawerItem
          label="Accident Report"
          icon={() => <Ionicons name="warning" size={24} color="black" />}
          onPress={() => navigateToScreen('AccidentReport')}
        />
        <DrawerItem
          label="Settings"
          icon={() => <Ionicons name="settings" size={24} color="black" />}
          onPress={() => navigateToScreen('Settings')}
        />
      </View>
      <View style={styles.drawerFooter}>
        <DrawerItem
          label="Logout"
          icon={() => <Ionicons name="log-out" size={24} color="black" />}
          onPress={handleLogout}
        />
      </View>
    </DrawerContentScrollView>
  );
};

// Drawer Navigator
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard' }} />
      <Drawer.Screen name="AddRecord" component={AddRecordScreen} options={{ title: 'Add Record' }} />
      <Drawer.Screen name="SearchRecords" component={SearchRecordsScreen} options={{ title: 'Search Records' }} />
      <Drawer.Screen name="AccidentReport" component={AccidentReportScreen} options={{ title: 'Accident Report' }} />
      <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
    </Drawer.Navigator>
  );
};

// Main App Navigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Recover" component={RecoverScreen} options={{ title: 'Recover Password' }} />
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  drawerContent: { flexGrow: 1 },
  drawerHeader: { backgroundColor: '#f5f5f5', paddingVertical: 15, paddingHorizontal: 10, marginBottom: 10 },
  drawerHeaderText: { fontSize: 18, fontWeight: 'bold' },
  drawerItems: { flex: 1 },
  drawerFooter: { borderTopWidth: 1, borderTopColor: '#ddd', paddingVertical: 10, paddingHorizontal: 15 },
});

export default AppNavigator;
