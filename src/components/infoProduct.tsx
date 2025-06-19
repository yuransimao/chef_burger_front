import React from 'react'
import {Card, Separator, Button} from "./"
import { Info } from 'lucide-react';

function InfoProduct() {
  return (
    <div className="fixed  w-[20%] right-6 h-[84%] lg:block hidden bottom-2">
          <Card className="h-full p-4">
            <div className="flex justify-between">
              <h4 className="font-medium">Informação pedido</h4>
              <Info size={18} className="text-red-500"/>
            </div>
              <div className='h-[90%] overflow-y-scroll item_scroll'>

              </div>
            <div>
               <div className='space-y-2'>
                 <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>1000kz</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Descontos</span>
                      <span>0</span>
                    </div>
                    <Separator className="h-[0.5px]" />
                 
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span>Total</span>
                      <span>20</span>
                    </div>
               </div>
            </div>

            <div>
              <Button className="w-full cursor-pointer bg-red-500 text-white duration-300 transition-colors hover:bg-red-700 ">
                Finalizar pedido
              </Button>
            </div>
          </Card>
    </div>
  )
}

export  {InfoProduct}