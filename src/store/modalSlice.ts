
import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isOpenDialog: boolean;
  isOpenAlert: boolean;
  isOpenSheet: boolean;
  isOpenOrderDialog: boolean
}

const initialState: ModalState = {
  isOpenDialog: false,
  isOpenAlert: false,
  isOpenSheet: false,
  isOpenOrderDialog: false
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModalDialog: (state) => {
      state.isOpenDialog = true;
    },
    closeModalDialog: (state) => {
      state.isOpenDialog = false;
    },
     openModalAlert: (state) => {
      state.isOpenAlert = true;
    },
    closeModalAlert: (state) => {
      state.isOpenAlert = false;
    },
    openModalSheet: (state) => {
      state.isOpenSheet = true;
    },
    closeModalSheet: (state) => {
      state.isOpenSheet = false;
    },
    openModalOrderDialog: (state) => {
      state.isOpenOrderDialog = true;
    },
    closeModalOrderDialog: (state) => {
      state.isOpenOrderDialog = false;
    },
   
  },
});

export const { openModalDialog, closeModalDialog,openModalAlert,
  closeModalAlert,openModalSheet,closeModalSheet,openModalOrderDialog, closeModalOrderDialog } = modalSlice.actions;
export default modalSlice.reducer;
