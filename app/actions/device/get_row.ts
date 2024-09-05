'use server';

import { db } from "@/lib/db";
import { DeviceRow } from "@/app/types/device";

async function getDeviceRow(id: string): Promise<DeviceRow> {
    try {
        const result = await db.device.findFirst({
            where:{
                id: id
            },
        });

        return { device : result };
    } catch (err) {
        return {
            error: "Error",
        };
    }
}

export default getDeviceRow;