
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Button } from 'react-native';
import { db } from '../firebase'; // Adjust the path if necessary
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"; 
import { useRouter } from 'expo-router';

export default function ViewMoviesScreen() {
  const [movies, setMovies] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      const querySnapshot = await getDocs(collection(db, "movies"));
      const moviesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMovies(moviesData);
    };

    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "movies", id));
      setMovies(movies.filter(movie => movie.id !== id));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movies</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }} style={styles.poster} />
            <View style={styles.movieInfo}>
              <Text style={styles.movieTitle}>{item.title}</Text>
              <Text>{item.overview}</Text>
            </View>
            <Button title="Delete" onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  movieItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  poster: {
    width: 100,
    height: 150,
    marginRight: 16,
  },
  movieInfo: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
