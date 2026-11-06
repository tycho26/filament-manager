'use server'

import DBConnector from "../../prisma/DBConnection";
import { PrismaClient } from "../../generated/prisma/client";
import { CreateFilamentFormType } from "@/ui/createFilamentForm";
import { AggregationColor } from "antd/es/color-picker/color";
import { EditFilamentFormType } from "@/ui/editFilamentForm";
import { calculateTrueWeight } from "@/utils/filament";

const conn: DBConnector = new DBConnector();
const prisma: PrismaClient = conn.connector;

export async function getAllFilaments(){
    return prisma.filament.findMany({
        include: {
            brand: true,
            material: true,
            spool: true
        }
    })
}

export async function getFilament(id:string){
    return prisma.filament.findFirst({
        where:{id:id},
        include: {
            brand: true,
            material: true,
            spool: true
        }
    })
}

export async function createFilament(data:CreateFilamentFormType){

    let color: string;
    if (data.color instanceof AggregationColor){
        color = data.color.toHexString();
    }
    else if (typeof data.color === 'string'){
        color = data.color;
    }
    else{
        throw TypeError
    }

    // Fetch spool info from DB
    const spool = await prisma.spool.findFirst({
        where:{id:data.spool}
    })
    // Calculate true weight of the filament by offsetting it by the weight of the spool itself.
    data.currentWeight = calculateTrueWeight(data.currentWeight, spool.weight)

    await prisma.filament.create({
        data:{
            brand:{
                connect: {
                    id:data.brand
                }
            },
            material:{
                connect: {
                    id:data.material
                }
            },
            spool:{
                connect:{
                    id: data?.spool
                }
            },
            color:color,
            startWeight:data.startWeight,
            currentWeight:data.currentWeight,
            refill: data.refill ? true : false
        }
    });
}

export async function deleteFilament(id:string){
    await prisma.filament.delete({
        where:{id:id}
    })
}

export async function editFilament(id:string, data:EditFilamentFormType){

    let color: string;
    if (data.color instanceof AggregationColor){
        color = data.color.toHexString();
    }
    else if (typeof data.color === 'string'){
        color = data.color;
    }
    else{
        throw TypeError
    }

    // Check current spool ID and if it's the same as one in form
    // If so, and relative mode was selected, no spool weight offset calc needed
    // If not, or absolute mode was selected, use util method to offset entered weight with weight of new spool

    await prisma.filament.update({
        where:{id:id},
        data:{
            brand:{
                connect: {
                    id:data.brand
                }
            },
            material:{
                connect: {
                    id:data.material
                }
            },
            spool:{
                connect:{
                    id: data?.spool
                }
            },
            color:color,
            startWeight:data.startWeight,
            currentWeight:data.currentWeight,
            refill: data.refill ? true : false
        }
    });
}