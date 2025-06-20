'use client';
import { useState } from 'react';
import { useProdutos } from '@/hooks/useProdutos';
import { ProductItem, RenderPagination} from "./"

export function ProdutosList() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
 

  

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  } = useProdutos({
    page,
    limit,
    
  });

 
  if (isError) {
    return (
      <div className="text-red-500 text-center p-4">
        Erro ao carregar produtos: {error?.message}
      </div>
    );
  }

  
  return (
    <div className="container mx-auto py-4">
    

     
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.data?.map((produto,index) => <ProductItem {...produto} key={index}/>)}
          </div>

         
          {<RenderPagination data={data} setPage={setPage}/>}
        </>
      )}
    </div>
  );
}