'use server';

import { db } from "@/lib/db";

import { CustomerData } from "@/app/types/customer";
import { revalidatePath } from "next/cache";

interface Result{
  data?: CustomerData ;
  error?: string;
}

async function addCustomer( values: any ) : Promise <Result>{

  try{
    const result = await db.customer.create(
      {
        data: {
          name: values.name,
          serial: values.serial,
          represent: values.represent,
          contact: values.contact,
          deleted: false,
        }
      }
    );
    revalidatePath("/dashboard/customers");    
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

export default addCustomer;