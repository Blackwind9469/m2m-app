'use server';

import { db } from "@/lib/db";
import { ContractData } from "@/app/types/contract";
import { revalidatePath } from "next/cache";

interface Result{
  data?: ContractData ;
  error?: string;
}

async function editContract( values: any, id: string ) : Promise <Result>{
  
  try{
    const result = await db.contract.update(
      {
        where:{ 
          id: id,
        },
        data: {
          sim_id: values.sim_id,
          device_id: values.device_id,
          customer_id: values.customer_id,
          type: values.type,
          license_plate: values.license_plate,
          start: values.start,
          finish: values.finish,
          deleted: false,
        }
      }
    );    
    revalidatePath("/dashboard/contracts");
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

export default editContract;