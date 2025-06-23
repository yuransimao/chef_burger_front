// store/modalSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isOpenDialog: boolean;
  isOpenAlert: boolean;
  isOpenSheet: boolean;
}

const initialState: ModalState = {
  isOpenDialog: false,
  isOpenAlert: false,
  isOpenSheet: false,
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
   
  },
});

export const { openModalDialog, closeModalDialog,openModalAlert,closeModalAlert,openModalSheet,closeModalSheet  } = modalSlice.actions;
export default modalSlice.reducer;
