import Link from "next/link";
import { Suspense } from "react";
import { Metadata } from "next";
import SimList from "@/app/ui/dashboard/sim/list";

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
    title: "SIM Hatlar",
};

export default async function Sim() {
    return (
        <>
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="px-7">
                        <div className="flex items-center">
                            <div>
                                <CardTitle>SIM Hatlar</CardTitle>
                                <CardDescription>
                                    Stokta yer alan hatlar
                                </CardDescription>
                            </div>
                            <div className="ml-auto flex items-center gap-2">
                                <Button asChild>
                                    <Link href="/dashboard/sims/create">
                                        <p className="hidden md:block">
                                            SIM Hat Ekle
                                        </p>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Suspense fallback={<Loading />}>
                            <SimList />
                        </Suspense>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
