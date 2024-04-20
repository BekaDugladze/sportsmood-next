import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";

export function RedBut(props){
    return(
        <button className="flex justify-center items-center cursor-pointer bg-red-700 rounded-3xl text-red-50 hover:bg-red-50 hover:text-red-700 transition-all duration-1000 px-3 py-1" onClick={props.click} disabled={props.isButtonDisabled}>{props.name}</button>
    )
}
export function WhiteBut(props){
    return(
        <button className="flex justify-center items-center cursor-pointer bg-red-50 rounded-3xl text-red-700 hover:bg-red-700 hover:text-red-50 transition-all duration-700 px-3 py-1" onClick={props.click}>{props.name}</button>
    )
}
export function SaveBut(props){
    return(
        <button className="flex flex-col justify-center items-center cursor-pointer bg-blue-600 rounded-3xl text-blue-50 px-3 py-1" onClick={props.click}><FontAwesomeIcon className='w-5' icon={faBagShopping} /> <span className="text-xs ">save</span></button>
    )
}