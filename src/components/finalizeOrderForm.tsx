import React,{useEffect} from 'react'
import {
    Button, Input, Form, FormControl, FormField, FormItem,
    FormLabel, FormMessage, Textarea,Toaster,Select,
        SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "./ui"
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMesasDisponiveis, useAppSelector, useAppDispatch,useCreatePedido } from '@/hooks'
import { CreatePedidoDto } from '@/interface/order.interface'
import {  limparCarrinho } from '@/store/carrinho'
import { Loader2 } from 'lucide-react'
const formSchema = z.object({
    
    table: z.string({
        required_error: "Selecione uma mesa.",
    }),
    numberperson: z.string({
        required_error: "Número de pessoas é obrigatório.",
    }),
    observacao: z.string()
        .min(10, 'Mínimo 10 caracteres')
        .max(100, "Máximo 100 caracteres")
        .optional()
});
function FinalizeOrderForm() {
    const { itens, total } = useAppSelector((state) => state.carrinho)
    const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema)
        });
    const { data: mesas, isLoading: isLoadingMesas, error: errorMesas } = useMesasDisponiveis();
    const dispatch = useAppDispatch()
    const createPedidoMutation = useCreatePedido()

        async function onSubmit(data: z.infer<typeof formSchema>){
            const pedidoData: CreatePedidoDto = {
                  total: Number(total),
                  itens: itens.map(item => ({
                    produtoId: item.produto.id,
                    quantidade: item.quantidade,
                    preco: Number(item.preco)
                  })),
                  observacoes:data.observacao || undefined,
                  mesaId:Number(data.table), 
                }
                try {
                      await createPedidoMutation.mutateAsync(pedidoData)
                      
                      dispatch(limparCarrinho())
                      
                      
                    } catch (error) {
                      console.error('Erro ao finalizar pedido:', error)
                      dispatch(limparCarrinho())
                      
                    }
         }

        const selectedMesaId = useWatch({ control: form.control, name: "table" });

    useEffect(() => {
     if (mesas && selectedMesaId) {
    const mesaSelecionada = mesas.find((mesa) => mesa.id.toString() === selectedMesaId);
    if (mesaSelecionada) {
      form.setValue("numberperson", mesaSelecionada.capacidade.toString());
    }
  }
}, [mesas, selectedMesaId, form]);
  return (
      <Form {...form}>
                <Toaster />
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="py-4 w-full space-y-5 h-full flex flex-col justify-center"
                >
                    
    
                    
                    <div className='flex items-center gap-4 w-full'>
                        <FormField
                            control={form.control}
                            name="table"
                            render={({ field }) => (
                                <FormItem className='w-1/2'>
                                    <FormLabel>Mesa</FormLabel>
                                    <FormControl>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        disabled={isLoadingMesas}
                                        
                                    >
                                        <SelectTrigger className="rounded w-full">
                                            <SelectValue
                                                placeholder={
                                                    isLoadingMesas
                                                        ? "Carregando mesas..."
                                                        : "Selecione uma mesa"
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {errorMesas ? (
                                                <SelectItem value="" disabled>
                                                    Erro ao carregar mesas
                                                </SelectItem>
                                            ) : mesas?.length === 0 ? (
                                                <SelectItem value="" disabled>
                                                    Nenhuma mesa disponível
                                                </SelectItem>
                                            ) : (
                                                mesas?.map((mesa) => (
                                                    <SelectItem
                                                        key={mesa.id}
                                                        value={mesa.id.toString()}
                                                    >
                                                        Mesa {mesa.numero} - {mesa.capacidade} pessoas
                                                    </SelectItem>
                                                ))
                                            )}
                                        </SelectContent>
                                    </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
    
                        <FormField
                            control={form.control}
                            name="numberperson"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel>Número de Pessoas</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Capacidade da mesa"
                                            {...field}
                                            className="rounded w-full"
                                            readOnly
                                            disabled
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
    
                    
                    <FormField
                        control={form.control}
                        name="observacao"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Observações</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Alguma observação especial para sua reserva..."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
    
                    {form.formState.errors.root && (
                        <div className="text-sm text-red-600">
                            {form.formState.errors.root.message}
                        </div>
                    )}
    
                    <Button
                        type="submit"
                        className="transition-colors bg-red-500 hover:bg-red-700"
                        disabled={isLoadingMesas || createPedidoMutation.isPending}               >
                        {createPedidoMutation.isPending ? (
                                <div className="flex items-center gap-2 ">
                                  <Loader2 size={16} className="animate-spin" />
                                  Concluindo...
                                </div>
                              ) : (
                                'Concluir o pedido'
                              )}
                    </Button>
                </form>
            </Form>
  )
}

export {FinalizeOrderForm}