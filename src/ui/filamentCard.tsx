"use client"
import { filamentsResolved } from "@/utils/types";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Card, ColorPicker, Image } from "antd";

export default function FilamentCard({filament}:{filament:filamentsResolved}) {

    return (
	    // Placeholder image, change later!
        <Card hoverable cover={<Image preview={false} src="/filament.png"></Image>}>
            <span><b>Brand: </b>{filament.brand.name}</span><br/>
            <span><b>Material: </b>{filament.material.name}</span><br/>
            <span><b>Color: </b><ColorPicker showText size="small" value={filament.color} disabled></ColorPicker></span><br/>
            <span><b>Spool: </b>{filament.spool.name}</span><br/>
            <span><b>Refill: </b> {filament.refill ? <CheckOutlined/> : <CloseOutlined/>} </span><br/>
        </Card>
    )
}
