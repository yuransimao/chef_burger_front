'use client'

import React, { useRef } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { makeStore } from './store'
import { persistStore } from 'redux-persist'

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<ReturnType<typeof makeStore> | null>(null)
  const persistorRef = useRef<ReturnType<typeof persistStore> | null>(null)

  if (!storeRef.current) {
    const store = makeStore()
    storeRef.current = store
    persistorRef.current = persistStore(store)
  }

  return (
    <Provider store={storeRef.current}>
    {persistorRef.current && (
      <PersistGate loading={null} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    )}
  </Provider>
  )
}
