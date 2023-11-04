"use client";

import { Cards } from "@/components/cards";
import { Loading } from "@/components/ui/loading";
import { useGetCollectionQuery } from "@/redux/services/injections/moviesApi";

type Props = { params: { id: string } };

const Collection = ({ params }: Props) => {
  const collectionId = Number(params.id);
  const { data, isLoading, error } = useGetCollectionQuery(collectionId);

  if (isLoading) {
    return <Loading isFullPage />;
  }

  if (error) {
    // @ts-ignore
    return <div className="text-center">{error.data.status_message}</div>;
  }

  if (data) {
    return <Cards title={data.name} movies={data.parts} />;
  }
};

export default Collection;
