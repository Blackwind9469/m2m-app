import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
    return (
        <div className="flex items-center space-x-4">
            <div className="space-y-2 w-full">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-full" />
            </div>
        </div>
    );
}
