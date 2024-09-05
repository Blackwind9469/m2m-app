'use server';

import { db } from "@/lib/db";

import { SimData } from "@/app/types/sim";
import { revalidatePath } from "next/cache";

interface Result{
  data?: SimData ;
  error?: string;
}

async function addSim( values: any ) : Promise <Result>{

  try{
    const result = await db.sim.create(
      {
        data: {
          serial: values.serial,
          gsmno: values.gsmno,
          tariff: values.tariff,
          deleted: false,
          used: false
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

export default addSim;