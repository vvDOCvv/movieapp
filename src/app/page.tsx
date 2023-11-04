"use client";

import { TrendingCarousel } from "@/components/trandingCarousel";
import { Genres } from "@/components/genres";
import { PopularCarousel } from "@/components/popularCarousel";
import { TopRatedCarousel } from "@/components/topRatedCarousel";

const Home = () => {
  return (
    <div className="flex flex-col gap-y-10 max-sm:gap-y-5">
      <TrendingCarousel />
      <Genres />
      <PopularCarousel />
      <TopRatedCarousel />
    </div>
  );
};

export default Home;
