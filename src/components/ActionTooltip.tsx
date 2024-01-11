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
}

export const ActionTooltip = ({ children, label }: ActionTooltip) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild >{children}</TooltipTrigger>
        <TooltipContent  sideOffset={4}>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
