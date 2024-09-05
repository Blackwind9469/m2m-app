import Link from "next/link";
import { Suspense } from "react";
import { Metadata } from "next";
//import CustomerList from "@/app/ui/dashboard/customer/list";
import CustomerList from "@/components/CustomerList";
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
  title: "Müşteriler",
};

export default async function Customer() {
  return (
    <>
      <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
        <Card x-chunk='dashboard-05-chunk-3'>
          <CardHeader className='px-7'>
            <div className='flex items-center'>
              <div>
                <CardTitle>Müşteriler</CardTitle>
                <CardDescription>Firma Müşterileri</CardDescription>
              </div>
              <div className='ml-auto flex items-center gap-2'>
                <Button asChild>
                  <Link href='/dashboard/customers/create'>
                    <p className='hidden md:block'>Müşteri Ekle</p>
                  </Link>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Loading />}>
              <CustomerList />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
