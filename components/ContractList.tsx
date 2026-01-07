"use client";
import React from "react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import DeleteLink from "@/app/ui/dashboard/contract/delete-link";
import { Button } from "@/components/ui/button";
import { Pencil, ChevronUp, ChevronDown } from "lucide-react";
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
  remainingDays: number;
};

type SortableHeaderProps = {
  label: string;
  sortKey: NestedKeyOf<Contract>;
  className?: string;
};

type SortConfig = {
  key: keyof Contract | string;
  direction: "asc" | "desc";
};
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

const getNestedValue = <T extends object>(
  obj: T,
  path: NestedKeyOf<T>
): any => {
  return path
    .split(".")
    .reduce((acc, part) => acc && acc[part as keyof typeof acc], obj as any);
};

const ContractList = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "",
    direction: "asc",
  });

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await fetch("/api/contracts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const contractsWithRemainingDays = data.map((contract: Contract) => ({
          ...contract,
          remainingDays: calculateRemainingDays(contract.finish),
        }));
        setContracts(contractsWithRemainingDays);
      } catch (error) {
        console.error("Error fetching contracts:", error);
      }
    };

    fetchContracts();
  }, []);

  const calculateRemainingDays = (finishDate: Date): number => {
    const today = moment();
    const finish = moment(finishDate);
    return finish.diff(today, "days");
  };

  const getRemainingDaysStyle = (days: number) => {
    if (days < 30) {
      return "bg-red-200 text-red-800 font-medium";
    } else if (days < 60) {
      return "bg-yellow-200 text-yellow-800 font-medium";
    } else {
      return "bg-green-200 text-green-800 font-medium";
    }
  };

  const sortData = (key: NestedKeyOf<Contract>) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedContracts = [...contracts].sort((a, b) => {
      const aValue = getNestedValue(a, key);
      const bValue = getNestedValue(b, key);

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setContracts(sortedContracts);
  };

  const SortableHeader: React.FC<SortableHeaderProps> = ({
    label,
    sortKey,
    className = "",
  }) => (
    <TableHead
      className={`cursor-pointer border-r border-accent-800 ${className}`}
      onClick={() => sortData(sortKey)}
    >
      <div className='flex items-center justify-between'>
        <span>{label}</span>
        <span className='flex items-center'>
          {sortConfig.key === sortKey &&
            (sortConfig.direction === "asc" ? (
              <ChevronUp className='ml-1 h-4 w-4' />
            ) : (
              <ChevronDown className='ml-1 h-4 w-4' />
            ))}
        </span>
      </div>
    </TableHead>
  );

  return (
    <Table>
      <TableHeader>
        <TableRow className='bg-accent border-b border-accent-800'>
          <TableHead
            colSpan={3}
            className='border-r border-accent-800 text-center'
          >
            <Badge className='text-nowrap' variant='outline'>
              SIM KART BİLGİLERİ
            </Badge>
          </TableHead>
          <TableHead
            colSpan={3}
            className='border-r border-accent-800 text-center'
          >
            <Badge className='text-nowrap' variant='outline'>
              MÜŞTERİ BİLGİLERİ
            </Badge>
          </TableHead>
          <TableHead
            colSpan={2}
            className='border-r border-accent-800 text-center'
          >
            <Badge className='text-nowrap' variant='outline'>
              CİHAZ BİLGİLERİ
            </Badge>
          </TableHead>
          <TableHead
            colSpan={5}
            className='border-r border-accent-800 text-center'
          >
            <Badge className='text-nowrap' variant='outline'>
              SÖZLEŞME BİLGİLERİ
            </Badge>
          </TableHead>
        </TableRow>
        <TableRow className='bg-accent border-b border-accent-800'>
          <SortableHeader label='SIM Seri No' sortKey='hat.serial' />
          <SortableHeader label='GSM No' sortKey='hat.gsmno' />
          <SortableHeader label='Tarife' sortKey='hat.tariff' />
          <SortableHeader label='Unvan' sortKey='firma.name' />
          <SortableHeader label='Vergi No/TCKN' sortKey='firma.serial' />
          <SortableHeader label='Temsilci' sortKey='firma.staff.name' />
          <SortableHeader label='Model' sortKey='cihaz.type' />
          <SortableHeader label='Seri No' sortKey='cihaz.serial' />
          <SortableHeader label='Tipi' sortKey='type' />
          <SortableHeader label='Plaka' sortKey='license_plate' />
          <SortableHeader label='Başlangıç' sortKey='start' />
          <SortableHeader label='Bitiş' sortKey='finish' />
          <SortableHeader label='Kalan Gün' sortKey='remainingDays' />
          <TableHead className='text-right border-l border-accent-800'>
            İşlemler
          </TableHead>
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
                <Badge className='text-xs, text-nowrap' variant='outline'>
                  <div className='font-medium'>{contract.hat.serial}</div>
                </Badge>
              </TableCell>
              <TableCell className='hidden sm:table-cell'>
                <Badge className='text-xs, text-nowrap' variant='outline'>
                  {contract.hat.gsmno}
                </Badge>
              </TableCell>
              <TableCell className='hidden sm:table-cell'>
                <Badge className='text-xs, text-nowrap' variant='outline'>
                  {contract.hat.tariff}
                </Badge>
              </TableCell>
              <TableCell className='hidden sm:table-cell'>
                <Badge className='text-xs, text-nowrap' variant='outline'>
                  {contract.firma.name}
                </Badge>
              </TableCell>
              <TableCell className='hidden sm:table-cell'>
                <Badge className='text-xs, text-nowrap' variant='outline'>
                  {contract.firma.serial}
                </Badge>
              </TableCell>
              <TableCell className='hidden sm:table-cell'>
                <Badge className='text-xs, text-nowrap' variant='outline'>
                  {contract.firma.staff.name}
                </Badge>
              </TableCell>
              <TableCell className='hidden sm:table-cell'>
                <Badge className='text-xs, text-nowrap' variant='outline'>
                  {contract.cihaz.type}
                </Badge>
              </TableCell>
              <TableCell className='hidden sm:table-cell'>
                <Badge className='text-xs, text-nowrap' variant='outline'>
                  {contract.cihaz.serial}
                </Badge>
              </TableCell>
              <TableCell className='hidden sm:table-cell'>
                <Badge className='text-xs, text-nowrap' variant='outline'>
                  {contract.type}
                </Badge>
              </TableCell>
              <TableCell className='hidden sm:table-cell'>
                <Badge className='text-xs, text-nowrap' variant='outline'>
                  {contract.license_plate}
                </Badge>
              </TableCell>
              <TableCell className='hidden md:table-cell'>
                <Badge className='text-xs, text-nowrap' variant='outline'>
                  {moment(contract.start).format("DD-MM-YYYY")}
                </Badge>
              </TableCell>
              <TableCell className='hidden md:table-cell'>
                <Badge className='text-xs, text-nowrap' variant='outline'>
                  {moment(contract.finish).format("DD-MM-YYYY")}
                </Badge>
              </TableCell>
              <TableCell
                className={`hidden md:table-cell ${getRemainingDaysStyle(
                  contract.remainingDays
                )}`}
              >
                {contract.remainingDays}
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
