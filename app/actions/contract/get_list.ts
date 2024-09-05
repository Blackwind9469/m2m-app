'use server';

import { db } from "@/lib/db";
import { ContractList } from "@/app/types/contract";

async function getContractList(): Promise<ContractList> {
    try {
        const result = await db.contract.findMany({
            where:{
                deleted: false,
            },
            orderBy: {
                created_at: "desc",
            },
        });

        return { contracts : result };
    } catch (err) {
        return {
            error: "Error",
        };
    }
}

export default getContractList;