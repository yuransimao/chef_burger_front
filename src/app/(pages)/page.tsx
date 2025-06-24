"use client"
import { PromoBanner, ProdutosList, CategoriasList } from "@/components";
import { Categoria } from "@/interface/categoria.interface";
import { ProdutoFilters } from "@/interface/produto.interface";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);
  const [filters, setFilters] = useState<ProdutoFilters>({});

  const handleCategoriaSelect = (categoria: Categoria) => {
    setCategoriaSelecionada(categoria.id);
    setFilters({ categoriaId: categoria.id });
    console.log('Categoria selecionada:', categoria);
  };

  const handleVerTodos = () => {
    setCategoriaSelecionada(null);
    setFilters({});
    console.log('Mostrar todos os produtos');
  };

  return (
    <>
      <Head>
        <title>Menu | Chef Burger</title>
      </Head>
      <main>
        <section className="w-full">
          <div>
            <PromoBanner/>
          </div>
          <div className="pt-6 space-y-4">
              <h2 className="font-semibold">Escolhe uma categoria</h2>
            
            <CategoriasList 
              onCategoriaSelect={handleCategoriaSelect}
              onVerTodos={handleVerTodos}
              categoriaSelecionada={categoriaSelecionada}
            />
            <div className="pt-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Menu</h3>
                {categoriaSelecionada && (
                  <span className="text-sm text-gray-500">
                    Filtrado por categoria
                  </span>
                )}
              </div>
              <ProdutosList filters={filters} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}