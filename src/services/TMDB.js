import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: builder => ({
    //* Get Genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`
    }),

    //* Get Movies by [Type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        //* Get movies by Search
        if (searchQuery) {
          return `search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }

        //* Get movies by Category
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "string"
        ) {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }
        //* Get movies by Genre
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "number"
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }

        //* Get Popular Movies
        return `/movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      }
    }),
    // Get Movie
    getMovie: builder.query({
      query: id =>
        `movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`
    }),
    // Get List favorites
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) =>
        `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`
    }),
    // Get Recommended Movies
    getRecommendations: builder.query({
      query: ({ movie_id, list }) =>
        `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`
    }),
    // Get Actor Information
    getActorsDetails: builder.query({
      query: id =>
        `https://api.themoviedb.org/3/person/${id}?api_key=${tmdbApiKey}`
    }),
    getMoviesByActorId: builder.query({
      query: ({ id, page }) =>
        `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`
    })
  })
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorsDetailsQuery,
  useGetMoviesByActorIdQuery,
  useGetListQuery
} = tmdbApi;
