import { Carousel } from "../carousel";
import { useGetPopularQuery } from "@/redux/services/injections/moviesApi";

export const PopularCarousel = () => {
  const { data, isLoading } = useGetPopularQuery(1);

  if (isLoading) {
    return null;
  }

  if (!data) {
    return null;
  }

  return (
    <Carousel title="Popular movies" href="/popular" data={data?.results} />
  );
};
