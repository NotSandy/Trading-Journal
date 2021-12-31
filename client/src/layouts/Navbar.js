import React from 'react'
import { BsGrid1X2Fill, BsArrowLeftRight } from "react-icons/bs";
import NavbarItem from './NavbarItem';

const Navbar = () => {
    return (
        <div className='fixed top-0 left-0 flex flex-col w-16 h-screen shadow bg-dark-bg-100'>
            <div className='relative flex items-center justify-center w-16 h-16 mx-auto'>
                <i>LOGO</i>
            </div>
            <NavbarItem icon={<BsGrid1X2Fill/>}/>
            <NavbarItem icon={<BsArrowLeftRight/>}/>
        </div>
    )
}

export default Navbar
