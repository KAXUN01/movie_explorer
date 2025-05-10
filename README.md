# Movie Explorer

Movie Explorer is a React and TypeScript-based web application that allows users to search for movies, view trending movies, and manage their favorite movies. It integrates with the TMDB API to fetch movie data and provides a user-friendly interface for exploring movies.

---
## 🚀 Features

- 🔍 **Search** movies by title
- 🎯 **Filter** movies by:
  - Genre
  - Release Year
  - Minimum Rating
- 🎞️ **View details** of selected movies including:
  - Overview
  - Genres
  - Cast
  - Trailers
- 📈 **Trending** movies section
- 🕵️‍♂️ Recent search history
- 🌙 Dark mode support 

---

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Material UI
- **API**: [TMDb API](https://www.themoviedb.org/documentation/api)
- **Deployment**: Docker, GitHub Actions (CI/CD)

---
## Project Setup

### Prerequisites
- Node.js (v14 or later)
- Yarn (preferred) or npm

### Steps to Run the Project
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd movie_explorer ```


2. Install dependencies:
   ```bash
   yarn install
   ```

3. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add the following line to the `.env` file:
     ```
     REACT_APP_TMDB_API_KEY=<your_tmdb_api_key>
     ```
     Replace `<your_tmdb_api_key>` with your TMDb API key.

4. Start the development server:
   ```bash
   yarn start
   ```
   The application will be available at `http://localhost:3000`.

---



## 🐳 Docker Support
To run the app in a Docker container:

1. Build the Docker image
```
docker build -t movie-explorer .
```

2. Run the container
 ```
docker run -p 3000:80 --env-file .env movie-explorer
```


## API Usage

The application uses the TMDb API to fetch movie data. Below are the key API integrations:

1. **Search Movies**:
   - Endpoint: `https://api.themoviedb.org/3/search/movie`
   - Parameters: `query`, `genre`, `year`, `rating`
   - Function: `searchMovies`

2. **Get Movie Details**:
   - Endpoint: `https://api.themoviedb.org/3/movie/{id}`
   - Parameters: `append_to_response=videos,credits`
   - Function: `getMovieDetailsWithCredits`

3. **Get Trending Movies**:
   - Endpoint: `https://api.themoviedb.org/3/trending/movie/week`
   - Function: `getTrendingMovies`

---

## Features Implemented

### 1. **Authentication**
- Users can log in with mock credentials (`admin/admin`).
- Authentication token is stored in `localStorage`.

### 2. **Search Functionality**
- Search movies by title, genre, release year, and minimum rating.
- Recent searches are saved and displayed for quick access.

### 3. **Trending Movies**
- Displays a carousel of trending movies fetched from the TMDb API.

### 4. **Movie Details**
- View detailed information about a movie, including cast, genres, and trailers.

### 5. **Favorites Management**
- Add or remove movies from the favorites list.
- Favorites are stored in `localStorage`.

### 6. **Dark Mode**
- Toggle between light and dark themes using Material-UI's theme provider.

### 7. **Responsive Design**
- Fully responsive layout for desktop, tablet, and mobile devices.

---

## Folder Structure

```
src/
├── api/                # API integration with TMDb
├── components/         # Reusable UI components
├── context/            # Context providers for state management
├── pages/              # Page-level components (Home, Login, Favorites)
├── styles.css          # Global styles
├── ThemeContext.tsx    # Theme provider for light/dark mode
├── App.tsx             # Main application component
└── index.tsx           # Entry point of the application
```

---

## Technologies Used

- **React**: Frontend framework
- **TypeScript**: Static typing
- **Material-UI**: UI components and theming
- **Axios**: HTTP client for API requests
- **React Router**: Client-side routing
- **Slick Carousel**: Carousel for trending movies

---

## Future Enhancements

- Implement user authentication with a real backend.
- Add pagination for search results.
- Improve error handling and loading states.
- Add support for more advanced filters (e.g., runtime, language).

---

## License

This project is licensed under the MIT License.







