'use client'

import { getFilament } from "@/actions/filament";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons"
import { Button, ColorPicker, Flex, Form, Input, List, Modal, Segmented, Select } from "antd"
import { Dispatch, SetStateAction, use, useEffect, useState } from "react";
import { filamentsResolved, SelectOptions } from "@/utils/types";
import { Spool } from "../../generated/prisma/client";

type WeightModeType = "Absolute" | "Relative";

type FilamentQuickEditFormType = {
    Spool?: string,
    Weight: number
}

export default function FilamentQuickEdit({ modalState, modalSetter, spools, filamentID }: { modalState: boolean, modalSetter: Dispatch<SetStateAction<boolean>>, spools: Promise<Spool[]>, filamentID: string }) {

    const [filamentData, setFilamentData] = useState<filamentsResolved>();
    const [weightMode, setWeightMode] = useState<WeightModeType>("Absolute");

    useEffect(() => {
        async function fetchFilament(id: string) {
            const filament = await getFilament(id);
            if (filament) {
                const filamentResolved: filamentsResolved = {
                    id: filament.id,
                    brand: filament.brand,
                    brandId: filament.brandId,
                    materialId: filament.materialId,
                    spoolId: filament.spoolId,
                    material: filament.material,
                    spool: filament.spool,
                    color: filament.color,
                    startWeight: filament.startWeight,
                    currentWeight: filament.currentWeight,
                    refill: filament.refill
                }
                setFilamentData(filamentResolved);
            }
        }
        fetchFilament(filamentID);
    }, [])

    const allSpools = use(spools);
    const spoolSelectOptions: SelectOptions[] = allSpools.map((spool) => ({
        value: spool.id,
        label: spool.name
    }));


    return (
        <Modal title="Filament quick view" open={modalState} onCancel={() => modalSetter(false)} footer={null}>
            <Flex justify="center">
                <List itemLayout="vertical" header={<b>Information:</b>} bordered>
                    <List.Item>
                        <span><b>Brand:</b><p>{filamentData?.brand.name}</p></span>
                    </List.Item>
                    <List.Item>
                        <span><b>Material:</b><p>{filamentData?.material.name}</p></span>
                    </List.Item>
                    <List.Item>
                        <span><b>Color:</b><ColorPicker showText size="small" value={filamentData?.color} disabled></ColorPicker></span>
                    </List.Item>
                    <List.Item>
                        <span><b>Spool:</b><p>{filamentData?.spool.name}</p></span>
                    </List.Item>
                    <List.Item>
                        <span><b>Refill:</b>{filamentData?.refill ? <CheckOutlined /> : <CloseOutlined />}</span>
                    </List.Item>
                    <List.Item>
                        <span><b>grams left:</b><p>{filamentData?.currentWeight} g</p></span>
                    </List.Item>
                </List>
            </Flex>
            <Form style={{ marginTop: '5%' }} onFinish={onSubmit} layout={"vertical"}>
                <Flex justify="center">
                    <Segmented defaultValue="Absolute" options={["Absolute", "Relative"]} onChange={(mode: WeightModeType) => setWeightMode(mode)} />
                </Flex>
                <p>Selected: {weightMode}</p> {/* Remove later */}
                <Form.Item hidden={weightMode == "Absolute" ? false : true} name="spool" label={<b>Spool:</b>} initialValue={filamentData?.spoolId}>
                    <Select disabled={weightMode == "Absolute" ? false : true} style={{ width: 200 }} options={spoolSelectOptions} />
                </Form.Item>
                <Form.Item label={<b>Weight:</b>}>
                    <Input suffix="grams" type={"number"} />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" variant="solid">Save</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}