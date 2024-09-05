import Link from "next/link";
import { Suspense } from "react";
import { Metadata } from "next";
import DeviceList from "@/app/ui/dashboard/device/list";

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
  title: "Cihazlar",
};

export default async function Device() {
  return (
    <>
      <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
        <Card x-chunk='dashboard-05-chunk-3'>
          <CardHeader className='px-7'>
            <div className='flex items-center'>
              <div>
                <CardTitle>Cihazlar</CardTitle>
                <CardDescription>Stokta yer alan cihazlar</CardDescription>
              </div>
              <div className='ml-auto flex items-center gap-2'>
                <Button asChild>
                  <Link href='/dashboard/devices/create'>
                    <p className='hidden md:block'>Cihaz Ekle</p>
                  </Link>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Loading />}>
              <DeviceList />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
