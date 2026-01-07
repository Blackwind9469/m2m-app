"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import addSim from "@/app/actions/sim/add";
import editSim from "@/app/actions/sim/edit";
import { SimData } from "@/app/types/sim";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const requiredMessage = "Boş bırakmayınız !";
const formSchema = z.object({
    serial: z.string({ message: requiredMessage }),
    gsmno: z.string({ message: requiredMessage }),
    tariff: z.string({ message: requiredMessage }),
});

const SimForm = ({
    sim,
    edit,
}: {
    sim: SimData | undefined | null;
    edit: boolean;
}) => {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            serial: sim?.serial,
            gsmno: sim?.gsmno,
            tariff: sim?.tariff,
        },
    });

    const clientAction = async (values: any) => {
        setLoading(true);
        let errorX: any = {};
        if (edit) {
            const id: any = sim?.id;
            const { data, error } = await editSim(values, id);
            errorX = error;
            setLoading(false);
        } else {
            const { data, error } = await addSim(values);
            errorX = error;
            setLoading(false);
        }
        if (errorX) {
            toast({
                variant: "destructive",
                title: "SIM Hatlar",
                description: errorX,
            });
        } else {
            toast({
                title: "SIM Hatlar",
                description: "İşlem Başarılı",
            });
            router.push("/dashboard/sims");
        }
    };

    function onSubmit(values: z.infer<typeof formSchema>) {
        //console.log(values);
        clientAction(values);
    }
    return (
        <Card x-chunk="dashboard-05-chunk-3">
            <CardHeader className="px-7">
                <div className="flex items-center">
                    <div>
                        <CardTitle>
                            SIM Hat {edit ? "Düzenle" : "Ekle"}
                        </CardTitle>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-2/3 space-y-6">
                        <FormField
                            control={form.control}
                            name="serial"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Seri No</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Seri No Giriniz.."
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gsmno"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>GSM No</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="GSM No Giriniz.."
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tariff"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tarife</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Tarife Giriniz.."
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={loading ? true : false} type="submit">
                            {loading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : null}
                            {edit ? "Güncelle" : "Ekle"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default SimForm;
