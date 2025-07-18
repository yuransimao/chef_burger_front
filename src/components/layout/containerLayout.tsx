"use client";
import React  from 'react'
import { usePathname } from 'next/navigation'
import { Header } from '../header'
import { Sidebar } from '../sidebar/sidebar'
import { InfoProduct } from '../infoProduct';


interface ContainerLayoutProps {
    children: React.ReactNode
}


function ContainerLayout({children}: ContainerLayoutProps) {

  const pathName = usePathname();
  const showHeaderSignin =  !['/login', '/signup'].includes(pathName);
  const showInfoProduct =['/','/search','pedidos'].includes(pathName)
  const widthLogin = showHeaderSignin == false ? "w-full" : "w-full lg:w-[calc(100%-14rem)] "

  
  
    
  return (
    <div>
       {showHeaderSignin && (
        <>
        <Header/>
       <Sidebar/>
        </>
       )}
        <div className={`${showInfoProduct ? "lg:w-[calc(100%-20%-16rem)] w-full" : widthLogin}  relative    ${showHeaderSignin && 'lg:left-56 pt-24 lg:pb-24 pb-32 px-8'}`} >
          {children}
        </div>
        <div className="relative ">{showInfoProduct && <InfoProduct/>}</div>

    </div>
  )
}

export  {ContainerLayout}