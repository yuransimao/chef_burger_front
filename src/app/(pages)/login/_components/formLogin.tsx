'use client'
import React,{useEffect} from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form,FormControl,FormField,FormItem,FormMessage, InputContainer} from "@/components"
import { Mail, Lock,Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'
const formSchema = z.object({
  email: z.string({
      required_error: "O email é obrigatorio",
      message: "O email é obrigatorio"
    }).email({
      message: "Insira um endereço de email válido", 
    }),
    password: z.string().min(8,{
      message: "Senha deve ter pelo menos 8 caracteres",
    }).max(20,{ message: "Senha deve ter pelo menos 20 caracte"}),
})

function FormLogin() {
   const router = useRouter();
  const { loading, error, login, clearError } = useAuth();
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await login(values);
      
      toast.success('Login realizado com sucesso!');
      router.push('/');
      
    } catch (error:unknown) {
      console.error('Erro ao fazer login:', error);
    }
  }
  return (
   
         <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
                
                <InputContainer icon={<Mail size={20}/>} 
                title="Email" field={field} type={'email'}/>
              </FormControl>
              
              <FormMessage className='text-xs'/>
            </FormItem>
          )}
        />

       
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
                
                <InputContainer icon={<Lock size={20}/>} 
                title="Password" field={field} type="password"/>
              </FormControl>
              
              <FormMessage className='text-xs'/>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-red-500 text-white duration-300 transition-colors hover:bg-700 cursor-pointer">
         {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
        </Button>
      </form>
    </Form>
    
  )
}

export {FormLogin}