"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import addDevice from "@/app/actions/device/add";
import editDevice from "@/app/actions/device/edit";
import { DeviceData } from "@/app/types/device";

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
  type: z.string({ message: requiredMessage }),
});

const DeviceForm = ({
  device,
  edit,
}: {
  device: DeviceData | undefined | null;
  edit: boolean;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serial: device?.serial,
      type: device?.type,
    },
  });

  const clientAction = async (values: any) => {
    setLoading(true);
    let errorX: any = {};
    if (edit) {
      const id: any = device?.id;
      const { data, error } = await editDevice(values, id);
      errorX = error;
      setLoading(false);
    } else {
      const { data, error } = await addDevice(values);
      errorX = error;
      setLoading(false);
    }
    if (errorX) {
      toast({
        variant: "destructive",
        title: "Cihazlar",
        description: errorX,
      });
    } else {
      toast({
        title: "Cihazlar",
        description: "İşlem Başarılı",
      });
      router.push("/dashboard/devices");
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    //console.log(values);
    clientAction(values);
  }
  return (
    <Card x-chunk='dashboard-05-chunk-3'>
      <CardHeader className='px-7'>
        <div className='flex items-center'>
          <div>
            <CardTitle>Cihaz {edit ? "Düzenle" : "Ekle"}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-2/3 space-y-6'
          >
            <FormField
              control={form.control}
              name='serial'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seri No</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Seri No Giriniz..' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cihaz tipi</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Cihaz Tipi Giriniz..' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading ? true : false} type='submit'>
              {loading ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : null}
              {edit ? "Güncelle" : "Ekle"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DeviceForm;
