import { Brand, Material, Spool, Filament } from "../../generated/prisma/client"

export type SelectOptions = {
    value:string,
    label:string
}

export interface filamentsResolved extends Filament{
    brand:Brand,
    material:Material,
    spool:Spool,
}