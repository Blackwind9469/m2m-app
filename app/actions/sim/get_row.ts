'use server';

import { db } from "@/lib/db";
import { SimRow } from "@/app/types/sim";

async function getSimRow(id: string): Promise<SimRow> {
    try {
        const result = await db.sim.findFirst({
            where:{
                id: id
            },
        });

        return { sim : result };
    } catch (err) {
        return {
            error: "Error",
        };
    }
}

export default getSimRow;