'use server';

import { db } from "@/lib/db";
import { SimData } from "@/app/types/sim";
import { revalidatePath } from "next/cache";

interface Result{
  data?: SimData ;
  error?: string;
}

async function editSim( values: any, id: string ) : Promise <Result>{
  
  try{
    const result = await db.sim.update(
      {
        where:{ 
          id: id,
        },
        data: {
          serial: values.serial,
          gsmno: values.gsmno,
          tariff: values.tariff,
        }
      }
    );    
    revalidatePath("/dashboard/sims");
    return{
      data: result
    }
  }
  catch(error){
    console.log(error);
    return {
      error: "Error"
    }
  }


}

export default editSim;