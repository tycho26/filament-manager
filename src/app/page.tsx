export const dynamic = 'force-dynamic';

import { getAllFilaments } from "@/actions/filament";
import { getAllBrands } from "@/actions/brand";
import { Brand, Material, Spool } from "../../generated/prisma/client";
import { getAllMaterials } from "@/actions/material";
import { getAllSpools } from "@/actions/spool";
import ModalGroup from "./modalGroup";
import FilamentCardGrid from "./filamentCardGrid";
import { Suspense } from "react";
import { Card } from "antd";
import { filamentsResolved } from "@/utils/types";

export default async function Home() {

  const brands:Promise<Brand[]> = getAllBrands();
  const materials:Promise<Material[]> = getAllMaterials();
  const spools:Promise<Spool[]> = getAllSpools();
  const filaments:Promise<Array<filamentsResolved>> = getAllFilaments();

  
  return (
    <div className="flex flex-col flex-1 p-20 items-left bg-zinc-50 font-sans dark:bg-light">
      <Suspense fallback={<Card loading/>}>
        <FilamentCardGrid filaments={filaments} brands={brands} spools={spools} materials={materials}/>
      </Suspense>
      <ModalGroup brands={brands} spools={spools} materials={materials} />
    </div>
  );
}
