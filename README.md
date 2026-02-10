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
  App.js
  index.js
  index.css
  starRating.js
  components/
    layout/
      Box.js
      Logo.js
      Main.js
      NavBar.js
      NumResults.js
      Search.js
      ToggleButton.js
    movies/
      Movie.js
      MovieDetails.js
      MovieList.js
      WatchedMovie.js
      WatchedMovieList.js
      WatchedSummary.js
    ui/
      ErrorMessage.js
      Loader.js
  constants/
    api.js
  utils/
    average.js
```

## API Configuration

OMDb API key is currently stored in `src/constants/api.js` as `API_KEY`.

For production, move this to an environment variable pattern (for example, CRA `REACT_APP_*` vars) instead of hardcoding.

## Notes

- Styling is in `src/index.css`.
- `src/App-v1.js` is an older version kept in the repo
