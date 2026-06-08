
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Image, Alert } from 'react-native';
import { db } from '../firebase'; // Adjust the path if necessary
import { collection, addDoc } from "firebase/firestore"; 

const TMDB_API_KEY = 'YOUR_TMDB_API_KEY'; // <-- IMPORTANT: Add your TMDB API key here

export default function AddMovieScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [streamingLink, setStreamingLink] = useState('');

  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchQuery}`
      );
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error("Error searching for movies:", error);
      Alert.alert("Error", "Could not fetch movies. Please try again.");
    }
  };

  const handleAddMovie = async () => {
    if (!selectedMovie || !streamingLink) {
      Alert.alert("Missing Information", "Please select a movie and enter a streaming link.");
      return;
    }

    try {
      await addDoc(collection(db, "movies"), {
        title: selectedMovie.title,
        poster_path: selectedMovie.poster_path,
        overview: selectedMovie.overview,
        release_date: selectedMovie.release_date,
        streamingLink: streamingLink,
      });
      Alert.alert("Success", "Movie added to the database.");
      setSelectedMovie(null);
      setStreamingLink('');
      setSearchResults([]);
      setSearchQuery('');
    } catch (error) {
      console.error("Error adding movie to Firestore:", error);
      Alert.alert("Error", "Could not add movie. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Movie</Text>

      <TextInput
        style={styles.input}
        placeholder="Search for a movie on TMDB"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Search" onPress={handleSearch} />

      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.movieItem}>
              <Image source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }} style={styles.poster} />
              <Text style={{flex:1}}>{item.title}</Text>
              <Button title="Select" onPress={() => setSelectedMovie(item)} />
            </View>
          )}
        />
      )}

      {selectedMovie && (
        <View style={styles.addForm}>
          <Text style={styles.selectedMovieTitle}>Selected Movie: {selectedMovie.title}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter streaming link"
            value={streamingLink}
            onChangeText={setStreamingLink}
          />
          <Button title="Add Movie" onPress={handleAddMovie} />
        </View>
      )}
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
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  poster: {
    width: 50,
    height: 75,
    marginRight: 8,
  },
  addForm: {
    marginTop: 16,
  },
  selectedMovieTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
});
