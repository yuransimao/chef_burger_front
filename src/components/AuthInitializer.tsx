'use client'
import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'

export function AuthInitializer() {
  const { initializeAuthListener } = useAuth()

  useEffect(() => {
    const unsubscribe = initializeAuthListener();
    return () => unsubscribe?.();
  }, [initializeAuthListener]);

  return null;
}
