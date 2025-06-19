'use client'

import React from 'react'
import { Card } from '../ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpenText, BookCheck, NotebookPen } from 'lucide-react'
import clsx from 'clsx'

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
    },
    {
      href: '/reservas',
      icon: <NotebookPen size={18} />,
      title: 'Fazer Reserva',
    },
  ]

  return (
    <div className='w-full lg:w-56 fixed bg-card bottom-0 lg:h-svh z-30'>
      <Card className='lg:h-full rounded-tl-none rounded-bl-none '>
        <div className='flex flex-col items-center justify-center py-8 space-y-16'>
          <h2 className="lg:inline-block hidden">Logo</h2>

          <nav className=' lg:space-y-6  flex lg:flex-col flex-row'>
            {itemNav.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <Link
                  href={item.href}
                  key={index}
                  className={clsx(
                    'flex items-center gap-3 lg:px-6  px-3 py-3 rounded-sm transition-colors w-full',
                    isActive
                      ? '!bg-red-500/5 text-primary font-semibold'
                      : 'text-muted-foreground hover:!bg-red-500/5 hover:text-primary'
                  )}
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </Card>
    </div>
  )
}

export { Sidebar }
