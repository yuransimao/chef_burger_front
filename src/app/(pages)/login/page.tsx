import React from 'react'
import {Card, Separator, Button, Toaster} from "@/components"

import { FcGoogle } from "react-icons/fc";
import { FormLogin } from './_components/formLogin'
import Link from 'next/link'
import Image from "next/image";
function Login() {
  return (
    <div className="w-full h-svh flex items-center justify-center">
      <Toaster/>
        <Card className=' w-full max-w-[400px] p-4 bg-[hsla(0,0%,100%,0.050980392156862744)] backdrop-blur-lg'>
            <div className="w-full space-y-5">
              <div className='h-24'>
                <Image
                height={0}
                width={0}
                className="max-h-full w-full object-contain"
                sizes="100%"
                quality={100}
               
                src="/chefburger.png"
                alt='logo'
                />

                
              </div>
                <div className='space-y-2'>
                  <h2 className='text-center font-bold text-lg'>Bem-vindo de volta</h2>
                  <p className="text-center text-sm  text-gray-300">Não possui uma conta ?
                    <Link 
                    href='/signup'
                    className="text-blue-500 font-bold ml-2 " > 
                    Cadastra-se
                    </Link>
                  </p>
                </div>

                <div>
                    <FormLogin/>
                </div>

                <div className="flex items-center justify-center gap-2">
                <div className="w-1/2">
                  <Separator className='w-full'/> 
                </div>
                <span className='text-zinc-300'>ou</span> 
                <div className="w-1/2">
                  <Separator className='w-full'/>
                </div>
                </div>

                <div>
                  <Button variant="secondary" className='w-full cursor-pointer'>
                      <FcGoogle size={20}/>
                  </Button>
                </div>
            </div>
        </Card>
    </div>
  )
}

export default Login