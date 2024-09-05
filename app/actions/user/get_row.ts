'use server';

import { db } from "@/lib/db";
import { UserRow } from "@/app/types/user";

async function getUserRow(id: string): Promise<UserRow> {
    try {
        const result = await db.user.findFirst({
            where:{
                id: id
            },
        });

        return { user : result };
    } catch (err) {
        return {
            error: "Error",
        };
    }
}

export default getUserRow;