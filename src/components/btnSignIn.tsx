"use client"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage, DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,} from "./ui"
import { LogIn, Loader2  } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth'

function BtnSignIn() {
    const {user_id, user_name,logout, loading} = useAuth()
   

    return user_id ? (
        
        <DropdownMenu>
  <DropdownMenuTrigger>
    <button 
        className={`flex items-center gap-3 bg-card p-3 duration-300
        rounded-sm shadow cursor-pointer hover:brightness-100`}>
            {
              loading ? (
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saindo
                </>
              ):(
              <>
              <Avatar className='w-6 h-6'>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

          <span className="text-sm font-semibold text-zinc-200 lg:block md:blok hidden">
            {user_name}
        </span>
              </>
              )
            }
            
            
        </button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuLabel> 
      <Link href="/reservas" 
        className={` text-white rounde-sm   cursor-pointer`}>
           Minhas reservas
        </Link>
      </DropdownMenuLabel>
    <DropdownMenuSeparator />
    
    <DropdownMenuItem onClick={logout}>Sair</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
    ):(
        <Link href="/login" 
        className={`flex items-center gap-4 text-white rounde-sm   cursor-pointer`}>
            <span>Entrar</span>
            <LogIn size={18}/>
        </Link>
    );
}

export { BtnSignIn }
