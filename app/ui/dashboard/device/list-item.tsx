import Link from "next/link";
import { DeviceData } from "@/app/types/device";
import { TableCell, TableRow } from "@/components/ui/table";
import DeleteLink from "./delete-link";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import moment from "moment";

export default async function DeviceListItem({
  device,
}: {
  device: DeviceData;
}) {
  return (
    <TableRow key={device.id}>
      <TableCell>
        <div className='font-medium'>{device.serial}</div>
      </TableCell>
      <TableCell className='hidden sm:table-cell'>{device.type}</TableCell>
      <TableCell className='hidden md:table-cell'>
        {moment(device.created_at, "YYYY-MM-DD").format("DD-MM-YYYY")}
      </TableCell>
      <TableCell className='text-right'>
        <div className='flex justify-end gap-3'>
          <Button variant='outline' size='icon' asChild>
            <Link href={"/dashboard/devices/edit/" + device.id}>
              <Pencil className='h-4 w-4' />
            </Link>
          </Button>
          <DeleteLink id={device.id} />
        </div>
      </TableCell>
    </TableRow>
  );
}
