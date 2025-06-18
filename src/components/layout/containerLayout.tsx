import React  from 'react'
import { Header } from '../header'
import { Sidebar } from '../sidebar/sidebar'
interface ContainerLayoutProps {
    children: React.ReactNode
}
function ContainerLayout({children}: ContainerLayoutProps) {
  return (
    <div>
       <Header/>
       <Sidebar/>
        <div className=' w-full lg:w-[calc(100%-14rem)] relative lg:left-56  py-32 px-8 ' >
          {children}
        </div>
    </div>
  )
}

export  {ContainerLayout}