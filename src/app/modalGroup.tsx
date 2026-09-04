'use client'

import CreateFilamentForm from "@/ui/createFilamentForm"
import { PlusOutlined } from "@ant-design/icons"
import { FloatButton } from "antd"
import { Brand, Material, Spool } from "../../generated/prisma/client"
import { useState } from "react"
import AddButton from "@/ui/addButton"

export default function ModalGroup({brands, materials, spools}:{brands:Promise<Brand[]>,materials:Promise<Material[]>, spools:Promise<Spool[]>}) {

    // State for createModal
    const [filamentForm, setFilamentForm] = useState(false)

    return (
        <>
            <FloatButton.Group trigger="click" icon={<PlusOutlined />} type="primary" shape="square">
                <AddButton icon={<PlusOutlined/>} tooltip="Filament" type="default" 
                modalState={filamentForm} modalSetter={setFilamentForm}/>
            </FloatButton.Group>
            <CreateFilamentForm brands={brands} spools={spools} materials={materials} modalState={filamentForm} modalSetter={setFilamentForm} />
        </>
    )

}