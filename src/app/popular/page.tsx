"use client";

import { useEffect, useState } from "react";

import { Cards } from "@/components/cards";
import { Loading } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";

import { getPopular } from "@/services";
import { Movie } from "@/types/movie";

const Popular = () => {
  const [popular, setPopular] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(2);
  const [isLoadMore, setIsLoadMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    try {
      const response = await getPopular(page);
      setPopular([...popular, ...response.results]);
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
      const response = await getPopular(1);
      setPopular(response.results);
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
      <Cards title="Popular movies" movies={popular} />

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

export default Popular;
