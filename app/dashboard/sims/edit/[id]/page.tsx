import { Metadata } from "next";
import Form from "@/app/ui/dashboard/sim/form";
import getSimRow from "@/app/actions/sim/get_row";

export const metadata: Metadata = {
    title: "SIM Hat Düzenle",
};

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const { sim, error } = await getSimRow(id);
    return (
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <Form sim={sim} edit={true} />
        </div>
    );
}
