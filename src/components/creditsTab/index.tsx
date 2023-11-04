"use client";

import { useState } from "react";
import Link from "next/link";
import { Tab } from "@headlessui/react";

import { Cast, Crew } from "@/types/credits";
import { cn } from "@/utils/cn";

const tabList = ["Cast", "Crew"];

type Props = {
  cast: Cast[];
  crew: Crew[];
};

export const CreditsTab = ({ cast, crew }: Props) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div className="flex flex-col gap-y-6">
      <Tab.Group selectedIndex={activeTabIndex} onChange={setActiveTabIndex}>
        <div className="flex justify-center">
          <Tab.List className="border border-border rounded-xl flex w-80 overflow-hidden max-md:w-full">
            {tabList.map((tab, index) => {
              return (
                <Tab
                  key={index}
                  className={cn(
                    "border-r border-border flex justify-center items-center gap-x-3 w-full p-2 duration-200 ease-in-out hover:bg-hover last:border-none max-sm:text-sm",
                    activeTabIndex === index ? "bg-hover" : ""
                  )}
                >
                  {tab}
                </Tab>
              );
            })}
          </Tab.List>
        </div>
        <Tab.Panels>
          <Tab.Panel>
            <div className="flex flex-col">
              <div className="bg-hover rounded-xl grid grid-cols-[1fr_1fr]">
                <div className="py-3 px-4 max-sm:text-sm">Name</div>
                <div className="py-3 px-4 max-sm:text-sm">Character</div>
              </div>
              {cast?.map(({ id, name, character }, index) => {
                return (
                  <div
                    key={index}
                    className="border-b border-border grid grid-cols-[1fr_1fr] last:border-none"
                  >
                    <Link
                      href={`/person/${id}`}
                      className="py-3 px-4 hover:underline max-sm:text-sm"
                    >
                      {name}
                    </Link>
                    <div className="py-3 px-4 max-sm:text-sm">
                      {character ? character : "N/A"}
                    </div>
                  </div>
                );
              })}
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="flex flex-col">
              <div className="bg-hover rounded-xl grid grid-cols-[1fr_1fr]">
                <div className="py-3 px-4 max-sm:text-sm">Name</div>
                <div className="py-3 px-4 max-sm:text-sm">Job</div>
              </div>
              {crew?.map(({ id, name, job }, index) => {
                return (
                  <div
                    key={index}
                    className="border-b border-border grid grid-cols-[1fr_1fr] last:border-none"
                  >
                    <Link
                      href={`/person/${id}`}
                      className="py-3 px-4 hover:underline max-sm:text-sm"
                    >
                      {name}
                    </Link>
                    <div className="py-3 px-4 max-sm:text-sm">
                      {job ? job : "N/A"}
                    </div>
                  </div>
                );
              })}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
