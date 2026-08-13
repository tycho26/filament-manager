import { createFilament } from "@/actions/filament";
import { getAllBrands } from "@/actions/brand";
import { Brand } from "../../generated/prisma/client";
import CreateFilamentForm from "../ui/createFilamentForm";
import { Material, Spool } from "../../generated/prisma/browser";
import { getAllMaterials } from "@/actions/material";
import { getAllSpools } from "@/actions/spool";
import AddButton from "@/ui/addButton";
import ModalGroup from "./modalGroup";

export default async function Home() {

  const brands:Promise<Brand[]> = getAllBrands();
  const materials:Promise<Material[]> = getAllMaterials();
  const spools:Promise<Spool[]> = getAllSpools();

  
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-light">
      
      <ModalGroup brands={brands} spools={spools} materials={materials}/>
    </div>
  );
}
