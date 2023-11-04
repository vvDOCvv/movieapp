import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Modal = {
  open: boolean;
  title: string;
  type: string;
  data?: any;
};

type ModalState = {
  modal: Modal;
};

const initialState: ModalState = {
  modal: {
    open: false,
    title: "",
    type: "",
    data: null,
  },
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state: ModalState, action: PayloadAction<Modal>) {
      state.modal = action.payload;
    },
    closeModal(state: ModalState) {
      state.modal = { open: false, title: "", type: "", data: null };
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
