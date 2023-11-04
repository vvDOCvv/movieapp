import { Details, Movies } from "@/types/movie";
import { Credits } from "@/types/credits";
import { Collections } from "@/types/collection";
import { API_KEY } from "@/utils/constants";
import { Person, PersonMovies } from "@/types/person";

export const getDetails = async (id: number): Promise<Details | undefined> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
  );

  if (!response.ok) {
    return undefined;
  }

  return await response.json();
};

export const getCredits = async (id: number): Promise<Credits> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
  );

  return await response.json();
};

export const getCollections = async (
  id: number
): Promise<Collections | undefined> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/collection/${id}?api_key=${API_KEY}&language=en-US`
  );

  if (!response.ok) {
    return undefined;
  }

  return await response.json();
};

export const getPerson = async (id: number): Promise<Person | undefined> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`
  );

  if (!response.ok) {
    return undefined;
  }

  return await response.json();
};

export const getPersonMovies = async (id: number): Promise<PersonMovies> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`
  );

  return await response.json();
};

export const getPopular = async (page: number): Promise<Movies> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );

  return await response.json();
};

export const getTopRated = async (page: number): Promise<Movies> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
  );

  return await response.json();
};

export const getGenre = async ({
  id,
  page,
}: {
  id: number;
  page: number;
}): Promise<Movies> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${id}&page=${page}&sort_by=popularity.desc`
  );

  return await response.json();
};

export const getSearchResults = async ({
  query,
  page,
}: {
  query: string;
  page: number;
}): Promise<Movies> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`
  );

  return await response.json();
};
