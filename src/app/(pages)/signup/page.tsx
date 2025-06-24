import React from 'react'
import type { Metadata } from "next";
import Image from "next/image";
import { Separator, Button, Toaster } from "@/components"
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link'
import { FormSignup } from './_components/formSignup';


export const metadata: Metadata = {
  title: "Registrar-se | Chef Burguer",
  description: "Crie sua conta e aproveite o melhor do nosso cardápio.",
};
function Signup() {
    return (
        <>
        
        <div className="h-svh flex ">
            <Toaster/>
            <div className="w-[70%] h-full brightness-50 lg:block md:blok sm:block hidden">
                <Image
                    height={0}
                    width={0}
                    className="max-h-full w-full object-contain"
                    sizes="100%"
                    quality={100}
                    src="/restaurantchef.jpg"
                    alt='logo'
                />
            </div>
            <div className='lg:w-[30%] md:w-[w-[30%] sm:w-[30%] w-full'>
                <div className="w-full space-y-5 flex flex-col justify-center px-8 h-full">
                    <div className='h-16'>
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
                        <h2 className=' font-bold text-lg text-center'>Registra-se</h2>
                        <p className=" text-sm  text-gray-300 text-center">Já possui uma conta ?
                            <Link
                                href='/login'
                                className="text-blue-500 font-bold ml-2 " >
                               Entrar
                            </Link>
                        </p>
                    </div>

                    <div>
                        <FormSignup />
                    </div>

                    <div className="flex items-center justify-center gap-2">
                        <div className="w-1/2">
                            <Separator className='w-full' />
                        </div>
                        <span className='text-zinc-300'>ou</span>
                        <div className="w-1/2">
                            <Separator className='w-full' />
                        </div>
                    </div>

                    <div className="w-full">
                        <Button variant="secondary" className='w-full'>
                            <FcGoogle size={20} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Signup