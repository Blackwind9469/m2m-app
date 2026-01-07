'use server';

import { db } from "@/lib/db";
import { CustomerRow } from "@/app/types/customer";

async function getCustomerRow(id: string): Promise<CustomerRow> {
    try {
        const result = await db.customer.findFirst({
            where:{
                id: id
            },
        });

        return { customer : result };
    } catch (err) {
        return {
            error: "Error",
        };
    }
}

export default getCustomerRow;