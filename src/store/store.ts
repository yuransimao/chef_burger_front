import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import { createWrapper } from 'next-redux-wrapper'
import ModalReducer from "./modalSlice"
import AuthReducer from './auth'
import CarrinhoReducer from './carrinho'

const rootReducer = combineReducers({
  auth: AuthReducer,
  carrinho: CarrinhoReducer,
  modal: ModalReducer
})


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['carrinho'], 
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, 
      }),
  })
}

export const store = makeStore()
export const persistor = persistStore(store)

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore)