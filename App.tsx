import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import BottomTabNavigation from './src/navigation/BottomTabNavigation';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <BottomTabNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
