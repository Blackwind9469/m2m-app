"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import DeleteLink from "@/app/ui/dashboard/contract/delete-link";
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

type Contract = {
  id: string;
  sim_id: string;
  customer_id: string;
  device_id: string;
  type: string;
  license_plate: string;
  start: Date;
  finish: Date;
  created_at: string;
  hat: {
    id: string;
    serial: string;
    gsmno: string;
    tariff: string;
  };
  cihaz: {
    id: string;
    serial: string;
    type: string;
  };
  firma: {
    id: string;
    name: string;
    serial: string;
    represent: string;
    staff: {
      id: string;
      name: string;
    };
  };
};


const ContractList = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await fetch("/api/contracts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setContracts(data);
      } catch (error) {
        console.error("Error fetching contracts:", error);
      }
    };

    fetchContracts();
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow className='bg-accent border-b border-accent-800'>
          <TableHead colSpan={3} className='border-r border-accent-800 text-center'>SIM KART BİLGİLERİ</TableHead>
          <TableHead colSpan={3} className='border-r border-accent-800 text-center'>MÜŞTERİ BİLGİLERİ</TableHead>
          <TableHead colSpan={2} className='border-r border-accent-800 text-center'>CİHAZ BİLGİLERİ</TableHead>
          <TableHead colSpan={4} className='border-r border-accent-800 text-center'>SÖZLEŞME BİLGİLERİ</TableHead>
        </TableRow>
        <TableRow className='bg-accent border-b border-accent-800'>
          <TableHead className='border-r border-accent-800'>SIM Seri No</TableHead>
          <TableHead className='hidden sm:table-cell border-r border-accent-800'>GSM No</TableHead>
          <TableHead className='hidden sm:table-cell border-r border-accent-800'>Tarife</TableHead>
          <TableHead className='hidden sm:table-cell border-r border-accent-800'>Unvan</TableHead>
          <TableHead className='hidden sm:table-cell border-r border-accent-800'>Vergi No/TCKN</TableHead>
          <TableHead className='hidden sm:table-cell border-r border-accent-800'>Temsilci</TableHead>
          <TableHead className='hidden md:table-cell border-r border-accent-800'>Model</TableHead>
          <TableHead className='hidden md:table-cell border-r border-accent-800'>Seri No</TableHead>
          <TableHead className='hidden md:table-cell border-r border-accent-800'>Tipi</TableHead>
          <TableHead className='hidden md:table-cell border-r border-accent-800'>Plaka</TableHead>
          <TableHead className='hidden md:table-cell border-r border-accent-800'>Başlangıç</TableHead>
          <TableHead className='hidden md:table-cell border-r border-accent-800'>Bitiş</TableHead>
          <TableHead className='text-right'>İşlemler</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contracts && contracts.length === 0 ? (
          <TableRow className='bg-accent'>
            <TableCell>Kayıt bulunamadı</TableCell>
          </TableRow>
        ) : (
          contracts.map((contract) => (
            <TableRow key={contract.id}>
              <TableCell>
                <div className='font-medium'>{contract.hat.serial}</div>
              </TableCell>
              <TableCell className='hidden sm:table-cell'>
                {contract.hat.gsmno}
              </TableCell>
              <TableCell className='hidden sm:table-cell'>
                {contract.hat.tariff}
              </TableCell>
              <TableCell className='hidden sm:table-cell'>
                {contract.firma.name}
              </TableCell>
              <TableCell className='hidden sm:table-cell'>
                {contract.firma.serial}
              </TableCell>
              <TableCell className='hidden sm:table-cell'>
                {contract.firma.represent}
              </TableCell>
              <TableCell className='hidden sm:table-cell'>
                {contract.cihaz.type}
              </TableCell>
              <TableCell className='hidden sm:table-cell'>
                {contract.cihaz.serial}
              </TableCell>
              <TableCell className='hidden sm:table-cell'>
                {contract.type}
              </TableCell>
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
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ContractList;
