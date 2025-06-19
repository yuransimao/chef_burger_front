'use client';
import { useState } from 'react';
import { useProdutos } from '@/hooks/useProdutos';
import {Button, ProductItem} from "./"

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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    if (!data?.pagination) return null;

    const { pagination } = data;
    const pages = [];

    // Primeira página
    if (pagination.page > 3) {
      pages.push(1);
      if (pagination.page > 4) pages.push('...');
    }

    // Páginas adjacentes
    for (
      let i = Math.max(1, pagination.page - 2);
      i <= Math.min(pagination.totalPages, pagination.page + 2);
      i++
    ) {
      pages.push(i);
    }

    // Última página
    if (pagination.page < pagination.totalPages - 2) {
      if (pagination.page < pagination.totalPages - 3) pages.push('...');
      pages.push(pagination.totalPages);
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        <Button
          variant="outline"
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={!pagination.hasPrev}
          className=""
        >
          Anterior
        </Button>

        {pages.map((pageItem, index) => (
          <Button
            variant={pageItem === pagination.page ? "default" : "secondary"}
            key={index}
            onClick={() => typeof pageItem === 'number' && handlePageChange(pageItem)}
            disabled={typeof pageItem !== 'number'}
            className={`px-3 py-2 rounded ${
              pageItem === pagination.page
                && 'bg-red-500 hover:bg-red-600 text-white'
                
            } ${typeof pageItem !== 'number' ? 'cursor-default' : ''}`}
          >
            {pageItem}
          </Button>
        ))}

        <Button
          onClick={() => handlePageChange(pagination.page + 1)}
          disabled={!pagination.hasNext}
          className="px-3 py-2 rounded bg-red-500 hover:bg-red-600 text-white disabled:bg-red-600 disabled:text-white"
        >
          Próximo
        </Button>
      </div>
    );
  };

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

         
          {renderPagination()}
        </>
      )}
    </div>
  );
}