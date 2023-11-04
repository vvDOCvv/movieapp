import { useAppSelector } from "@/redux/hooks";

export const VideoModal = () => {
  const {
    modal: { data },
  } = useAppSelector((state) => state.modal);
  const videoPath = data.key;

  return (
    <div className="bg-hover relative overflow-hidden before:content-[''] before:block before:pt-[50%]">
      <div className="absolute top-0 left-0 w-full h-full">
        <iframe
          title="frame"
          src={`https://www.youtube.com/embed/${videoPath}?autoplay=0&mute=1`}
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  );
};
