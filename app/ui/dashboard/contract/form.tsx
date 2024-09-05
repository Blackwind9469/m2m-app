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
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { tr } from "date-fns/locale";
import addContract from "@/app/actions/contract/add";
import editContract from "@/app/actions/contract/edit";
import { ContractData } from "@/app/types/contract";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const requiredMessage = "Boş bırakmayınız !";
const FormSchema = z.object({
  sim_id: z.string({ message: requiredMessage }),
  customer_id: z.string({ message: requiredMessage }),
  device_id: z.string({ message: requiredMessage }),
  type: z.string({ message: requiredMessage }),
  license_plate: z.string({ message: requiredMessage }),
  created_at: z.string({ message: requiredMessage }),
  start: z.date({ message: requiredMessage }),
  finish: z.date({ message: requiredMessage }),
});

type User = {
  id: string;
  name: string;
};
type Sim = {
  id: string;
  serial: string;
};
type Customer = {
  id: string;
  name: string;
};
type Device = {
  id: string;
  serial: string;
};

const ContractForm = ({
  contract,
  edit,
}: {
  contract: ContractData | undefined | null;
  edit: boolean;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [sims, setSims] = useState<Sim[]>([]);

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

  const fetchCustomers = async () => {
    try {
      const response = await fetch("/api/customers");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch customers. Please try again.",
      });
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await fetch("/api/devices");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDevices(data);
    } catch (error) {
      console.error("Error fetching devices:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch devices. Please try again.",
      });
    }
  };
  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchSims = async () => {
    try {
      const response = await fetch("/api/sims");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSims(data);
    } catch (error) {
      console.error("Error fetching sims:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch sims. Please try again.",
      });
    }
  };
  useEffect(() => {
    fetchSims();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sim_id: contract?.sim_id,
      customer_id: contract?.customer_id,
      device_id: contract?.device_id,
      type: contract?.type,
      license_plate: contract?.license_plate,
      start: contract?.start,
      finish: contract?.finish,
    },
  });

  const clientAction = async (values: any) => {
    setLoading(true);
    let errorX: any = {};
    if (edit) {
      const id: any = contract?.id;
      const { data, error } = await editContract(values, id);
      errorX = error;
      setLoading(false);
    } else {
      const { data, error } = await addContract(values);
      errorX = error;
      setLoading(false);
    }
    if (errorX) {
      toast({
        variant: "destructive",
        title: "Sözleşmeler",
        description: errorX,
      });
    } else {
      toast({
        title: "Sözleşmeler",
        description: "İşlem Başarılı",
      });
      router.push("/dashboard/contracts");
    }
  };

  function onSubmit(values: z.infer<typeof FormSchema>) {
    clientAction(values);
  }

  const getUserNameById = (id: string) => {
    const user = users.find((user) => user.id === id);
    return user ? user.name : "";
  };
  const getCustomerNameById = (id: string) => {
    const customer = customers.find((customer) => customer.id === id);
    return customer ? customer.name : "";
  };
  const getDeviceSerialById = (id: string) => {
    const device = devices.find((device) => device.id === id);
    return device ? device.serial : "";
  };
  const getSimSerialById = (id: string) => {
    const sim = sims.find((sim) => sim.id === id);
    return sim ? sim.serial : "";
  };

  return (
    <Card x-chunk='dashboard-05-chunk-3'>
      <CardHeader className='px-7'>
        <div className='flex items-center'>
          <div>
            <CardTitle>Sözleşme {edit ? "Düzenle" : "Ekle"}</CardTitle>
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
                name='sim_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SIM Seri No</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Sim Kart seçin'>
                            {field.value
                              ? getSimSerialById(field.value)
                              : "Sim Kart Seçin"}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sims.map((sim) => (
                          <SelectItem key={sim.id} value={sim.id}>
                            {sim.serial}
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
                name='customer_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Müşteri</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Müşteri seçin'>
                            {field.value
                              ? getCustomerNameById(field.value)
                              : "Müşteri Seçin"}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {customers.map((customer) => (
                          <SelectItem key={customer.id} value={customer.id}>
                            {customer.name}
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
                name='device_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cihaz Seri No</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Cıhaz seçin'>
                            {field.value
                              ? getDeviceSerialById(field.value)
                              : "Cihaz Seçin"}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {devices.map((device) => (
                          <SelectItem key={device.id} value={device.id}>
                            {device.serial}
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
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sözleşme Tipi</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='Sözleşme Tipi Giriniz..' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='license_plate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Araç Plaka</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='Plaka No Giriniz..' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='start'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Sözleşme Başlangıcı</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd-MM-yyyy")
                            ) : (
                              <span>Tarih Seçiniz</span>
                            )}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Bu alanda sözleşme başlangıç tarihi seçilecektir
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='finish'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Sözleşme Bitişi</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd-MM-yyyy")
                            ) : (
                              <span>Tarih Seçiniz</span>
                            )}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Bu alanda sözleşme bitiş tarihi seçilecektir
                    </FormDescription>
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

export default ContractForm;
