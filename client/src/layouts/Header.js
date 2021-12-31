import React from 'react'
import { BsSearch, BsBell, BsFlag, BsPersonCircle } from "react-icons/bs";

const Header = () => {
    return (
        <header className='fixed top-0 right-0 h-16 shadow bg-dark-bg-200 left-16'>
            <div className='pr-4'>
                <div className='flex items-center justify-between h-16'>
                    <div className='flex'>
                        <form className='pl-4'>
                            <div className='relative'>
                                <input className='h-8 pl-10 pr-8 rounded-full outline-none bg-dark-bg-100' type='text' placeholder='Search...'></input>
                                <span className='absolute top-0 flex items-center h-8 text-xl left-2'><BsSearch/></span>
                            </div>
                        </form>
                    </div>
                    <div className='flex'>
                        <div className='px-4'>
                        <span className='flex items-center h-8 text-2xl'><BsFlag/></span>
                        </div>
                        <div className='px-4'>
                            <span className='flex items-center h-8 text-2xl'><BsBell/></span>
                        </div>
                        <div className='pl-4'>
                            <span className='flex items-center h-8 text-2xl'><BsPersonCircle/></span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
