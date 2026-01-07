"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import DeleteLink from "@/app/ui/dashboard/customer/delete-link";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import moment from "moment";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Customer = {
  id: string;
  name: string;
  serial: string;
  contact: string;
  created_at: string;
  staff: {
    id: string;
    name: string;
  };
};

const CustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("/api/customers");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow className='bg-accent'>
          <TableHead>Müşteri Adı</TableHead>
          <TableHead className='hidden sm:table-cell'>
            Vergi No / TCKN
          </TableHead>
          <TableHead className='hidden sm:table-cell'>
            Satış Temsilcisi
          </TableHead>
          <TableHead className='hidden sm:table-cell'>Yetkili kişi</TableHead>
          <TableHead className='hidden md:table-cell'>Tarih</TableHead>
          <TableHead className='text-right'>İşlemler</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers && customers.length === 0 ? (
          <TableRow className='bg-accent'>
            <TableCell>Kayıt bulunamadı</TableCell>
          </TableRow>
        ) : (
          customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>
                <div className='font-medium'>{customer.name}</div>
              </TableCell>
              <TableCell className='hidden sm:table-cell'>
                {customer.serial}
              </TableCell>
              <TableCell className='hidden sm:table-cell'>
                {customer.staff.name}
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
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default CustomerList;
