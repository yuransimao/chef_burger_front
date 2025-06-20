import React, { useCallback, useMemo } from 'react';
import Image from "next/image";
import { Produto } from "@/interface/produto.interface";
import { useAppDispatch } from "@/hooks/redux";
import { SquarePlus } from 'lucide-react';
import { FormatCurrency } from "@/helps/formatCurrency";
import { adicionarAoCarrinho } from "@/store/carrinho";

const ProductItem = React.memo(function ProductItem({
  nome,
  descricao,
  disponivel,
  id,
  imageUrl,
  preco
}: Produto) {
  const dispatch = useAppDispatch();

 
  const produto = useMemo(() => ({
    id,
    nome,
    descricao,
    disponivel,
    imageUrl,
    preco
  }), [id, nome, descricao, disponivel, imageUrl, preco]);

 
  const adicionarProduto = useCallback(() => {
    dispatch(adicionarAoCarrinho({ produto, quantidade: 1 }));
  }, [dispatch, produto]);

  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <div className='relative'>
        <div className="h-36 rounded-lg overflow-hidden">
          <Image
            height={0}
            width={0}
            src={imageUrl}
            alt={nome}
            className="h-full w-full object-cover"
            sizes="100%"
            quality={100}
            loading="lazy"
          />
        </div>
        {/*<span
          className={`inline-block px-1 py-1 rounded text-xs absolute top-1 left-1 ${
            disponivel ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {disponivel ? 'Disponível' : 'Indisponível'}
        </span>*/}
      </div>
      <div className='space-y-2 pt-4'>
        <h3 className="font-semibold text-sm">{nome}</h3>
        <p className="text-gray-300 text-xs truncate">{descricao}</p>

        <div className='flex justify-between items-center mt-4'>
          <span className='text-sm font-bold'>{FormatCurrency(preco)}</span>
          <button
            onClick={adicionarProduto}
            className="bg-red-500 p-2 rounded transition-colors duration-300 hover:bg-red-700"
          >
            <SquarePlus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
});

export { ProductItem };
