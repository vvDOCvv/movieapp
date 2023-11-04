import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";

export const ImageModal = () => {
  const {
    modal: { data },
  } = useAppSelector((state) => state.modal);
  const filePath = data.file_path;

  return (
    <div className="bg-hover relative overflow-hidden before:content-[''] before:block before:pt-[58%]">
      <Image
        src={"https://image.tmdb.org/t/p/original" + filePath}
        width={1920}
        height={1080}
        alt=""
        priority={true}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
    </div>
  );
};
