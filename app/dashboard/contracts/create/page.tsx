import Form from "@/app/ui/dashboard/contract/form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sözleşme Ekle",
};

export default async function Page() {
  return (
    <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
      <Form contract={null} edit={false} />
    </div>
  );
}
