import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AuthState {
    user_id: string | null;
    user_name: string | null;
    user_email: string | null;
    user_photo: string | null;
    user_dateBirth:string | null;
    user_bi:string | null;
    user_phone: string | null;
    user_contactEmeg: string | null;
    user_contactoAltEmerg: string | null;
    user_location: string | null;
    isLoggedIn: boolean;
}


const initialState: AuthState = {
    user_id: null,
    user_name: null,
    user_email: null,
    user_photo: null,
    user_dateBirth:null,
    user_bi:null,
    user_phone: null,
    user_contactEmeg:null,
    user_contactoAltEmerg: null,
    user_location: null,
    isLoggedIn: false,
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_ACTIVE_USER: (state, action: PayloadAction<{ id: string; name: string; email: string; photo: string; phone:string; ContactEmeg:string; DateBirth:string;location:string; bi:string; contactoAltEmerg:string  }>) => {
            const { name, id, photo, email,phone, ContactEmeg, DateBirth,location, bi, contactoAltEmerg } = action.payload;
            state.isLoggedIn = true;
            state.user_id = id;
            state.user_name = name;
            state.user_photo = photo;
            state.user_email = email;
            state.user_bi = bi;
            state.user_dateBirth= DateBirth;
            state.user_location = location;
            state.user_phone = phone;
            state.user_contactoAltEmerg = contactoAltEmerg;
            state.user_contactEmeg = ContactEmeg;
        },
        SET_DESACTIVE_USER: (state) => {
            state.isLoggedIn = false;
            state.user_id = null;
            state.user_name = null;
            state.user_photo = null;
            state.user_email = null;
            state.user_bi = null;
            state.user_dateBirth= null;
            state.user_location = null;
            state.user_phone = null;
            state.user_contactoAltEmerg = null;
            state.user_contactEmeg = null;
        },
    },
});


export const { SET_ACTIVE_USER, SET_DESACTIVE_USER } = authSlice.actions;


interface RootState {
    auth: AuthState;
}


export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectUserName = (state: RootState) => state.auth.user_name;
export const selectUserEmail = (state: RootState) => state.auth.user_email;
export const selectUserId = (state: RootState) => state.auth.user_id;
export const selectUserPhoto = (state: RootState) => state.auth.user_photo;
export const selectUserDateBirth = (state: RootState) => state.auth.user_dateBirth;
export const selectUserBi = (state: RootState) => state.auth.user_bi;
export const selectUserPhone = (state: RootState) => state.auth.user_phone;
export const selectUserContactEmeg = (state: RootState) => state.auth.user_contactEmeg;
export const selectUserContactoAltEmerg = (state: RootState) => state.auth.user_contactoAltEmerg;
export const selectUserLocation = (state: RootState) => state.auth.user_location;
export default authSlice.reducer;