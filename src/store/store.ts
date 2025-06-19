import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import AuthReducer from "./auth"
import CarrinhoReducer from "./carrinho"

const rootReducer = combineReducers({
    auth: AuthReducer,
    carrinho: CarrinhoReducer
})

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);