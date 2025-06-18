'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
export default function Search() {
    const searchParams = useSearchParams()
  const query = searchParams.get('query')
  return (
    <div>
        Você pesquisou por: {query}
    </div>
  )
}
