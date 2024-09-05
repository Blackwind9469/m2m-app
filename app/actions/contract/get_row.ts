'use server';

import { db } from "@/lib/db";
import { ContractRow } from "@/app/types/contract";

async function getContractRow(id: string): Promise<ContractRow> {
    try {
        const result = await db.contract.findFirst({
            where:{
                id: id
            },
        });

        return { contract : result };
    } catch (err) {
        return {
            error: "Error",
        };
    }
}

export default getContractRow;