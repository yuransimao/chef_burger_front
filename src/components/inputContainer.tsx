"use client"
import React from 'react'
import { Input } from "@/components"

interface InputContainerProps{
    title: string;
    icon : React.ReactNode;
    type:string;
    field: any
}
function InputContainer({title, icon,type, field}:InputContainerProps) {
    return (
        <div>
            <div className="flex items-center border-2 rounded-lg  px-4 focus-within:ring focus-within:ring-red-800 transition-colors duration-300 inset-shadow-sm">
                {icon}
                <Input placeholder={title} type={type} {...field} className="border-0 w-full rounded-none focus-visible:outline-none focus-visible:ring-0" />
            </div>
        </div>
    )
}

export { InputContainer }