import React from 'react'
import Image from "next/image"
function LogoImage() {
  return (
    <div className='h-14 lg:block hidden'>
         <Image
            height={0}
            width={0}
            className="max-h-full w-full object-contain"
            sizes="100%"
            quality={100}
            src="/chefburger.png"
            alt='logo'
            />
    </div>
  )
}

export {LogoImage}