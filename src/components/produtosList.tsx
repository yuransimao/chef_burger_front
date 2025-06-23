'use client';
import { useState, useEffect } from 'react';
import { useProdutos } from '@/hooks/useProdutos';
import { ProductItem, RenderPagination} from "./";
import { ProdutoFilters } from '@/interface/produto.interface';

interface ProdutosListProps {
  filters?: ProdutoFilters;
}

export function ProdutosList({ filters = {} }: ProdutosListProps) {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  
  useEffect(() => {
    setPage(1);
  }, [filters]);

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  } = useProdutos({
    page,
    limit,
    filters,
  });

  if (isError) {
    return (
      <div className="text-red-500 text-center p-4">
        Erro ao carregar produtos: {error?.message}
      </div>
    );
  }

  return (
    <div className="container lg:mx-auto md:mx-auto py-4">
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
          {/* Mostrar mensagem se não há produtos */}
          {(!data?.data || data.data.length === 0) ? (
            <div className="text-center p-8 text-gray-500">
              Nenhum produto encontrado para esta categoria.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {data.data.map((produto) => (
                  <ProductItem {...produto} key={produto.id} />
                ))}
              </div>

              {/* Paginação */}
              <RenderPagination data={data} setPage={setPage} />
            </>
          )}
        </>
      )}
    </div>
  );
}