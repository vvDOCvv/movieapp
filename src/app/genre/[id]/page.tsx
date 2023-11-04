"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

import { Cards } from "@/components/cards";
import { Loading } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";

import { getGenre } from "@/services";
import { Movie } from "@/types/movie";
import { useGetGenresQuery } from "@/redux/services/injections/genresApi";

type Props = { params: { id: string } };

const Genre = ({ params }: Props) => {
  const genreId = Number(params.id);
  const [genre, setGenre] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(2);
  const [isLoadMore, setIsLoadMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { data: genres } = useGetGenresQuery();

  const genreName = genres?.genres.find(({ id }) => id === genreId)?.name;

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    try {
      const response = await getGenre({ id: genreId, page });
      setGenre([...genre, ...response.results]);
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
      const response = await getGenre({ id: genreId, page: 1 });
      setGenre(response.results);
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

  if (genre.length === 0) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-y-6">
      <Cards title={genreName || ""} movies={genre} />

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

export default Genre;
