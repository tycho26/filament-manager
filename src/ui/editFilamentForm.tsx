'use client'
import { Dispatch, SetStateAction, use, useEffect, useState } from "react";
import { Button, ColorPicker, Form, FormInstance, Input, InputNumber, Modal, Select, Switch } from "antd";
import { createFilament, editFilament, getFilament } from "@/actions/filament";
import { Brand, Filament, Material, Spool} from "../../generated/prisma/client";
import { SelectOptions } from "@/utils/types";
import { AggregationColor } from "antd/es/color-picker/color";
import { useForm } from "antd/es/form/Form";

export type EditFilamentFormType = {
  id:string,
  brand:string,
  material:string,
  color: string | AggregationColor,
  spool:string,
  startWeight:number,
  currentWeight:number,
  refill:boolean
}


export default function EditFilamentForm({brands, materials, spools, modalState, modalSetter, filamentID}:
  {brands:Promise<Brand[]>,materials:Promise<Material[]>, spools:Promise<Spool[]>, modalState:boolean, modalSetter:Dispatch<SetStateAction<boolean>>, filamentID:string}) {
    
    const [formStore]:[formStore:FormInstance<EditFilamentFormType>] = useForm();

    useEffect(() => {
      async function fetchFilament(id:string){
        const filament = await getFilament(id);
        if (filament){
          const filamentResolved:EditFilamentFormType = {
            id:filament.id,
            brand:filament.brandId,
            material: filament.materialId,
            spool: filament.spoolId,
            color: filament.color,
            startWeight: filament.startWeight,
            currentWeight: filament.currentWeight,
            refill: filament.refill
          }
          formStore.setFieldsValue(filamentResolved);
        }
      }
      fetchFilament(filamentID);
  },[])

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

  

  async function onSubmit(form:EditFilamentFormType){
    let data: EditFilamentFormType;
    if (form.color instanceof AggregationColor){
      data = {
        ...form,
        color:form.color.toHexString()
      }
    }
    else{
      data = form;
    }
    await editFilament(filamentID, data);
    modalSetter(false)
  }
  
  return (
    <>
      <Modal title="Edit filament" open={modalState} onCancel={() => modalSetter(false)} footer={null}>
        <Form form={formStore} layout="vertical" onFinish={onSubmit}>
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
              Edit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
