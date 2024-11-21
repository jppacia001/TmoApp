import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';


const DashboardScreen = ({ navigation }) => {
  return (
      <View style={styles.mainContent}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Traffic Offenses</Text>
          <Text style={styles.cardCount}>0</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today's Offenses</Text>
          <Text style={styles.cardCount}>0</Text>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  drawerContainer: {
    flexDirection: 'row', // Arrange drawer and content side by side
  },
  drawerIcon: {
    position: 'absolute',
    left: 10,
    top: 10,
    zIndex: 1,
  },
  mainContent: {
    flex: 1,
    padding: 20,
    paddingTop: 50, // Space for status bar and drawer toggle button
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#5d6063',
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 18,
  },
  cardCount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  drawerHeader: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  drawerHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;
