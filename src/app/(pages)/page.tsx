import { PromoBanner, ProdutosList } from "@/components";
import Image  from "next/image";
import Head from "next/head"
export default function Home() {
  return (
    <>
    <Head>
    <title>Menu | Chef Burger</title>
    </Head>
    <main>
      <section className=" w-full">
       
          <div>
            <PromoBanner
              src="/promo-banner-01.png"
              alt="Até 30% de desconto em pizzas!"
            />
          </div>
          <div className="pt-6 space-y-4">
            <h2 className="font-semibold">Escolhe uma categoria</h2>
            <div className="flex">
              <div className="flex flex-col items-center justifify-center gap-2 bg-card p-4 rounded-sm hover:bg-red-700/20 cursor-pointer ">
                <Image
                width={30}
                height={30}
                src="https://utfs.io/f/92918634-fc03-4425-bc1f-d1fbc8933586-vzk6us.png"
                alt="ham"/>
                <span className="text-sm font-semibold">Hamburger</span>
              </div>
            </div>
            <div className="pt-2 space-y-4">
              <h3 className="font-semibold">Menu</h3>
            <ProdutosList/>
            </div>
          </div>
      
      </section>
    </main>
    </>
  );
}
