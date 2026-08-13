'use client'

import { FloatButton } from "antd";
import { Dispatch, SetStateAction } from "react";

export default function AddButton({icon, tooltip, type, modalState, modalSetter}: {icon: any, tooltip:string, type:"default" | "primary", modalState:boolean, modalSetter:Dispatch<SetStateAction<boolean>>}){
    
    function handleClick(){
        modalSetter(!modalState)
    }

    return (
        <FloatButton icon={icon} tooltip={tooltip} type={type} onClick={handleClick}/>
    )
}