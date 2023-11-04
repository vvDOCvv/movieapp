import { Carousel } from "../carousel";
import { useGetTopRatedQuery } from "@/redux/services/injections/moviesApi";

export const TopRatedCarousel = () => {
  const { data, isLoading } = useGetTopRatedQuery(1);

  if (isLoading) {
    return null;
  }

  if (!data) {
    return null;
  }

  return (
    <Carousel title="Top rated movies" href="/popular" data={data?.results} />
  );
};
