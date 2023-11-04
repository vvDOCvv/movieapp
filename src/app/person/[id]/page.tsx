import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { POSTER_URL } from "@/utils/constants";
import { dateFormat } from "@/utils/helpers";

import { getPerson, getPersonMovies } from "@/services";

type Props = { params: { id: string } };

const Person = async ({ params }: Props) => {
  const personId = Number(params.id);
  const person = await getPerson(personId);
  const personMovies = await getPersonMovies(personId);

  const sortedByYear = personMovies?.cast?.sort((a, b) =>
    b.release_date.localeCompare(a.release_date)
  );

  if (!person) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex gap-5 max-sm:flex-col">
        <figure className="block min-w-[250px] h-[350px] max-sm:min-w-0 max-sm:w-[200px] max-sm:h-[300px]">
          <Image
            src={
              person.profile_path
                ? POSTER_URL + person.profile_path
                : "/poster-not-found.jpg"
            }
            width={500}
            height={750}
            priority
            alt={person.name}
            className="rounded-md w-full h-full object-cover"
          />
        </figure>

        <div className="flex flex-col gap-y-4 w-full">
          <h2 className="text-xl font-[500] max-sm:text-lg">{person.name}</h2>

          <div className="grid gap-y-2">
            <div className="flex gap-y-1 gap-x-2">
              <div className="font-[500] text-secondaryText max-sm:text-sm">
                Birthday:
              </div>
              <div className="flex gap-x-1">
                <div className="max-sm:text-sm">
                  {dateFormat(person.birthday)}
                </div>
                {person.deathday && (
                  <div className="max-sm:text-sm">
                    — {dateFormat(person.deathday)}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-y-1 gap-x-2">
              <div className="font-[500] text-secondaryText max-sm:text-sm">
                Place of Birth:
              </div>
              <div className="max-sm:text-sm">
                {person.place_of_birth ? person.place_of_birth : "N/A"}
              </div>
            </div>
          </div>

          {person.biography && (
            <p className="max-sm:text-sm">{person.biography}</p>
          )}
        </div>
      </div>

      {sortedByYear.length > 0 && (
        <div className="flex flex-col gap-y-4">
          <h2 className="text-xl font-[500] max-sm:text-lg">Movies</h2>
          <div className="flex flex-col">
            <div className="bg-hover rounded-xl grid grid-cols-[100px_1fr_1fr] max-sm:grid-cols-[50px_1fr_1fr]">
              <div className="font-[500] py-3 px-4 max-sm:text-sm">Year</div>
              <div className="font-[500] py-3 px-4 max-sm:text-sm">Movie</div>
              <div className="font-[500] py-3 px-4 max-sm:text-sm">Role</div>
            </div>
            {sortedByYear.map(
              ({ id, title, character, release_date }, index) => {
                return (
                  <div
                    key={index}
                    className="border-b border-border grid grid-cols-[100px_1fr_1fr] last:border-none last:pb-0 max-sm:grid-cols-[50px_1fr_1fr]"
                  >
                    <div className="py-3 px-4 max-sm:text-sm">
                      {release_date
                        ? new Date(release_date).toLocaleDateString("en-US", {
                            year: "numeric",
                          })
                        : "N/A"}
                    </div>
                    <Link
                      href={`/details/${id}`}
                      className="py-3 px-4 hover:underline max-sm:text-sm"
                    >
                      {title}
                    </Link>
                    <div className="py-3 px-4 max-sm:text-sm">
                      {character ? character : "N/A"}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Person;
