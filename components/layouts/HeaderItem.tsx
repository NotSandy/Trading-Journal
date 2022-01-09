import React from 'react'
import { NextPage } from "next";

interface Props {
    Icon: any;
  }

const HeaderItem:NextPage<Props> = ({Icon}) => {
    return (
        <button className="flex items-center justify-center w-12 h-16 transition duration-200 hover:text-neutral-100 active:text-primary-500">
            <Icon className="w-6 h-6"/>
        </button>
    )
}

export default HeaderItem
