# Product Requirements Document: Movie Streaming App

## 1. Introduction

This document outlines the product requirements for a new movie streaming application. The app will provide users with a seamless platform to watch a variety of movies, while offering a straightforward content management system for administrators. The application will leverage modern streaming technologies and APIs to deliver a rich user experience.

## 2. Goals

*   To develop a high-quality movie streaming application that supports various streaming formats.
*   To create a simple and intuitive user interface for browsing and watching movies.
*   To build a secure and efficient admin panel for managing the movie library.
*   To ensure a scalable and maintainable architecture by using Firebase for the backend and TMDB for movie data.

## 3. User Roles

*   **User:** A registered user who can browse the movie library, search for specific titles, and stream movies.
*   **Admin:** A privileged user responsible for managing the movie catalog, including adding, updating, and removing movies.

## 4. Features

### 4.1. User Features

*   **Authentication:** Users can sign up and log in to the application using Firebase Authentication.
*   **Movie Library:** A gallery or list view of all available movies.
*   **Search:** Users can search for movies by title.
*   **Movie Details:** On selecting a movie, users can view detailed information such as the poster, title, synopsis, and rating. This information will be fetched dynamically from The Movie Database (TMDB).
*   **Streaming:** Users can play movies directly in the app. The player will support HLS, MP4, and MPD formats.

### 4.2. Admin Features

*   **Admin Login:** A dedicated login for administrators with a password. The password for the admin dashboard will be `54325`.
*   **Admin Dashboard:** A central interface for all administrative tasks.
*   **Movie Management:**
    *   **Add Movie:** Admins can add new movies by searching the TMDB database, selecting the correct movie, and then adding a streaming link.
    *   **Edit Movie:** Admins can edit the streaming link for any existing movie.
    *   **Delete Movie:** Admins can remove movies from the library.
    *   **View Movies:** Admins can see a list of all movies currently in the database.

## 5. Technical Requirements

### 5.1. Frontend

*   A responsive user interface that works on web and mobile devices.
*   A video player component that is compatible with HLS, MP4, and MPD formats.

### 5.2. Backend

*   **Database:** Cloud Firestore (Firebase) will be used to store movie data.
*   **Authentication:** Firebase Authentication will manage user and admin access.

### 5.3. APIs

*   **The Movie Database (TMDB) API:** To fetch movie details dynamically.

## 6. Data Model

The `movies` collection in Firestore will store documents with the following structure:

```json
{
  "tmdb_id": "12345",
  "streaming_link": "https://example.com/stream.m3u8"
}
```

*   `tmdb_id`: The unique identifier for the movie from TMDB.
*   `streaming_link`: The URL to the movie's stream (HLS, MP4, or MPD).

## 7. Admin Panel Flow

1.  **Login:** The admin navigates to a specific admin route and enters the password (`54325`) to log in.
2.  **Dashboard:** The admin is presented with a dashboard showing a list of current movies and options to add, edit, or delete them.
3.  **Add Movie:**
    *   The admin uses a search bar to find a movie on TMDB.
    *   Search results are displayed, and the admin selects the desired movie.
    *   A form appears where the admin can input the streaming link for the selected movie.
    *   Upon submission, a new document is created in the `movies` collection in Firestore.
4.  **Edit Movie:**
    *   The admin selects a movie from the list.
    *   A form appears where the admin can update the streaming link.
5.  **Delete Movie:**
    *   The admin can delete a movie from the list, which will remove the corresponding document from Firestore.
