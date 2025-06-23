import Image from "next/image";
import { useCategoriasAtivas } from "@/hooks/useCategoriasAtivas";
import { Categoria } from "@/interface/categoria.interface";

interface CategoriasListProps {
  onCategoriaSelect?: (categoria: Categoria) => void;
  onVerTodos?: () => void;
  categoriaSelecionada?: number | null;
  mostrarVerTodos?: boolean;
}

export const CategoriasList = ({ 
  onCategoriaSelect, 
  onVerTodos,
  categoriaSelecionada,
  mostrarVerTodos = true
}: CategoriasListProps) => {
  const { data: categorias, isLoading, error } = useCategoriasAtivas();

  if (isLoading) {
    return (
      <div className="flex gap-4">
        {[...Array(4)].map((_, index) => (
          <div 
            key={index}
            className="flex flex-col items-center justify-center gap-2 bg-card p-4 rounded-sm animate-pulse"
          >
            <div className="w-[30px] h-[30px] bg-gray-300 rounded" />
            <div className="w-16 h-4 bg-gray-300 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-sm">
        Erro ao carregar categorias
      </div>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-auto">
     
      {mostrarVerTodos && (
        <div
          onClick={onVerTodos}
          className={`
            flex flex-col items-center justify-center gap-2 bg-card p-4 rounded-sm cursor-pointer transition-colors min-w-[80px]
            ${categoriaSelecionada === null 
              ? 'bg-red-700/30' 
              : 'hover:bg-red-700/20'
            }
          `}
        >
          <div className="w-[30px] h-[30px] flex items-center justify-center bg-gray-200 rounded-full">
            <span className="text-sm">🍽️</span>
          </div>
          <span className="text-sm font-semibold text-center">
            Todos
          </span>
        </div>
      )}

      {/* Lista de categorias */}
      {categorias?.map((categoria) => (
        <div
          key={categoria.id}
          onClick={() => onCategoriaSelect?.(categoria)}
          className={`
            flex flex-col items-center justify-center gap-2 bg-card p-4 rounded-sm cursor-pointer transition-colors min-w-[80px]
            ${categoriaSelecionada === categoria.id 
              ? 'bg-red-700/30' 
              : 'hover:bg-red-700/20'
            }
          `}
        >
          <Image
            width={30}
            height={30}
            src={categoria.imageUrl}
            alt={categoria.nome}
            className="object-contain"
          />
          <span className="text-sm font-semibold text-center">
            {categoria.nome}
          </span>
        </div>
      ))}
    </div>
  );
};