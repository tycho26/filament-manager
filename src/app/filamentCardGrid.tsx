'use client'

import FilamentCard from "@/ui/filamentCard";
import { Col, Row } from "antd";
import { Filament } from "../../generated/prisma/client";
import { use } from "react";

function FilamantCardCol({filament}:{filament:Filament}){
    
    return (
        <Col span={3}>
            <FilamentCard filament={filament} />
        </Col>
    )
}

export default function FilamentCardGrid({filaments}:{filaments:Promise<Array<Filament>>}) {


    const filamentsResolved = use(filaments);
    const filamentDOM = filamentsResolved.map(filament => <FilamantCardCol key={filament.id} filament={filament}/>)

    
    return (
        <>
            <Row gutter={24}>
                {filamentDOM}
            </Row>
        </>
    )
}