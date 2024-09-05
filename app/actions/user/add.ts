'use server';

import { db } from "@/lib/db";

import { UserData } from "@/app/types/user";
import { revalidatePath } from "next/cache";

interface Result{
  data?: UserData ;
  error?: string;
}

async function addUser( values: any ) : Promise <Result>{

  try{
    const result = await db.user.create(
      {
        data: {
          name: values.name,
          phone: values.phone,
          deleted: false,
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

export default addUser;