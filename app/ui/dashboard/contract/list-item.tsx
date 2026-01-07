import Link from "next/link";
import { ContractData } from "@/app/types/contract";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import DeleteLink from "./delete-link";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import moment from "moment";
export default async function ContractListItem({
  contract,
}: {
  contract: ContractData;
}) {
  return (
    <TableRow key={contract.id}>
      <TableCell>
        <div className='font-medium'>{contract.sim_id}</div>
      </TableCell>
      <TableCell className='hidden sm:table-cell'>
        {contract.customer_id}
      </TableCell>
      <TableCell className='hidden sm:table-cell'>
        {contract.device_id}
      </TableCell>
      <TableCell className='hidden sm:table-cell'>{contract.type}</TableCell>
      <TableCell className='hidden sm:table-cell'>
        <Badge className='text-xs' variant='secondary'>
          {contract.license_plate}
        </Badge>
      </TableCell>
      <TableCell className='hidden md:table-cell'>
        {moment(contract.start, "YYYY-MM-DD").format("DD-MM-YYYY")}
      </TableCell>
      <TableCell className='hidden md:table-cell'>
        {moment(contract.finish, "YYYY-MM-DD").format("DD-MM-YYYY")}
      </TableCell>
      <TableCell className='text-right'>
        <div className='flex justify-end gap-3'>
          <Button variant='outline' size='icon' asChild>
            <Link href={"/dashboard/contracts/edit/" + contract.id}>
              <Pencil className='h-4 w-4' />
            </Link>
          </Button>
          <DeleteLink id={contract.id} />
        </div>
      </TableCell>
    </TableRow>
  );
}
