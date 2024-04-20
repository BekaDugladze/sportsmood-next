import React from "react";
import pic from './firstBack.webp'
import Image from 'next/image'
import { SaveBut } from "./button";
import { Cabin } from "next/font/google";

const cabin = Cabin({subsets: ["latin"]})

export function ProductBox(props) {
    return(
        <div className="flex flex-col bg-red-50 rounded-3xl w-52">
            <Image className="rounded-t-3xl w-full" src={props.src} alt="Sport's Mood" priority/>
            <h3 className={` text-center font-bold text-l text-red-700`} style={{fontFamily: 'bodonimt'}}>{props.name}</h3>
            <p className={` ${cabin.className} h-24 text-xs p-1 text-center overflow-auto`}>{props.description}</p>
            <div className="flex flex-row justify-around items-center my-2">
                <h3 className="text-red-700 font-bold">{props.price}</h3>
                <SaveBut />
            </div>
        </div>
    )
}