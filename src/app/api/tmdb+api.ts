
import { createApi } from 'expo-router/api';

const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

export default createApi(async (req, res) => {
  const { searchQuery } = req.query;

  if (!searchQuery) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchQuery}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from TMDB');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('[TMDB API] Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
