'use client'

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form,FormControl,FormField,FormItem,FormMessage, InputContainer} from "@/components"
import { Mail, Lock, Phone,MapPinned,Loader2  } from 'lucide-react';
import { CreateUserData } from '@/services/authService';
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
    endereco: z.string()
    .min(5, { message: "Endereço deve ter no mínimo 5 caracteres" })
    .max(100, { message: "Endereço muito longo" }),
    phone: z.string()
    .regex(/^(\+244\s?)?9\d{8}$/, {
      message: "Número de telefone inválido (ex: +244 923456789 ou 923456789)"
    })
})

function FormSignup() {
  const router = useRouter();
  const { register, loading, clearError } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema)
    })
  
   async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
     
      clearError();
      
     
      const userData: CreateUserData = {
        email: values.email,
        password: values.password,
        phone: values.phone,
        endereco: values.endereco,
       
        nome: values.email.split('@')[0] 
      };

     
      await register(userData);
      
      
     
      
     toast.success('Conta criada com sucesso!');
      form.reset();
      router.push('/');
      
    } catch (error) {
      console.error('Erro no registro:', error);
     
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
         <div className='flex items-center gap-2'>
          <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
                
                <InputContainer icon={<Phone size={20}/>} 
                title="Telefone" field={field} type="number"/>
              </FormControl>
              
              <FormMessage className='text-xs'/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endereco"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
                
                <InputContainer icon={<MapPinned size={20}/>} 
                title="Endereço" field={field} type="text"/>
              </FormControl>
              
              <FormMessage className='text-xs'/>
            </FormItem>
          )}
        />
        </div>
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
        <Button type="submit" className="w-full bg-red-500 text-white duration-300 transition-colors hover:bg-700">
          {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Criando conta...
              </>
            ) : (
              'Criar Conta'
            )}
        </Button>
      </form>
    </Form>
  )
}

export {FormSignup}