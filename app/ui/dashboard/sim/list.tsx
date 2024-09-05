import { SimData } from "@/app/types/sim";
import getSimList from "@/app/actions/sim/get_list";
import SimListItem from "./list-item";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default async function SimList() {
    const { sims, error } = await getSimList();

    return (
        <Table>
            <TableHeader>
                <TableRow className="bg-accent">
                    <TableHead>Seri No</TableHead>
                    <TableHead className="hidden sm:table-cell">
                        GSM No
                    </TableHead>
                    <TableHead className="hidden sm:table-cell">
                        Tarife
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                        Tarih
                    </TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {sims && sims.length === 0 ? (
                    <TableRow className="bg-accent">
                        <TableCell>Kayıt bulunamadı</TableCell>
                    </TableRow>
                ) : (
                    sims?.map((sim: SimData) => (
                        <SimListItem sim={sim} key={sim.id} />
                    ))
                )}
            </TableBody>
        </Table>
    );
}
