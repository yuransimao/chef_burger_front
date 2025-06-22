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
import { useAppSelector, useAppDispatch } from "@/hooks"
import { closeModalAlert } from "@/store/modalSlice"

function AlertUserDesative() {
  const dispatch= useAppDispatch();
  const isOpenAlert = useAppSelector(state => state.modal.isOpenAlert)
  const router = useRouter();

  const handleRedirectToLogin = () => {
    dispatch(closeModalAlert())
    router.push('/login'); 
  };

  return (
    <AlertDialog onOpenChange={(open) => {if (!open)  dispatch(closeModalAlert())}} open={isOpenAlert}>
      <AlertDialogTrigger></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Login necessário</AlertDialogTitle>
          <AlertDialogDescription>
            Você precisa estar logado para adicionar um produto ao carrinho e fazer reserva. Faça login para continuar com o pedido.
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