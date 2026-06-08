
import { ExpoRequest, ExpoResponse } from 'expo-router/server';

const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

export async function GET(request: ExpoRequest) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get('searchQuery');

  if (!searchQuery) {
    return new Response(JSON.stringify({ message: 'Search query is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const apiResponse = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchQuery}`
    );

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error('TMDB API Error:', errorText);
      return new Response(JSON.stringify({ message: 'Failed to fetch from TMDB' }), {
        status: apiResponse.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await apiResponse.json();
    return ExpoResponse.json(data);
  } catch (error) {
    console.error('[API Route] Error:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
