import Form from "@/app/ui/dashboard/user/form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Satış Temsilcisi Ekle",
};

export default async function Page() {
  return (
    <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
      <Form user={null} edit={false} />
    </div>
  );
}
