import React from 'react'
import { Card, FormSearch } from './'
import { BtnSignIn } from './btnSignIn';
function Header() {
    return (
        <header>
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