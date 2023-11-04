import Image from "next/image";

import { Loading } from "../ui/loading";

import { useGetVideosQuery } from "@/redux/services/injections/mediaApi";
import { useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/features/modal";

export const Videos = ({ id }: { id: number }) => {
  const dispatch = useAppDispatch();
  const { data: videos, isLoading } = useGetVideosQuery(id, { skip: !id });

  const handleOpenModal = (key: string) => {
    dispatch(
      openModal({
        open: true,
        title: "Video",
        type: "videoModal",
        data: {
          key,
        },
      })
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  if (videos?.results.length === 0) {
    return (
      <div className="text-lg font-[500] text-center flex justify-center items-center h-[25vh]">
        No videos
      </div>
    );
  }

  if (videos) {
    return (
      <div className="grid gap-5 grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {videos?.results.map(({ id, key, name, type }) => {
          const src = `https://img.youtube.com/vi/${key}/maxresdefault.jpg`;

          return (
            <div key={id} className="flex flex-col gap-y-2">
              <figure
                className="bg-hover rounded-md cursor-pointer min-w-[100px] relative overflow-hidden before:content-[''] before:block before:pt-[60%]"
                onClick={() => handleOpenModal(key)}
              >
                <Image
                  src={src}
                  width={1280}
                  height={720}
                  alt={name}
                  className="absolute top-0 left-0 w-full h-full object-cover transition-opacity opacity-0 duration-500"
                  onLoadingComplete={(img) => img.classList.remove("opacity-0")}
                />
              </figure>
              <div className="truncate max-sm:text-sm">{type}</div>
            </div>
          );
        })}
      </div>
    );
  }
};
