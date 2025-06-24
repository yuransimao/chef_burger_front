'use client'

import React from 'react'
import { Card } from '../ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpenText, BookCheck } from 'lucide-react'
import clsx from 'clsx'
import { LogoImage } from '../logoImage'
import {BtnOpenSheetcarrinho} from "../btnopenSheetcarrinho"

function Sidebar() {
  const pathname = usePathname()

  const itemNav = [
    {
      href: '/',
      icon: <BookOpenText size={18} />,
      title: 'Menu',
    },
    {
      href: '/pedidos',
      icon: <BookCheck size={18} />,
      title: 'Pedidos',
    }
  ]

  return (
    <div className='w-full lg:w-56 fixed  lg:bottom-0 bottom-20 bg-transparent lg:h-svh z-30 h-10'>
      <Card className='lg:h-full rounded-tl-none rounded-bl-none rounded-tr-none rounded-br-none  lg:rounded-tr-lg lg:rounded-br-lg lg:bg-card bg-black'>
        <div className='flex flex-row lg:flex-col  items-center justify-center lg:space-y-16 lg:gap-0 gap-4 lg:px-0 px-4 '>
          <div className="inline-block "> 
            <Link href="/">
            
            <LogoImage/> 
            </Link>
          </div>

          <nav className=' lg:space-y-6  gap-x-4 flex items-center lg:flex-col flex-row w-full lg:w-auto '>
            {itemNav.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <Link
                  href={item.href}
                  key={index}
                  className={clsx(
                    'flex items-center flex-col lg:flex-row gap-3 lg:px-6  px-2 py-3 rounded-sm transition-colors w-full ',
                    isActive
                      ? 'lg:!bg-red-500/5 text-primary font-semibold'
                      : 'text-muted-foreground hover:!bg-red-500/5 hover:text-primary'
                  )}
                >
                  <span>{item.icon}</span>
                  <span className="whitespace-nowrap ">{item.title}</span>
                </Link>
              )
            })}

            <BtnOpenSheetcarrinho/>
          </nav>

          
        </div>
      </Card>
    </div>
  )
}

export { Sidebar }
