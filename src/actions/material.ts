'use server'

import DBConnector from "../../prisma/DBConnection";
import { Material, PrismaClient } from "../../generated/prisma/client";

const conn: DBConnector = new DBConnector();
const prisma: PrismaClient = conn.connector;

export async function getAllMaterials(): Promise<Material[]>{
    return prisma.material.findMany();
}