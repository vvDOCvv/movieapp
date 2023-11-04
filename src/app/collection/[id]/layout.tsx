import { Metadata } from "next/types";
import { getCollections } from "@/services";

export const generateMetadata = async ({
  params,
}: {
  params: { id: number };
}): Promise<Metadata> => {
  const collection = await getCollections(params.id);

  return {
    title: collection ? collection.name : "Not found",
  };
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
