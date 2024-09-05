import { Metadata } from "next";
import Form from "@/app/ui/dashboard/user/form";
import getUserRow from "@/app/actions/user/get_row";

export const metadata: Metadata = {
  title: "Satış Temsilcisi Düzenle",
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const { user, error } = await getUserRow(id);
  return (
    <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
      <Form user={user} edit={true} />
    </div>
  );
}
