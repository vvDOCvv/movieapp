import type { Metadata } from "next";
import { getDetails } from "@/services";

export const generateMetadata = async ({
  params,
}: {
  params: { id: number };
}): Promise<Metadata> => {
  const details = await getDetails(params.id);

  return {
    title: details ? `Credits | ${details.title}` : "Not found",
  };
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
