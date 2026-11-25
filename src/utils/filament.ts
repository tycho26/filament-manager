import { Filament } from "../../generated/prisma/client";
import { Spool } from "../../generated/prisma/client";

export function calculateTrueWeight(currentWeight:number, spoolWeight:number){
    console.log("Current weight: ", currentWeight)
    currentWeight -= spoolWeight
    console.log("True weight: ", currentWeight)
    return currentWeight
    
}