import { Carousel } from "../carousel";
import { Loading } from "../ui/loading";
import { useGetCreditsQuery } from "@/redux/services/injections/creditsApi";

type Props = {
  id: number;
};

export const Credits = ({ id }: Props) => {
  const { data: credits, isLoading } = useGetCreditsQuery(id, {
    skip: !id,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!credits) {
    return (
      <div className="text-lg font-[500] text-center flex justify-center items-center h-[25vh] max-sm:text-base">
        No credits
      </div>
    );
  }

  if (credits) {
    return (
      <Carousel
        title="Credits"
        href={`/details/${id}/credits`}
        data={credits.cast}
      />
    );
  }
};
