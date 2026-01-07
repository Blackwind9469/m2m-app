'use server';

import { db } from "@/lib/db";
import { UserList } from "@/app/types/user";

async function getUserList(): Promise<UserList> {
    try {
        const result = await db.user.findMany({
            where:{
                deleted: false,
            },
            orderBy: {
                created_at: "desc",
            },
        });

        return { users : result };
    } catch (err) {
        return {
            error: "Error",
        };
    }
}

export default getUserList;