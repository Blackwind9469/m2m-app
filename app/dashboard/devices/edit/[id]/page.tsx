import { Metadata } from "next";
import Form from "@/app/ui/dashboard/device/form";
import getDeviceRow from "@/app/actions/device/get_row";

export const metadata: Metadata = {
  title: "Cihaz Düzenle",
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const { device, error } = await getDeviceRow(id);
  return (
    <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
      <Form device={device} edit={true} />
    </div>
  );
}
