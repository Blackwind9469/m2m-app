import Link from "next/link";
import { UserData } from "@/app/types/user";
import { TableCell, TableRow } from "@/components/ui/table";
import DeleteLink from "./delete-link";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import moment from "moment";

export default async function UserListItem({ user }: { user: UserData }) {
  return (
    <TableRow key={user.id}>
      <TableCell>
        <div className='font-medium'>{user.name}</div>
      </TableCell>
      <TableCell className='hidden sm:table-cell'>{user.phone}</TableCell>
      <TableCell className='hidden md:table-cell'>
        {moment(user.created_at, "YYYY-MM-DD").format("DD-MM-YYYY")}
      </TableCell>
      <TableCell className='text-right'>
        <div className='flex justify-end gap-3'>
          <Button variant='outline' size='icon' asChild>
            <Link href={"/dashboard/users/edit/" + user.id}>
              <Pencil className='h-4 w-4' />
            </Link>
          </Button>
          <DeleteLink id={user.id} />
        </div>
      </TableCell>
    </TableRow>
  );
}
