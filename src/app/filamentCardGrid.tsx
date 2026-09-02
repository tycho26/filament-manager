'use client'

import FilamentCard from "@/ui/filamentCard";
import { filamentsResolved } from "@/utils/types";
import { Col, Row } from "antd";
import { use } from "react";

function FilamantCardCol({filament}:{filament:filamentsResolved}){
    
    return (
        <Col span={3}>
            <FilamentCard filament={filament} />
        </Col>
    )
}

export default function FilamentCardGrid({filaments}:{filaments:Promise<Array<filamentsResolved>>}) {


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