import Link from "next/link";

import {
  Home,
  FileDiff,
  LineChart,
  Contact,
  Package2,
  Settings,
  Users2,
  Microchip,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

export default function SideNav() {
  return (
    <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
      <nav className='flex flex-col items-center gap-4 px-2 sm:py-4'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href='/dashboard'
                className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
              >
                <Home className='h-5 w-5' />
                <span className='sr-only'>Anasayfa</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Anasayfa</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href='/dashboard/contracts'
                className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
              >
                <Package2 className='h-5 w-5 transition-all group-hover:scale-110' />
                <span className='sr-only'>Sözleşmeler</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Sözleşmeler</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href='/dashboard/sims'
                className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
              >
                <FileDiff className='h-5 w-5' />
                <span className='sr-only'>SIM Hatlar</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>SIM Hatlar</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href='/dashboard/devices'
                className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
              >
                <Microchip className='h-5 w-5' />
                <span className='sr-only'>Cihazlar</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Cihazlar</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href='/dashboard/users'
                className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
              >
                <Contact className='h-5 w-5' />
                <span className='sr-only'>Satış Temsilcileri</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Satış Temsilcileri</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href='/dashboard/customers'
                className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
              >
                <Users2 className='h-5 w-5' />
                <span className='sr-only'>Müşteriler</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Müşteriler</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href='/dashboard'
                className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
              >
                <LineChart className='h-5 w-5' />
                <span className='sr-only'>Analytics</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Analytics</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-4'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href='#'
                className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
              >
                <Settings className='h-5 w-5' />
                <span className='sr-only'>Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}
