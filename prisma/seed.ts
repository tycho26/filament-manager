import DBConnector from "./DBConnection";

const prisma = new DBConnector().connector;

async function main(){
    //Brands
    const eSun = await prisma.brand.upsert({
        where: {name:"eSun"},
        update: {},
        create:{
            name:"eSun"
        }
    })
    const SUNLU = await prisma.brand.upsert({
        where: {name:"SUNLU"},
        update: {},
        create:{
            name:"SUNLU"
        }
    })
    const Anycubic = await prisma.brand.upsert({
        where: {name:"Anycubic"},
        update: {},
        create:{
            name:"Anycubic"
        }
    })
    await prisma.brand.upsert({
        where: {name:"123-3D"},
        update: {},
        create:{
            name:"123-3D"
        }
    })
    await prisma.brand.upsert({
        where: {name:"Jayoo"},
        update: {},
        create:{
            name:"Jayoo"
        }
    })
    await prisma.brand.upsert({
        where: {name:"iBoss"},
        update: {},
        create:{
            name:"iBoss"
        }
    })
    await prisma.brand.upsert({
        where: {name:"Geeetech"},
        update: {},
        create:{
            name:"Geeetech"
        }
    })
    await prisma.brand.upsert({
        where: {name:"Tinmory"},
        update: {},
        create:{
            name:"Tinmory"
        }
    })

    //Materials
    await prisma.material.upsert({
        where: {name:"PLA"},
        update: {},
        create:{
            name:"PLA"
        }
    })
    await prisma.material.upsert({
        where: {name:"PLA+"},
        update: {},
        create:{
            name:"PLA+"
        }
    })
    await prisma.material.upsert({
        where: {name:"TPU"},
        update: {},
        create:{
            name:"TPU"
        }
    })
    await prisma.material.upsert({
        where: {name:"PETG"},
        update: {},
        create:{
            name:"PETG"
        }
    })
    await prisma.material.upsert({
        where: {name:"PLA silk"},
        update: {},
        create:{
            name:"PLA silk"
        }
    })

    //Spools
    await prisma.spool.upsert({
        where: {id:"0fe9c8bf-377c-4b8d-a1cb-1381e930f535", name:"Anycubic spool"},
        update: {},
        create:{
            id: "0fe9c8bf-377c-4b8d-a1cb-1381e930f535",
            name:"Anycubic spool",
            brand:{
                connect:Anycubic
            },
            weight:250
        }
    })
    await prisma.spool.upsert({
        where: {id:"d0d14e9f-c67a-405b-aa8a-a20ba6681009", name:"eSun refill spool"},
        update: {},
        create:{
            id: "d0d14e9f-c67a-405b-aa8a-a20ba6681009",
            name:"eSun refill spool",
            brand:{
                connect:eSun
            },
            weight:250
        }
    })
    await prisma.spool.upsert({
        where: {id:"8528e654-0b28-4874-a54a-7159ae58d0f6", name:"SUNLU refill spool"},
        update: {},
        create:{
            id: "8528e654-0b28-4874-a54a-7159ae58d0f6",
            name:"SUNLU refill spool",
            brand:{
                connect:SUNLU
            },
            weight:250
        }
    })
}

main().then(async () => {
    await prisma.$disconnect();
})