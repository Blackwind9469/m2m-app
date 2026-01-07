'use server';

import { db } from "@/lib/db";
import { DeviceData } from "@/app/types/device";
import { revalidatePath } from "next/cache";

interface Result{
  data?: DeviceData ;
  error?: string;
}

async function editDevice( values: any, id: string ) : Promise <Result>{
  
  try{
    const result = await db.device.update(
      {
        where:{ 
          id: id,
        },
        data: {
          serial: values.serial,
          type: values.type,        
        }
      }
    );    
    revalidatePath("/dashboard/devices");
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

export default editDevice;