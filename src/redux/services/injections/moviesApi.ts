import { baseApi } from "../baseApi";
import { Details, Movies } from "@/types/movie";
import { Credits } from "@/types/credits";
import { Collections } from "@/types/collection";
import { API_KEY } from "@/utils/constants";

export const moviesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPopular: builder.query<Movies, number>({
      query: (page) => ({
        url: `movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
        method: "GET",
      }),
    }),

    getTopRated: builder.query<Movies, number>({
      query: (page) => ({
        url: `movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`,
        method: "GET",
      }),
    }),

    getTranding: builder.query<Movies, void>({
      query: () => ({
        url: `trending/movie/day?api_key=${API_KEY}&language=en-US`,
        method: "GET",
      }),
    }),

    getCollection: builder.query<Collections, number>({
      query: (id) => ({
        url: `collection/${id}?api_key=${API_KEY}&language=en-US`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetPopularQuery,
  useGetTopRatedQuery,
  useGetTrandingQuery,
  useGetCollectionQuery,
} = moviesApi;
