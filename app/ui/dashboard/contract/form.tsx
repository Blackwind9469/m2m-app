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
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
const requiredMessage = "Boş bırakmayınız !";
const FormSchema = z.object({
  sim_id: z.string({ message: requiredMessage }),
  customer_id: z.string({ message: requiredMessage }),
  device_id: z.string({ message: requiredMessage }),
  type: z.string({ message: requiredMessage }),
  license_plate: z.string({ message: requiredMessage }),
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
      start: contract?.start ? new Date(contract.start) : undefined,
      finish: contract?.finish ? new Date(contract.finish) : undefined,
    },
  });

  

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
  const clientAction = async (values: z.infer<typeof FormSchema>) => {
    console.log("clientAction started");
    setLoading(true);
    console.log("Form Values:", JSON.stringify(values, (key, value) => {
      if (value instanceof Date) {
        return value.toISOString();
      }
      return value;
    }, 2));

    // Save form values to localStorage
    try {
      localStorage.setItem('lastFormSubmission', JSON.stringify(values, (key, value) => {
        if (value instanceof Date) {
          return value.toISOString();
        }
        return value;
      }));
      console.log("Form values saved to localStorage");

      let result;
      if (edit) {
        const id: any = contract?.id;
        console.log("Calling editContract");
        result = await editContract(values, id);
      } else {
        console.log("Calling addContract");
        result = await addContract(values);
      }
      console.log("Contract operation result:", result);

      if (result.error) {
        throw new Error(result.error);
      }
      console.log("Contract operation successful");
      toast({
        title: "Sözleşmeler",
        description: "İşlem Başarılı",
      });
      router.push("/dashboard/contracts");
    } catch (error) {
      console.error("Error in contract operation:", error);
      toast({
        variant: "destructive",
        title: "Sözleşmeler",
        description: "An error occurred",
      });
    } finally {
      setLoading(false);
      console.log("clientAction finished");
    }
  };

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log("Form submitted. Calling clientAction...");
    clientAction(values);
  }
  console.log("Form errors:", form.formState.errors);

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
            onSubmit={(e) => {
              console.log("Form submit event triggered");
              form.handleSubmit(onSubmit)(e);
            }} 
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
                <FormItem>
                  <FormLabel>Sözleşme Başlangıcı</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      value={field.value ? field.value.toISOString().split('T')[0] : ''}
                      onChange={(e) => {
                        console.log("Start date changed:", e.target.value);
                        field.onChange(new Date(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='finish'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sözleşme Bitişi</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      value={field.value ? field.value.toISOString().split('T')[0] : ''}
                      onChange={(e) => {
                        console.log("Finish date changed:", e.target.value);
                        field.onChange(new Date(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              disabled={loading} 
              type='submit'
              onClick={() => console.log("Submit button clicked")}
            >
              {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              {edit ? "Güncelle" : "Ekle"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ContractForm;
