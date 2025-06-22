// store/modalSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isOpenDialog: boolean;
}

const initialState: ModalState = {
  isOpenDialog: false,
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
   
  },
});

export const { openModalDialog, closeModalDialog,  } = modalSlice.actions;
export default modalSlice.reducer;
