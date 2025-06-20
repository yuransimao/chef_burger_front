
'use client';
import { useState,useEffect } from 'react';
import { useProdutos } from '@/hooks/useProdutos';
import { ProductItem, RenderPagination} from "./"
import {  Frown} from 'lucide-react'
interface ProductListSearchProps{
    query: string | null
}
function ProductListSearch({query}:ProductListSearchProps) {
   const [page, setPage] = useState(1);
   const [filters, setFilters] = useState({ search: query || '' })
  const [limit] = useState(10);
 useEffect(() => {
    setFilters({ search: query || '' })
    setPage(1)
  }, [query])

  
  const { 
    data, 
    isLoading, 
    error, 
    isError ,
    isFetching
  } = useProdutos({
    page,
    limit,
    filters,
    options: {
      enabled: !!query 
    }
  })

  const productExist =(data?.data ?? []).length >= 1;

  
if (!query) {
    return (
      <div className="container mx-auto px-4 py-8">
       
        <p className="text-gray-600">Digite algo para pesquisar produtos.</p>
      </div>
    )
  }
 
  if (isError) {
    return (
      <div className="text-red-500 text-center p-4">
        Erro ao carregar produtos: {error?.message}
      </div>
    );
  }

  
  return (
    <div className="container mx-auto py-4 h-[80%] ">
    

     
      {/* Loading indicator */}
      {isFetching && (
        <div className="text-blue-500 text-center p-2">
          Carregando...
        </div>
      )}

      
      {isLoading ? (
        <div className="text-center p-8">Carregando produtos...</div>
      ) : (
        <>

        {!productExist && <div className="h-full w-full flex items-center justify-center flex-col gap-3">
            <p>Nenhum producto em contrado</p>
            <Frown size={20}/>
        </div>}

          { productExist && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.data?.map((produto,index) => <ProductItem {...produto} key={index}/>)}
          </div>}

         
          { productExist && <RenderPagination data={data} setPage={setPage}/>}
        </>
      )}
    </div>
  )
}

export  {ProductListSearch}