import React from 'react'
import { Avatar, AvatarFallback, AvatarImage} from "./ui"
import { LogIn } from 'lucide-react';
import Link from 'next/link';
function BtnSignIn() {

    const userr_active =false;

    return userr_active ? (
        <button 
        className={`flex items-center gap-3 bg-card p-3 duration-300
        rounded-sm shadow cursor-pointer hover:brightness-100`}>

            <Avatar className='w-6 h-6'>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

          <span className="text-sm font-semibold text-zinc-200">
            Yuran Simao
        </span>
            
        </button>
    ):(
        <Link href="/login" 
        className={`flex gap-4 bg-red-600 text-white rounde-sm px-9 duration-300 
        hover:bg-red-700 cursor-pointer`}>
            <span>Entrar</span>
            <LogIn size={18}/>
        </Link>
    );
}

export { BtnSignIn }