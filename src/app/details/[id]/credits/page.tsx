import { CreditsTab } from "@/components/creditsTab";
import { getCredits, getDetails } from "@/services";

type Props = { params: { id: string } };

const Credits = async ({ params }: Props) => {
  const movieId = Number(params.id);
  const details = await getDetails(movieId);
  const credits = await getCredits(movieId);

  return (
    <div className="flex flex-col gap-y-6">
      <h1 className="text-xl font-[500] max-sm:text-lg">
        {details && details.title}
      </h1>

      <CreditsTab cast={credits.cast} crew={credits.crew} />
    </div>
  );
};

export default Credits;
