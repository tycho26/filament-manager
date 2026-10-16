"use client"
import { filamentsResolved } from "@/utils/types";
import { CheckOutlined, CloseOutlined, DeleteFilled, EditOutlined } from "@ant-design/icons";
import { Button, Card, ColorPicker, Image } from "antd";
import { Dispatch, SetStateAction } from "react";

export default function FilamentCard({filament, editModalSetter, selectFilamentIDSetter, deleteModalSetter}:{filament:filamentsResolved, editModalSetter:Dispatch<SetStateAction<boolean>>, selectFilamentIDSetter:Dispatch<SetStateAction<string>>, deleteModalSetter:Dispatch<SetStateAction<boolean>>}) {

    const onEditClick = () => {
        selectFilamentIDSetter(filament.id)
        editModalSetter(true);
    }

    const onDeleteClick = () => {
        selectFilamentIDSetter(filament.id)
        deleteModalSetter(true);
        // Create filament action for deleting filament
    }

    const cardActions = [
    <Button onClick={onEditClick}><EditOutlined/></Button>, 
    <Button onClick={onDeleteClick}><DeleteFilled style={{color:"red"}}/></Button>
    ]

    return (
	    // Placeholder image, change later!
        <Card hoverable actions={cardActions} cover={<Image preview={false} src="/filament.png"></Image>}>
            <span><b>Brand: </b>{filament.brand.name}</span><br/>
            <span><b>Material: </b>{filament.material.name}</span><br/>
            <span><b>Color: </b><ColorPicker showText size="small" value={filament.color} disabled></ColorPicker></span><br/>
            <span><b>Spool: </b>{filament.spool.name}</span><br/>
            <span><b>Refill: </b> {filament.refill ? <CheckOutlined/> : <CloseOutlined/>} </span><br/>
        </Card>
    )
}
