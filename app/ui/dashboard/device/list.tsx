import { DeviceData } from "@/app/types/device";
import getDeviceList from "@/app/actions/device/get_list";
import DeviceListItem from "./list-item";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function DeviceList() {
  const { devices, error } = await getDeviceList();

  return (
    <Table>
      <TableHeader>
        <TableRow className='bg-accent'>
          <TableHead>Seri No</TableHead>
          <TableHead className='hidden sm:table-cell'>Model</TableHead>
          <TableHead className='hidden md:table-cell'>Tarih</TableHead>
          <TableHead className='text-right'>İşlemler</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {devices && devices.length === 0 ? (
          <TableRow className='bg-accent'>
            <TableCell>Kayıt bulunamadı</TableCell>
          </TableRow>
        ) : (
          devices?.map((device: DeviceData) => (
            <DeviceListItem device={device} key={device.id} />
          ))
        )}
      </TableBody>
    </Table>
  );
}
