import React from 'react'
import {Card} from "./"
import { Info } from 'lucide-react';

function InfoProduct() {
  return (
    <div className="fixed  w-[20%] right-6 h-[84%] lg:block hidden bottom-2">
          <Card className="h-full p-4">
            <div className="flex justify-between">
              <h4 className="font-medium">Informação pedido</h4>
              <Info size={18} className="text-red-500"/>
            </div>
          </Card>
    </div>
  )
}

export  {InfoProduct}