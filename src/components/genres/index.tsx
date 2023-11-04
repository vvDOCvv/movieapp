import Link from "next/link";
import { useGetGenresQuery } from "@/redux/services/injections/genresApi";

export const Genres = () => {
  const { data: genres, isLoading, isError } = useGetGenresQuery();

  if (isLoading) {
    return null;
  }

  if (isError) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-4">
      <h2 className="text-xl font-[500] max-sm:text-lg">Genres</h2>
      <div className="flex flex-wrap gap-2">
        {genres?.genres?.map(({ id, name }) => {
          return (
            <Link
              key={id}
              href={`/genre/${id}`}
              className="border border-border rounded-xl py-1 px-4 duration-200 ease-in-out hover:bg-hover max-sm:text-sm"
            >
              {name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
