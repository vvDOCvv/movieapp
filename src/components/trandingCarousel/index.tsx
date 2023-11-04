import { Carousel } from "../carousel";
import { useGetTrandingQuery } from "@/redux/services/injections/moviesApi";

export const TrendingCarousel = () => {
  const { data, isLoading } = useGetTrandingQuery();

  if (isLoading) {
    return null;
  }

  if (!data) {
    return null;
  }

  return <Carousel title="Trending today" data={data?.results} />;
};
