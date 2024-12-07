import React from 'react';
import AppNavigator from './AppNavigator';
import { AuthProvider } from './AuthContext'; // Ensure the AuthContext file path is correct
import { RecordsProvider } from './RecordsContext'; // Ensure the RecordsContext file path is correct

export default function App() {
  return (
    <AuthProvider>
      <RecordsProvider>
        <AppNavigator />
      </RecordsProvider>
    </AuthProvider>
  );
}
