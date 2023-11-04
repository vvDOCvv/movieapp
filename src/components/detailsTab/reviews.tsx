import { UserCircle } from "lucide-react";

import { Loading } from "../ui/loading";

import { useGetReviewsQuery } from "@/redux/services/injections/mediaApi";
import { dateFormat } from "@/utils/helpers";

export const Reviews = ({ id }: { id: number }) => {
  const { data: reviews, isLoading } = useGetReviewsQuery(id, { skip: !id });

  if (isLoading) {
    return <Loading />;
  }

  if (reviews?.results.length === 0) {
    return (
      <div className="text-lg font-[500] text-center flex justify-center items-center h-[25vh]">
        No reviews
      </div>
    );
  }

  if (reviews) {
    return (
      <div className="grid grid-cols-1 gap-4 max-md:grid-cols-1">
        {reviews?.results.map(({ id, author, content, created_at }) => {
          return (
            <div
              key={id}
              className="border-b border-border flex flex-col gap-y-4 pb-4 last:border-none last:pb-0"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-2">
                  <UserCircle className="svg" />
                  <div className="font-[500] max-sm:text-sm">{author}</div>
                </div>
                <div className="text-sm font-[500] text-secondaryText">
                  {dateFormat(created_at)}
                </div>
              </div>

              <p className="max-sm:text-sm">{content}</p>
            </div>
          );
        })}
      </div>
    );
  }
};
