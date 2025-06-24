import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
 
} from "./ui"
function  PromoBanner (){
    return (
      <Carousel opts={{
    align: "start",
    loop: true,
  }}
  plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
  >
  <CarouselContent>
    <CarouselItem>
      <Image
      height={0}
      width={0}
      className="h-auto w-full object-contain"
      sizes="100%"
      quality={100}
      src="/BannerChefeburguer.png"
      alt="BannerChefeburguer"
    />
    </CarouselItem>
    <CarouselItem>
      <Image
      height={0}
      width={0}
      className="h-auto w-full object-contain"
      sizes="100%"
      quality={100}
      src="/ChefBurguerBanner2.png"
      alt="ChefBurguerBanner2"
    />
    </CarouselItem>
    </CarouselContent>
    </Carousel>
  );
}

export { PromoBanner}