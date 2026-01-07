'use server';

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface Delete{
    message?: string;
    error?: string;
}

async function deleteContract( id : string):Promise<Delete>{
    try{
      const contract = await db.contract.findUnique({
        where: { id },
        select: { sim_id: true, device_id: true }
    });

    if (!contract) {
        return { error: "Contract not found" };
    }

        const result = await db.$transaction([
           
            db.contract.update({
                where: { id },
                data: { deleted: true }
            }),

            ...(contract.sim_id ? [
                db.sim.update({
                    where: { id: contract.sim_id },
                    data: { used: false }
                })
            ] : []),

            ...(contract.device_id ? [
                db.device.update({
                    where: { id: contract.device_id },
                    data: { used: false }
                })
            ] : [])
        ]);

        revalidatePath("/dashboard/contracts");
        return { message: "Kayıt silme ve ilişkili güncellemeler başarılı!" };
    } catch (err) {
        console.error("Error in deleteContract:", err);
        return { error: "Kayıt silinirken bir hata oluştu" };
    }
}

export default deleteContract;