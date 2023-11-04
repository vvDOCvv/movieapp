import { useState } from "react";
import { LayoutGrid, LayoutList } from "lucide-react";

import { Grid } from "./grid";
import { List } from "./list";
import { IconButton } from "../ui/iconButton";

import { Movie } from "@/types/movie";

type Props = {
  title: string;
  movies: Movie[] | undefined;
};

type LayoutType = "grid" | "list";

const layoutIcons = [
  { icon: <LayoutGrid className="svg" />, value: "grid" },
  { icon: <LayoutList className="svg" />, value: "list" },
];

export const Cards = ({ title, movies }: Props) => {
  const [layout, setLayout] = useState<LayoutType>("grid");

  const layoutComponents: { [key: string]: JSX.Element } = {
    grid: <Grid movies={movies} />,
    list: <List movies={movies} />,
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex justify-between items-center gap-x-2">
        <h1 className="text-xl font-[500] capitalize truncate max-sm:text-lg">
          {title}
        </h1>

        <div className="flex">
          {layoutIcons.map(({ icon, value }, index) => {
            return (
              <IconButton
                key={index}
                icon={icon}
                disabled={layout === value}
                onClick={() => setLayout(value as LayoutType)}
              />
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-y-6">{layoutComponents[layout]}</div>
    </div>
  );
};
