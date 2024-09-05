"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import addUser from "@/app/actions/user/add";
import editUser from "@/app/actions/user/edit";
import { UserData } from "@/app/types/user";

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
  name: z.string({ message: requiredMessage }),
  phone: z.string({ message: requiredMessage }),
});

const UserForm = ({
  user,
  edit,
}: {
  user: UserData | undefined | null;
  edit: boolean;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name,
      phone: user?.phone,
    },
  });

  const clientAction = async (values: any) => {
    setLoading(true);
    let errorX: any = {};
    if (edit) {
      const id: any = user?.id;
      const { data, error } = await editUser(values, id);
      errorX = error;
      setLoading(false);
    } else {
      const { data, error } = await addUser(values);
      errorX = error;
      setLoading(false);
    }
    if (errorX) {
      toast({
        variant: "destructive",
        title: "Satış Temsilcileri",
        description: errorX,
      });
    } else {
      toast({
        title: "Satış Temsilcileri",
        description: "İşlem Başarılı",
      });
      router.push("/dashboard/users");
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
            <CardTitle>Satış Temsilcisi {edit ? "Düzenle" : "Ekle"}</CardTitle>
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
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>İsim</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='İsim Giriniz..' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon No</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Telefon No Giriniz..' />
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

export default UserForm;
