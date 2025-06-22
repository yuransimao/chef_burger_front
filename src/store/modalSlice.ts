// store/modalSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isOpenDialog: boolean;
  isOpenAlert: boolean
}

const initialState: ModalState = {
  isOpenDialog: false,
   isOpenAlert: false,
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
   
  },
});

export const { openModalDialog, closeModalDialog,openModalAlert,closeModalAlert  } = modalSlice.actions;
export default modalSlice.reducer;
