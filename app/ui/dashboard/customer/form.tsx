"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import addCustomer from "@/app/actions/customer/add";
import editCustomer from "@/app/actions/customer/edit";
import { CustomerData } from "@/app/types/customer";

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
  serial: z.string({ message: requiredMessage }),
  represent: z.string({ message: requiredMessage }),
  contact: z.string({ message: requiredMessage }),
});

type User = {
  id: string;
  name: string;
};
const CustomerForm = ({
  customer,
  edit,
}: {
  customer: CustomerData | undefined | null;
  edit: boolean;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch users. Please try again.",
      });
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: customer?.name,
      serial: customer?.serial,
      contact: customer?.contact,
      represent: customer?.represent,
    },
  });

  const clientAction = async (values: any) => {
    setLoading(true);
    let errorX: any = {};
    if (edit) {
      const id: any = customer?.id;
      const { data, error } = await editCustomer(values, id);
      errorX = error;
      setLoading(false);
    } else {
      const { data, error } = await addCustomer(values);
      errorX = error;
      setLoading(false);
    }
    if (errorX) {
      toast({
        variant: "destructive",
        title: "Müşteriler",
        description: errorX,
      });
    } else {
      toast({
        title: "Müşteriler",
        description: "İşlem Başarılı",
      });
      router.push("/dashboard/customers");
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    //console.log(values);
    clientAction(values);
  }

  const getUserNameById = (id: string) => {
    const user = users.find((user) => user.id === id);
    return user ? user.name : "";
  };

  return (
    <Card x-chunk='dashboard-05-chunk-3'>
      <CardHeader className='px-7'>
        <div className='flex items-center'>
          <div>
            <CardTitle>Müşteriler {edit ? "Düzenle" : "Ekle"}</CardTitle>
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
                  <FormLabel>Müşteri ismi</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Müşteri İsmi Giriniz..' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='serial'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vergi No</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Vergi No Giriniz..' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='represent'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Temsilci</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Temsilci seçin'>
                          {field.value
                            ? getUserNameById(field.value)
                            : "Temsilci seçin"}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='contact'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Yetkili İsmi</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Yetkili İsmi Giriniz..' />
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
export default CustomerForm;
