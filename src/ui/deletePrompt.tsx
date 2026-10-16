'use client'

import { Button, Modal } from "antd"
import { Dispatch, SetStateAction } from "react"
import { deleteFilament } from "@/actions/filament"

export default function DeletePrompt({filamentID, modalState, modalSetter}:{filamentID:string, modalState:boolean, modalSetter:Dispatch<SetStateAction<boolean>>}){

    function handleCancel(){
        modalSetter(false)
    }

    async function handleDelete(){
        await deleteFilament(filamentID);
        modalSetter(false)
      }

    const footerBtns = [<Button key="filDelModalCancelBtn" color="default" onClick={handleCancel} variant="outlined">Cancel</Button>, <Button color="danger" onClick={handleDelete} key="filDelModalDeleteBtn" variant="solid">Delete</Button>];

    return(
        <Modal title="Are you sure?" open={modalState} onCancel={() => modalSetter(false)} footer={footerBtns}>
            Are you sure you want to delete this filament?
        </Modal>
    )
}