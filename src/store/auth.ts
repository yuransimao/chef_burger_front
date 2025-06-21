import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user_id: string | null;
    user_name: string | null;
    user_email: string | null;
    user_photo: string | null;
    user_phone: string | null;
    user_location: string | null;
    isLoggedIn: boolean;
    loading: boolean;
    error: string | null;
    token: string | null;
}

const initialState: AuthState = {
    user_id: null,
    user_name: null,
    user_email: null,
    user_photo: null,
    user_phone: null,
    user_location: null,
    isLoggedIn: false,
    loading: false,
    error: null,
    token: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_ACTIVE_USER: (state, action: PayloadAction<{ 
            id: string; 
            name: string; 
            email: string; 
            photo: string; 
            phone: string;
            location: string; 
            token?: string;
        }>) => {
            const { name, id, photo, email, phone, location, token } = action.payload;
            state.isLoggedIn = true;
            state.user_id = id;
            state.user_name = name;
            state.user_photo = photo;
            state.user_email = email;
            state.user_location = location;
            state.user_phone = phone;
            state.token = token || null;
            state.error = null;
        },
        SET_DESACTIVE_USER: (state) => {
            state.isLoggedIn = false;
            state.user_id = null;
            state.user_name = null;
            state.user_photo = null;
            state.user_email = null;
            state.user_location = null;
            state.user_phone = null;
            state.token = null;
            state.error = null;
        },
        SET_LOADING: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        SET_ERROR: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.loading = false;
        },
        CLEAR_ERROR: (state) => {
            state.error = null;
        },
        SET_TOKEN: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        }
    },
});

export const { 
    SET_ACTIVE_USER, 
    SET_DESACTIVE_USER, 
    SET_LOADING, 
    SET_ERROR, 
    CLEAR_ERROR,
    SET_TOKEN 
} = authSlice.actions;

export default authSlice.reducer;




