import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { MY_API_KEY, TMDB_BASE_URL } from "../utils/APIcall";




const initialState = {
  movies: [],
  genresloaded: false,
  genres: [],
};

//to fetch the movie genre
export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(
    `${TMDB_BASE_URL}/genre/movie/list?api_key=${MY_API_KEY}`
  );


  return genres;
});

//here we extracting the name , genre and image of a particular movie----------
const arrayofMoviedata = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const moviesGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) moviesGenres.push(name.name);
    });
    if (movie.backdrop_path)
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: moviesGenres.slice(0, 3),
      });
  });
};

// this function is to get a particular number of movies to show

const getMoviedata = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 80 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}  `);
    arrayofMoviedata(results, moviesArray, genres);
  }
  return moviesArray;

};

//final fetching of movies-----
export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type }, myThunk) => {
    const {
      netflix: { genres },
    } = await myThunk.getState();
    return getMoviedata(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${MY_API_KEY}`,
      genres,
      true
    );
    // console.log(data);
  }
);

// fetching moviedata by genre to show in the movie page----------
export const fetchDatabyGenre = createAsyncThunk(
  "netflix/moviesBygenres",
  async ({ genre, type }, myThunk) => {
    const {
      netflix: { genres },
    } = myThunk.getState();
    return getMoviedata(
      `${TMDB_BASE_URL}/discover/${type}?api_key=${MY_API_KEY}&with_genres=${genre}`,
      genres
    );

  }
);
// fetching liked movies to show in My list----------------
export const getUserLikedMovies = createAsyncThunk(
  "netflix/getliked",
  async (email) => {
    const { data: { movies } } = await axios.get(`http://localhost/api/user/liked/${email}`)

    return movies
  }
)
 // creating function to delete a movie from My list---------
export const removeFromLikedMovies = createAsyncThunk(
  "netflix/deleteliked",
  async ({email , movieId}) => {
    const { data: { movies } } = await axios.put(`http://localhost/api/user/delete/` ,{email , movieId})

    return movies
  }
)

const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  extraReducers: (builder) => {
    // adding genres data function to the global state--------
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresloaded = true;
    });
    // adding movies data function to the glaobal state-----------------
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });

    // adding fetchmovieBygenre function to the global state-----------------
    builder.addCase(fetchDatabyGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });

    //Adding liked movies function to the global state---------------------
    builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });

    //Adding delete liked movies function to the global state---------------------
    builder.addCase(removeFromLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export const Store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer
  },
});
