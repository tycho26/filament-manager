'use server'

import DBConnector from "../../prisma/DBConnection";
import { Spool, PrismaClient } from "../../generated/prisma/client";

const conn: DBConnector = new DBConnector();
const prisma: PrismaClient = conn.connector;

export async function getAllSpools(): Promise<Spool[]>{
    return prisma.spool.findMany();
}