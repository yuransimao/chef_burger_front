"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import {Form, FormControl, FormField, FormItem, FormMessage} from "./ui"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react';

const formSchema = z.object({
  search: z.string().min(0, {
    message: "",
  }),
})


function FormSearch() {

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: " ",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(`/search?query=${encodeURIComponent(values.search)}`)
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[85%]">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
                <div className="flex items-center border rounded-lg  px-4 focus-within:ring focus-within:ring-red-800 transition">
                  <Input
                    placeholder="Procurar"
                    className="px-4 py-6 border-0 w-full rounded-none focus-visible:outline-none focus-visible:ring-0"
                    {...field}
                  />
                  <button 
                  type="submit"
                  className="cursor-pointer text-red-400 hover:text-red-600" >
                    <Search size={18} />
                  </button>
                </div>
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

      </form>
    </Form>
  )
}

export { FormSearch }