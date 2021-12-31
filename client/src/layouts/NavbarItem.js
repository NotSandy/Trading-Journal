import React, { useState } from 'react'

const NavbarItem = ({ icon }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
  
    const toggling = () => setIsOpen(!isOpen);
  
    const onOptionClicked = value => () => {
      setIsOpen(false);
    };
    
    return (
    <div className='navbar-item group' onMouseEnter={toggling}>
        { icon }
        {isOpen && (
            <button className='absolute p-2 m-2 text-xs font-bold rounded-md shadow-md w-36 left-20 min-w-max' id='test'>
            daksdald
            </button>
        )}
    </div>
    )
}

export default NavbarItem
