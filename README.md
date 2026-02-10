# usePopcorn

A React movie search app powered by the OMDb API.

## Overview

usePopcorn lets you:

- Search movies from OMDb
- Open movie details
- Rate movies using a custom star rating component
- Add movies to a watched list
- Track watched summary stats (IMDb rating, your rating, runtime)

## Tech Stack

- React
- Create React App (`react-scripts`)
- Plain CSS

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm start
```

App runs at `http://localhost:3000`.

## Available Scripts

- `npm start` - Run in development mode
- `npm run build` - Build production bundle in `build/`
- `npm test` - Run tests in watch mode
- `npm run eject` - Eject CRA config (irreversible)

## Project Structure

```text
src/
  App.js                   - Main app component with state management
  index.js                 - React entry point
  index.css                - Global styles
  starRating.js            - Star rating component
  components/
    layout/
      Box.js               - Reusable box wrapper component
      Logo.js              - App logo component
      Main.js              - Main layout container
      NavBar.js            - Navigation bar with search and results
      NumResults.js        - Movie results counter
      Search.js            - Search input field
      ToggleButton.js      - Toggle button for watched/results view
    movies/
      Movie.js             - Individual movie card component
      MovieDetails.js      - Detailed movie info and rating page
      MovieList.js         - List of movies from search
      WatchedMovie.js      - Individual watched movie item
      WatchedMovieList.js  - List of watched movies
      WatchedSummary.js    - Statistics of watched movies
    ui/
      ErrorMessage.js      - Error notification component
      Loader.js            - Loading spinner component
  constants/
    api.js                 - OMDb API configuration
  hooks/
    useMovies.js           - Custom hook for fetching movies from OMDb
    useKey.js              - Custom hook for keyboard event handling
    useLocalStorageState.js - Custom hook for persisting state to localStorage
  utils/
    average.js             - Utility function for calculating averages
```

## API Configuration

OMDb API key is currently stored in `src/constants/api.js` as `API_KEY`.

For production, move this to an environment variable pattern (for example, CRA `REACT_APP_*` vars) instead of hardcoding.

## Custom Hooks

### `useMovies(query, callback)`

Fetches movies from the OMDb API based on a search query.

**Parameters:**
- `query` (string) - Search term for movies
- `callback` (function) - Callback function executed on query changes

**Returns:**
- `movies` - Array of movie objects from search results
- `isLoading` - Boolean indicating fetch status
- `error` - Error message string if fetch fails

**Features:**
- Debounces API requests to avoid excessive calls
- Uses AbortController to cancel previous requests when query changes
- Handles API errors gracefully

### `useKey(key, action)`

Listens for keyboard key presses and executes a callback function.

**Parameters:**
- `key` (string) - Key code to listen for (e.g., "Escape")
- `action` (function) - Callback function to execute when key is pressed

**Features:**
- Case-insensitive key matching
- Automatically cleans up event listeners on unmount

### `useLocalStorageState(initialState, key)`

Persists React state to localStorage and syncs with local storage changes.

**Parameters:**
- `initialState` - Initial value if localStorage is empty
- `key` (string) - localStorage key name

**Returns:**
- `[value, setValue]` - State tuple similar to `useState()`

**Features:**
- Reads from localStorage on initial render
- Automatically syncs to localStorage on every state change
- Handles JSON serialization/deserialization

## Features

- **Movie Search** - Search for movies using OMDb API
- **Movie Details** - View detailed information including plot, cast, director, and runtime
- **Star Rating** - Rate movies with a custom interactive star rating component
- **Watched List** - Add watched movies with your personal ratings
- **Persistent Storage** - Watched list persists across browser sessions
- **Statistics** - Track average IMDb rating, your average rating, and total runtime of watched movies
- **Keyboard Navigation** - Use Escape key to close movie details

## Notes

- Styling is in `src/index.css`.
- `src/App-v1.js` is an older version kept in the repo
