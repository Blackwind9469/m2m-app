"use client";
import { useRouter } from "next/navigation";

import deleteContract from "@/app/actions/contract/delete_row";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DeleteLink({ id }: { id: string }) {
  const { toast } = useToast();
  const router = useRouter();

  const deleteAction = async (id: string) => {
    const { message, error } = await deleteContract(id);
    if (error) {
      toast({
        variant: "destructive",
        title: "SÖZLEŞMELER",
        description: error,
      });
    }
    toast({
      title: "SÖZLEŞMELER",
      description: message,
    });
    router.push("/dashboard/contracts");
  };

  /*
    return (
        <Button variant="outline" size="icon" onClick={() => deleteAction(id)}>
            <Trash2 className="h-4 w-4" />
        </Button>
    );
    */
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant='outline' size='icon'>
          <Trash2 className='h-4 w-4' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
          <AlertDialogDescription>
            Bu işlem geri alınamaz. İlgili kayıt kalıcı olarak silecek ve
            verilerinizi sunucularımızdan kaldıracaktır.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>İptal</AlertDialogCancel>
          <AlertDialogAction>
            <button onClick={() => deleteAction(id)}>Evet</button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
