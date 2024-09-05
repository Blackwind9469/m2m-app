'use server';

import { db } from "@/lib/db";
import { CustomerList } from "@/app/types/customer";

async function getCustomerList(): Promise<CustomerList> {
    try {
        const result = await db.customer.findMany({
            where:{
                deleted: false,
            },
            orderBy: {
                created_at: "desc",
            },
        });

        return { customers : result };
    } catch (err) {
        return {
            error: "Error",
        };
    }
}

export default getCustomerList;