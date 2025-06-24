
import {Searchs} from "./_components/searchs"
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Pesquisa | Chef Burguer",
  description: "Aproveite o melhor do nosso cardápio.",
};
export default function Search() {
    
  
 
  return (
    <div className="space-y-4 h-svh">
       <Searchs/>
    </div>
  )
}
