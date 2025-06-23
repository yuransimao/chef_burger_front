
"use client"
import React from 'react'
import { Input } from "@/components"
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form"


interface InputContainerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
    title: string;
    icon: React.ReactNode;
    type: string;
    field: ControllerRenderProps<TFieldValues, TName>;
}

function InputContainer<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ title, icon, type, field }: InputContainerProps<TFieldValues, TName>) {
    return (
        <div>
            <div className="flex items-center border-2 rounded-lg px-4 focus-within:ring focus-within:ring-red-800 transition-colors duration-300 inset-shadow-sm">
                {icon}
                <Input 
                    placeholder={title} 
                    type={type} 
                    {...field} 
                    className="border-0 w-full rounded-none focus-visible:outline-none focus-visible:ring-0" 
                />
            </div>
        </div>
    )
}

export { InputContainer }