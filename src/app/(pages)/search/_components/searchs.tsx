"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductListSearch} from "@/components"
function Searchs() {
   const searchParams = useSearchParams()
    const query = searchParams.get('query')
  
 
  return (
    <div className="space-y-4 h-svh">
        <h2 className='text-sm font-medium'>Você pesquisou por:  
           <span className='ml-2 text-red-400 font-bold'>{query}
          </span></h2>

        <ProductListSearch query={query}/>
    </div>
  )
}

export {Searchs}