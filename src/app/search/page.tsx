"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Search as SearchLogo } from "lucide-react";

import { Cards } from "@/components/cards";
import { Loading } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";

import { Movie } from "@/types/movie";
import { getSearchResults } from "@/services";

const Search = () => {
  const [name, setName] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(2);
  const [isLoadMore, setIsLoadMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.trim() === "" && value.length === 1) return;

    setInputValue(value);
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue) {
      setName(inputValue);
    }
  };

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    try {
      const response = await getSearchResults({
        query: name,
        page: page,
      });
      setSearchResults([...searchResults, ...response.results]);
      setPage((prevPage) => prevPage + 1);

      if (response.page === response.total_pages) {
        setIsLoadMore(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const fetchData = async () => {
    if (name) {
      setIsLoading(true);
      try {
        const response = await getSearchResults({
          query: name,
          page: 1,
        });
        setSearchResults(response.results);

        if (response.page === response.total_pages) {
          setIsLoadMore(false);
        }
      } catch (error: any) {
        const errorMessage = error.response.data.status_message;
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
    setPage(2);
    setIsLoadMore(true);
  }, [name]);

  return (
    <div className="flex flex-col gap-y-6">
      <form
        onSubmit={handleSubmit}
        className="border border-border rounded-xl flex items-center h-14 pl-3 overflow-hidden"
      >
        <button className="rounded-md p-2 duration-200 ease-in-out hover:bg-hover">
          <SearchLogo className="svg" />
        </button>
        <input
          type="text"
          placeholder="Search movie"
          className="bg-background w-full h-14 px-3"
          value={inputValue}
          onChange={handleChange}
        />
      </form>

      {isLoading ? (
        <Loading />
      ) : error ? (
        <div className="text-center">{error}</div>
      ) : searchResults.length > 0 ? (
        <div className="flex flex-col gap-y-6">
          <Cards title={name} movies={searchResults} />

          {isLoadMore && (
            <div className="flex justify-center">
              <Button disabled={isLoadingMore} onClick={handleLoadMore}>
                Load more
              </Button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Search;
