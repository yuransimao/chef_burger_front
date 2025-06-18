import React  from 'react'
import { Header } from '../header'
interface ContainerLayoutProps {
    children: React.ReactNode
}
function ContainerLayout({children}: ContainerLayoutProps) {
  return (
    <div>
       <Header/>
        {children}
    </div>
  )
}

export  {ContainerLayout}