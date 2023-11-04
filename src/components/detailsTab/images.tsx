import Image from "next/image";

import { Loading } from "../ui/loading";

import { useGetImagesQuery } from "@/redux/services/injections/mediaApi";
import { useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/features/modal";

type Props = {
  id: number;
};

export const Images = ({ id }: Props) => {
  const dispatch = useAppDispatch();
  const { data: images, isLoading } = useGetImagesQuery(id, { skip: !id });

  const handleOpenModal = (file_path: string) => {
    dispatch(
      openModal({
        open: true,
        title: "Image",
        type: "imageModal",
        data: {
          file_path,
        },
      })
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  if (images?.backdrops.length === 0) {
    return (
      <div className="text-lg font-[500] text-center flex justify-center items-center h-[25vh]">
        No images
      </div>
    );
  }

  if (images) {
    return (
      <div className="grid gap-5 grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {images.backdrops.map(({ file_path }, index) => {
          return (
            <figure
              key={index}
              className="bg-hover rounded-md cursor-pointer min-w-[100px] relative overflow-hidden before:content-[''] before:block before:pt-[60%]"
              onClick={() => handleOpenModal(file_path)}
            >
              <Image
                src={"https://image.tmdb.org/t/p/w780" + file_path}
                width={780}
                height={439}
                alt=""
                loading="lazy"
                className="absolute top-0 left-0 w-full h-full object-cover transition-opacity opacity-0 duration-500"
                onLoadingComplete={(img) => img.classList.remove("opacity-0")}
              />
            </figure>
          );
        })}
      </div>
    );
  }
};
