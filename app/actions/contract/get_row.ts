'use server';

import { db } from "@/lib/db";
import { ContractRow } from "@/app/types/contract";

async function getContractRow(id: string): Promise<ContractRow> {
    try {
        const result = await db.contract.findFirst({
            where:{
                id: id
            },
            include: {
                hat: true,
                cihaz: true
            }
        });

        return { contract : result };
    } catch (err) {
        console.error("Error in getContractRow:", err);
        return {
            error: "Error fetching contract",
        };
    }
}

export default getContractRow;