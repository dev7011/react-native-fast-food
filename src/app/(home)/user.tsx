import React from 'react';
import { View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import {
  useState,
  useEffect
} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";


const API_BASE = "https://jsonplaceholder.typicode.com/users"

interface User {
  id: number
  name: string
  email: string
}

async function fetchUsers(): Promise<User[]>{
  const response = await fetch(API_BASE)
  if (!response.ok) { throw new Error(response.statusText); }

  return response.json()
}

const UserScreen = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string|null>(null)

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Ein unbekannter Fehler ist aufgetreten.',
        );
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {
        loading &&
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="red" />
          <Text>Benutzer laden ...</Text>
        </View>
      }

      {
        !loading && error &&
        <View style={styles.loading}>
          <Text>{error}</Text>
        </View>
      }

      {!loading && !error &&
        <FlatList
          data = {users}

          renderItem = { ({item}) => (
              <View style={[styles.item]}>
                <Text>{item.name}</Text>
                <Text>{item.email}</Text>
              </View>
            )
          }

          keyExtractor = {item => item.id.toString()}
        />
      }
    </SafeAreaView>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#C6C6C6',
    marginBottom: 5,
    paddingVertical: 5,
    paddingHorizontal: 5
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  }
});


