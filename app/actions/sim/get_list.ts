'use server';

import { db } from "@/lib/db";
import { SimList } from "@/app/types/sim";

async function getSimList(): Promise<SimList> {
    try {
        const result = await db.sim.findMany({
            where:{
                deleted: false,
            },
            orderBy: {
                created_at: "desc",
            },
        });

        return { sims : result };
    } catch (err) {
        return {
            error: "Error",
        };
    }
}

export default getSimList;