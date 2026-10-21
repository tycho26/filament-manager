'use client'

import FilamentCard from "@/ui/filamentCard";
import { filamentsResolved } from "@/utils/types";
import { Col, Row } from "antd";
import { Dispatch, SetStateAction, use, useState } from "react";
import { Brand, Material, Spool } from "../../generated/prisma/client";
import EditFilamentForm from "@/ui/editFilamentForm";
import DeletePrompt from "@/ui/deletePrompt";

function FilamantCardCol({filament, editModalSetter, selectFilamentIDSetter, deleteModalSetter}:{filament:filamentsResolved, editModalSetter:Dispatch<SetStateAction<boolean>>, selectFilamentIDSetter:Dispatch<SetStateAction<string>>, deleteModalSetter:Dispatch<SetStateAction<boolean>>}){
    
    return (
        <Col span={3}>
            <FilamentCard selectFilamentIDSetter={selectFilamentIDSetter} editModalSetter={editModalSetter} deleteModalSetter={deleteModalSetter} filament={filament} />
        </Col>
    )
}

export default function FilamentCardGrid({filaments, brands, spools, materials}:{filaments:Promise<Array<filamentsResolved>>, brands:Promise<Brand[]>,materials:Promise<Material[]>, spools:Promise<Spool[]>}) {

    // State used for storing which filament ID is currently being edited or deleted
    const [selectedFilamentID, setSelectedFilamentID] = useState("")

    // State for editModal
    const [filamentEditForm, setFilamentEditForm] = useState(false)
    // State for deleteModal
    const [filamentDeletePrompt, setFilamentDeletePrompt] = useState(false)

    const filamentsResolved = use(filaments);
    const filamentDOM = filamentsResolved.map(filament => <FilamantCardCol selectFilamentIDSetter={setSelectedFilamentID} editModalSetter={setFilamentEditForm} deleteModalSetter={setFilamentDeletePrompt} key={filament.id}  filament={filament}/>)



    
    return (
        <>
            <Row gutter={24}>
                {filamentDOM}
            </Row>
            <EditFilamentForm key={selectedFilamentID} filamentID={selectedFilamentID} brands={brands} spools={spools} materials={materials} modalState={filamentEditForm} modalSetter={setFilamentEditForm} />
            <DeletePrompt key={selectedFilamentID+"1"} filamentID={selectedFilamentID} modalState={filamentDeletePrompt} modalSetter={setFilamentDeletePrompt}/>
        </>
    )
}