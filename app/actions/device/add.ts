'use server';

import { db } from "@/lib/db";

import { DeviceData } from "@/app/types/device";
import { revalidatePath } from "next/cache";

interface Result{
  data?: DeviceData ;
  error?: string;
}

async function addDevice( values: any ) : Promise <Result>{

  try{
    const result = await db.device.create(
      {
        data: {
          serial: values.serial,
          type: values.type,
          deleted: false,
          used: false
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

export default addDevice;