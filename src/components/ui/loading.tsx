import { cn } from "@/utils/cn";

export const Loading = ({ isFullPage = false }: { isFullPage?: boolean }) => {
  return (
    <div
      className={cn(
        "flex justify-center items-center",
        isFullPage ? "h-full max-lg:h-[calc(100vh-105px)]" : "h-[25vh]"
      )}
    >
      <div className="loader" />
    </div>
  );
};
