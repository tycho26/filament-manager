'use client'
import React from "react";
import { Button, ColorPicker, Form, Input, InputNumber, Select, Switch } from "antd";
import { PlusOutlined } from "@ant-design/icons"

export default function Home() {

  const brands:object = [
    {value: 'esun', label: 'eSun'},
    {value: 'sunlu', label: 'SUNLU'},
    {value: 'anycubic', label: 'Anycubic'}
  ]
  const materials:object = [
    {value: 'pla-p', label: 'PLA+'},
    {value: 'pla', label: 'PLA'},
    {value: 'petg', label: 'PETG'}
  ]
   const spools:object = [
    {value: 'esunRefill', label: 'eSun refillable spool'},
    {value: 'customMSpool', label: 'Custom Master Spool'},
    {value: 'sunluRefill', label: 'SUNLU refillable spool'}
  ]

  async function onSubmit(form){
    console.log(form)
  }


  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-light">
      <Form layout="vertical" onFinish={onSubmit}>
        <Form.Item name="brand" label="Brand">
          <Select style={{width:200}} options={brands} />
        </Form.Item>
        <Form.Item name="material" label="Material">
          <Select style={{width:200}} options={materials} />
        </Form.Item>
        <Form.Item name="color" label="Color">
          <ColorPicker showText format='hex' defaultValue="#ffffff"/>
        </Form.Item>
        <Form.Item name="spool" label="Spool">
          <Select style={{width:200}} options={spools} />
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
      
      <Button shape="circle" size="large" icon={<PlusOutlined />} color="blue" variant="solid"></Button>
    </div>
  );
}
