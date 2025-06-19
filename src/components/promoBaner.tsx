import Image, { ImageProps } from "next/image";

function  PromoBanner (props: ImageProps){
    return (
    <Image
      height={0}
      width={0}
      className="h-auto w-full object-contain"
      sizes="100%"
      quality={100}
      {...props}
    />
  );
}

export { PromoBanner}