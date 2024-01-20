import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import BottomTabNavigation from './src/navigation/BottomTabNavigation';

import { Amplify } from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
import { AuthProvider } from './src/context/AuthContext';
Amplify.configure(amplifyconfig);

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        <BottomTabNavigation />
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
