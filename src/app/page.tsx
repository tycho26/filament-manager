import { createFilament, getAllFilaments } from "@/actions/filament";
import { getAllBrands } from "@/actions/brand";
import { Brand, Filament, Material, Spool } from "../../generated/prisma/client";
import { getAllMaterials } from "@/actions/material";
import { getAllSpools } from "@/actions/spool";
import ModalGroup from "./modalGroup";
import FilamentCard from "@/ui/filamentCard";
import { Col, Row } from "antd";

export default async function Home() {

  const brands:Promise<Brand[]> = getAllBrands();
  const materials:Promise<Material[]> = getAllMaterials();
  const spools:Promise<Spool[]> = getAllSpools();
  // Change type to custom filament type!
  const filaments:Array<any> = await getAllFilaments();

  
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-light">
      <Row gutter={12}>
        <Col span={8}>
          <FilamentCard filament={filaments[0]}/>
        </Col>
        <Col span={8}>
          <FilamentCard filament={filaments[1]}/>
        </Col>
        <Col span={8}>
          <FilamentCard filament={filaments[2]}/>
        </Col>
      </Row>
      <ModalGroup brands={brands} spools={spools} materials={materials}/>
    </div>
  );
}
