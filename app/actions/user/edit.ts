'use server';

import { db } from "@/lib/db";
import { UserData } from "@/app/types/user";
import { revalidatePath } from "next/cache";

interface Result{
  data?: UserData ;
  error?: string;
}

async function editUser( values: any, id: string ) : Promise <Result>{
  
  try{
    const result = await db.user.update(
      {
        where:{ 
          id: id,
        },
        data: {
          name: values.name,
          phone: values.phone,        
        }
      }
    );    
    revalidatePath("/dashboard/users");
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

export default editUser;