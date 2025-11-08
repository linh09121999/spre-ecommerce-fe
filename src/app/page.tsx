"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStateGeneral } from '@/useState/useStateGeneral';

import React, { useState, useEffect } from "react";
import { useState_ResTaxons } from "@/useState/useStatestorefront";
import { daDK } from "@mui/material/locale";

const Home: React.FC = () => {
  const { resTaxons_List } = useState_ResTaxons()

  

  return (
    <>
      <div className="max-w-[1535px] mx-auto flex flex-col gap-5">
        {resTaxons_List?.data.map((data, id) => (
          <div key={id}>
            <h3 className="text-lg font-bold uppercase">{data.attributes.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home