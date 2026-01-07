import Link from "next/link";
import { Suspense } from "react";
import { Metadata } from "next";
import UserList from "@/app/ui/dashboard/user/list";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loading from "@/app/ui/dashboard/loading";

export const metadata: Metadata = {
  title: "Satış Temsilcileri",
};

export default async function User() {
  return (
    <>
      <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
        <Card x-chunk='dashboard-05-chunk-3'>
          <CardHeader className='px-7'>
            <div className='flex items-center'>
              <div>
                <CardTitle>Satış Temsilcileri</CardTitle>
                <CardDescription>
                  Firmada çalışan satış temsilcileri
                </CardDescription>
              </div>
              <div className='ml-auto flex items-center gap-2'>
                <Button asChild>
                  <Link href='/dashboard/users/create'>
                    <p className='hidden md:block'>Satış Temsilcisi Ekle</p>
                  </Link>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Loading />}>
              <UserList />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
