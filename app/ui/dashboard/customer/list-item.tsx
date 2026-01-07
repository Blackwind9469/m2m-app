import Link from "next/link";
import { CustomerData } from "@/app/types/customer";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import DeleteLink from "./delete-link";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import moment from "moment";
export default async function CustomerListItem({
  customer,
}: {
  customer: CustomerData;
}) {
  return (
    <TableRow key={customer.id}>
      <TableCell>
        <div className='font-medium'>{customer.name}</div>
      </TableCell>
      <TableCell className='hidden sm:table-cell'>{customer.serial}</TableCell>
      <TableCell className='hidden sm:table-cell'>
        {customer.represent}
      </TableCell>
      <TableCell className='hidden sm:table-cell'>
        <Badge className='text-xs' variant='secondary'>
          {customer.contact}
        </Badge>
      </TableCell>
      <TableCell className='hidden md:table-cell'>
        {moment(customer.created_at, "YYYY-MM-DD").format("DD-MM-YYYY")}
      </TableCell>
      <TableCell className='text-right'>
        <div className='flex justify-end gap-3'>
          <Button variant='outline' size='icon' asChild>
            <Link href={"/dashboard/customers/edit/" + customer.id}>
              <Pencil className='h-4 w-4' />
            </Link>
          </Button>
          <DeleteLink id={customer.id} />
        </div>
      </TableCell>
    </TableRow>
  );
}
