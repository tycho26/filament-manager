'use client'

import FilamentCard from "@/ui/filamentCard";
import { filamentsResolved } from "@/utils/types";
import { Col, Row } from "antd";
import { Dispatch, SetStateAction, use, useState } from "react";
import { Brand, Material, Spool } from "../../generated/prisma/client";
import EditFilamentForm from "@/ui/editFilamentForm";

function FilamantCardCol({filament, editModalSetter, editFilamentIDSetter}:{filament:filamentsResolved, editModalSetter:Dispatch<SetStateAction<boolean>>, editFilamentIDSetter:Dispatch<SetStateAction<string>>}){
    
    //TODO: pass editmodal setter and editFilamentID setter to filament card
    return (
        <Col span={3}>
            <FilamentCard editFilamentIDSetter={editFilamentIDSetter} editModalSetter={editModalSetter} filament={filament} />
        </Col>
    )
}

export default function FilamentCardGrid({filaments, brands, spools, materials}:{filaments:Promise<Array<filamentsResolved>>, brands:Promise<Brand[]>,materials:Promise<Material[]>, spools:Promise<Spool[]>}) {

    const [editFilamentID, setEditFilamentID] = useState("")

    // State for editModal
    const [filamentEditForm, setFilamentEditForm] = useState(false)

    const filamentsResolved = use(filaments);
    const filamentDOM = filamentsResolved.map(filament => <FilamantCardCol editFilamentIDSetter={setEditFilamentID} editModalSetter={setFilamentEditForm} key={filament.id}  filament={filament}/>)



    
    return (
        <>
            <Row gutter={24}>
                {filamentDOM}
            </Row>
            <EditFilamentForm key={editFilamentID} filamentID={editFilamentID} brands={brands} spools={spools} materials={materials} modalState={filamentEditForm} modalSetter={setFilamentEditForm} />
        </>
    )
}