import React, { ReactNode } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ActionTooltip {
  children: ReactNode;
  label: string;
  sideOffset?:number
}

export const ActionTooltip = ({ children, label, sideOffset = 4 }: ActionTooltip) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild >{children}</TooltipTrigger>
        <TooltipContent  sideOffset={sideOffset}>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
