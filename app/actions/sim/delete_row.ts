'use server';

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface Delete{
    message?: string;
    error?: string;
}

async function deleteSim( id : string):Promise<Delete>{
    try{
        const result  = await db.sim.update(
            {
              where:{ 
                id: id,
              },
              data: {
                deleted: true,
              }
            }
          );
     revalidatePath("/dashboard/sims");
     return { message: "Kayıt silme başarılı !"}  
    }
    catch(err){
     return{
       error: "Error"
     }
    }
   }

export default deleteSim;