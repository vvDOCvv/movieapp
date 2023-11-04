"use client";

import { useEffect, useState } from "react";

import { Cards } from "@/components/cards";
import { Loading } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";

import { getTopRated } from "@/services";
import { Movie } from "@/types/movie";

const TopRated = () => {
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(2);
  const [isLoadMore, setIsLoadMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    try {
      const response = await getTopRated(page);
      setTopRated([...topRated, ...response.results]);
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
    try {
      const response = await getTopRated(1);
      setTopRated(response.results);
    } catch (error: any) {
      const errorMessage = error.response.data.status_message;
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading isFullPage />;
  }

  if (error) {
    return <div className="text-center">{error}</div>;
  }

  return (
    <div className="flex flex-col gap-y-6">
      <Cards title="Top rated movies" movies={topRated} />

      {isLoadMore && (
        <div className="flex justify-center">
          <Button disabled={isLoadingMore} onClick={handleLoadMore}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default TopRated;
