
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function AdminScreen() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <View style={styles.buttonContainer}>
        <Button title="Add Movie" onPress={() => router.push('/add-movie')} />
        <Button title="Edit Movie" onPress={() => {}} />
        <Button title="Delete Movie" onPress={() => {}} />
        <Button title="View Movies" onPress={() => {}} />
      </View>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 16,
  },
});
