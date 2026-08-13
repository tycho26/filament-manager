'use client'
import { Dispatch, SetStateAction, use } from "react";
import { Button, ColorPicker, Form, Input, InputNumber, Modal, Select, Switch } from "antd";
import { createFilament } from "@/actions/filament";
import { Brand, Material, Spool} from "../../generated/prisma/client";
import { SelectOptions } from "@/utils/types";
import { AggregationColor } from "antd/es/color-picker/color";

export type CreateFilamentFormType = {
  brand:string,
  material:string,
  color: string | AggregationColor,
  spool:string,
  startWeight:number,
  currentWeight:number,
  refill:boolean
}

export default function CreateFilamentForm({brands, materials, spools, modalState, modalSetter}:
  {brands:Promise<Brand[]>,materials:Promise<Material[]>, spools:Promise<Spool[]>, modalState:boolean, modalSetter:Dispatch<SetStateAction<boolean>>}) {

  const allBrands = use(brands);
  const brandSelectOptions:SelectOptions[] =  allBrands.map((brand) =>  ({
      value:brand.id, 
      label:brand.name
    }))

  const allSpools = use(spools);
  const spoolSelectOptions:SelectOptions[] =  allSpools.map((spool) =>  ({
      value:spool.id, 
      label:spool.name
    }))

  const allMaterials = use(materials);
  const materialSelectOptions:SelectOptions[] =  allMaterials.map((material) =>  ({
      value:material.id, 
      label:material.name
    }))

  

  async function onSubmit(form:CreateFilamentFormType){
    let data: CreateFilamentFormType;
    if (form.color instanceof AggregationColor){
      data = {
        ...form,
        color:form.color.toHexString()
      }
    }
    else{
      data = form;
    }
    await createFilament(data);
    modalSetter(false)
  }
  
  return (
    <>
      <Modal title="Create new filament" open={modalState} onCancel={() => modalSetter(false)} footer={null}>
        <Form layout="vertical" onFinish={onSubmit}>
          <Form.Item name="brand" label="Brand">
            <Select style={{width:200}} options={brandSelectOptions} />
          </Form.Item>
          <Form.Item name="material" label="Material">
            <Select style={{width:200}} options={materialSelectOptions} />
          </Form.Item>
          <Form.Item name="color" label="Color">
            <ColorPicker showText format='hex'/>
          </Form.Item>
          <Form.Item name="spool" label="Spool">
            <Select style={{width:200}} options={spoolSelectOptions} />
          </Form.Item>
          <Form.Item name="startWeight" label="Start Weight (without spool)">
            <InputNumber/>
          </Form.Item>
          <Form.Item name="currentWeight" label="Current Weight (with spool)">
            <InputNumber/>
          </Form.Item>
          <Form.Item name="refill" label="Refill" layout="horizontal">
            <Switch />
          </Form.Item>
          <Form.Item>
            <Button color="blue" variant="solid" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
