import type { Metadata } from "next";
import { getPerson } from "@/services";

export const generateMetadata = async ({
  params,
}: {
  params: { id: number };
}): Promise<Metadata> => {
  const person = await getPerson(params.id);

  return {
    title: person ? person.name : "Not found",
  };
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
