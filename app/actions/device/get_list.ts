'use server';

import { db } from "@/lib/db";
import { DeviceList } from "@/app/types/device";

async function getDeviceList(): Promise<DeviceList> {
    try {
        const result = await db.device.findMany({
            where:{
                deleted: false,
            },
            orderBy: {
                created_at: "desc",
            },
        });

        return { devices : result };
    } catch (err) {
        return {
            error: "Error",
        };
    }
}

export default getDeviceList;