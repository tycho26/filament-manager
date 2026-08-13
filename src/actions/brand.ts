'use server'

import DBConnector from "@/utils/DBConnection";
import { Brand, PrismaClient } from "../../generated/prisma/client";

const conn: DBConnector = new DBConnector();
const prisma: PrismaClient = conn.connector;

export async function getAllBrands(): Promise<Brand[]>{
    return prisma.brand.findMany();
}