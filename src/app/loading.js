import { Skeleton } from "@/components/ui/skeleton";

export default function Loading(){
    return <div className="flex flex-col space-x-3">
        <Skeleton className='min-h-[630px] h-full w-full bg-zinc-500'/>
    </div>
}