"use client";

import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

import { ImageModal } from "../modals/imageModal";
import { VideoModal } from "../modals/videoModal";
import { IconButton } from "../ui/iconButton";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeModal } from "@/redux/features/modal";

const modals = {
  imageModal: <ImageModal />,
  videoModal: <VideoModal />,
};

export const Modal = () => {
  const dispatch = useAppDispatch();
  const {
    modal: { open, title, type },
  } = useAppSelector((state) => state.modal);

  const handleClose = () => dispatch(closeModal());

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      <div className="bg-black/80 fixed inset-0" aria-hidden="true" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-5">
        <Dialog.Panel className="bg-background border border-border rounded-xl w-full max-w-[900px] max-h-[600px] mx-auto overflow-hidden">
          <div className="flex justify-between items-center p-4">
            <Dialog.Title className="max-sm:text-sm">{title}</Dialog.Title>
            <IconButton icon={<X className="svg" />} onClick={handleClose} />
          </div>

          {type && modals[type as keyof typeof modals]}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
