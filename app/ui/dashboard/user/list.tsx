import { UserData } from "@/app/types/user";
import getUserList from "@/app/actions/user/get_list";
import UserListItem from "./list-item";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function UserList() {
  const { users, error } = await getUserList();

  return (
    <Table>
      <TableHeader>
        <TableRow className='bg-accent'>
          <TableHead>İsim</TableHead>
          <TableHead className='hidden sm:table-cell'>Telefon No</TableHead>
          <TableHead className='hidden md:table-cell'>Tarih</TableHead>
          <TableHead className='text-right'>İşlemler</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users && users.length === 0 ? (
          <TableRow className='bg-accent'>
            <TableCell>Kayıt bulunamadı</TableCell>
          </TableRow>
        ) : (
          users?.map((user: UserData) => (
            <UserListItem user={user} key={user.id} />
          ))
        )}
      </TableBody>
    </Table>
  );
}
