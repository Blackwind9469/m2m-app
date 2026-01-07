import { Metadata } from "next";
import Form from "@/app/ui/dashboard/customer/form";
import getCustomerRow from "@/app/actions/customer/get_row";

export const metadata: Metadata = {
  title: "Müşteri Düzenle",
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const { customer, error } = await getCustomerRow(id);
  return (
    <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
      <Form customer={customer} edit={true} />
    </div>
  );
}
