import { PrismaClient } from "../../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

class DBConnector{

    private static instance: DBConnector
    public connector: PrismaClient
    constructor() {
        if (DBConnector.instance) {
            return DBConnector.instance
        }
        else{
            this.connector = this.CreateConnector()
            DBConnector.instance = this
            return DBConnector.instance
        }
    }

    CreateConnector():PrismaClient  {
        const adapter = new PrismaMariaDb(String(process.env.DATABASE_URL));
        return new PrismaClient({ adapter });
    }
}

export default DBConnector