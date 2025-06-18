import React from 'react'
import { Card, FormSearch } from './'
import { BtnSignIn } from './btnSignIn';
function Header() {
    return (
        <header className='w-full lg:w-[calc(100%-14rem)] fixed  right-0 z-30'>
            <Card className='rounded-none bg-background border-0 shadow-none'>
                <div className=" h-10 flex items-center justify-between px-8 w-full">
                    <FormSearch />

                    <BtnSignIn />

                </div>
            </Card>
        </header>
    )
}

export { Header }