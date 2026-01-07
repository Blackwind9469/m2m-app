import Link from "next/link";
import { SimData } from "@/app/types/sim";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import DeleteLink from "./delete-link";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import moment from "moment";

export default async function SimListItem({ sim }: { sim: SimData }) {
    return (
        <TableRow key={sim.id}>
            <TableCell>
                <div className="font-medium">{sim.serial}</div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">{sim.gsmno}</TableCell>
            <TableCell className="hidden sm:table-cell">
                <Badge className="text-xs" variant="secondary">
                    {sim.tariff}
                </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {moment(sim.created_at, "YYYY-MM-DD").format("DD-MM-YYYY")}
            </TableCell>
            <TableCell className="text-right">
                <div className="flex justify-end gap-3">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={"/dashboard/sims/edit/" + sim.id}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                    <DeleteLink id={sim.id} />
                </div>
            </TableCell>
        </TableRow>
    );
}
