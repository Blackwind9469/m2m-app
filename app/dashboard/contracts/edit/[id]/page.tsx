import { Metadata } from "next";
import Form from "@/app/ui/dashboard/contract/form";
import getContractRow from "@/app/actions/contract/get_row";

export const metadata: Metadata = {
  title: "Sözleşme Düzenle",
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const { contract, error } = await getContractRow(id);
  return (
    <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
      <Form contract={contract} edit={true} />
    </div>
  );
}
