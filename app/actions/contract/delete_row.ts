'use server';

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface Delete{
    message?: string;
    error?: string;
}

async function deleteContract( id : string):Promise<Delete>{
    try{
        const result  = await db.contract.update(
            {
              where:{ 
                id: id,
              },
              data: {
                deleted: true,
              }
            }
          );
     revalidatePath("/dashboard/contracts");
     return { message: "Kayıt silme başarılı !"}  
    }
    catch(err){
     return{
       error: "Error"
     }
    }
   }

export default deleteContract;