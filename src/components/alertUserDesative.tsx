import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui"
import { useRouter } from 'next/navigation';
interface AlertUserDesativeProps{
    isOpen: boolean
    setOpen: (open: boolean) => void
}
function AlertUserDesative({ setOpen, isOpen }: AlertUserDesativeProps) {
  const router = useRouter();

  const handleRedirectToLogin = () => {
    setOpen(false);
    router.push('/login'); 
  };

  return (
    <AlertDialog onOpenChange={(open) => setOpen(open)} open={isOpen}>
      <AlertDialogTrigger></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Login necessário</AlertDialogTitle>
          <AlertDialogDescription>
            Você precisa estar logado para adicionar um produto ao carrinho. Faça login para continuar com o pedido.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Fechar</AlertDialogCancel>
          <AlertDialogAction onClick={handleRedirectToLogin}>
            Ir para login
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export {AlertUserDesative}