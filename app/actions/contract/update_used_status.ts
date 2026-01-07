'use server';

import { db } from "@/lib/db";

interface UpdateResult {
    success: boolean;
    error?: string;
}

async function updateUsedStatus(sim_id: string, device_id: string, used: boolean): Promise<UpdateResult> {
    try {
        await db.$transaction([
            db.sim.update({
                where: { id: sim_id },
                data: { used }
            }),
            db.device.update({
                where: { id: device_id },
                data: { used }
            })
        ]);

        return { success: true };
    } catch (err) {
        console.error("Error in updateUsedStatus:", err);
        return { success: false, error: "Failed to update used status" };
    }
}

export default updateUsedStatus;