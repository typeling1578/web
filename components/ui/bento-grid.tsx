import {cn} from "@/lib/utils";
import React from "react";
import {Separator} from "@/components/ui/separator";
import {ScrollArea} from "@/components/ui/scroll-area";


const inputs = (height: string) => `grid md:auto-rows-[${height}rem] grid-cols-1 gap-4 max-w-7xl mx-auto`;
const shadow = 'shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]';
export const bentoTransition = "group-hover/bento:translate-x-2 group-hover/bento:translate-y-1 transition duration-200";

type BentoCardProps = {
  className?: string;
  children?: React.ReactNode;
  hasShadow?: boolean;
}

export const BentoCard = ({className, hasShadow, children}: BentoCardProps) => {
  return (
    <div
      className={'group/bento transition-all duration-200 rounded-xl row-span-1  border border-transparent hover:border-black/[0.2] hover:dark:border-white/[0.2] border-dashed justify-between flex flex-col space-y-4'}>
      <div className={cn(
        "z-30 hover:shadow-xl transition duration-200 shadow-input p-4 border border-black/[0.2] dark:border-white/[0.2] rounded-xl bg-card h-full",
        hasShadow ? shadow : '',
        className,
        "hover:shadow-xl transition duration-200 hover:translate-y-2 hover:translate-x-2"
      )}
      >
        {children}
      </div>
    </div>
  )
}

type BentoGridProps = {
  className?: string;
  children?: React.ReactNode;
  height?: string;
}

export const BentoGrid = ({className, children, height = '18'}: BentoGridProps) => {
  return (
    <div
      className={cn(
        inputs(height),
        className
      )}
    >
      {children}
    </div>
  );

}

export const TwoColBentoGrid = ({className, children, height = '18'}: BentoGridProps) => {
  return (
    <div
      className={cn(
        inputs(height),
        'md:grid-cols-2',
        className
      )}
    >
      {children}
    </div>
  );
};

export const ThreeColBentoGrid = ({className, children, height = '18'}: BentoGridProps) => {
  return (
    <div
      className={cn(
        inputs(height),
        'md:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  );
};

type CardGridItemProps = {
  className?: string;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  extra?: React.ReactNode;
  iconSize?: "sm" | "md" | "lg";
}

export const CardGridItem = ({className, title, description, icon, extra, iconSize = 'sm'}: CardGridItemProps) => {
  const titleAndDescription = (
    <div className="flex flex-col space-y-1">
      <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
        {title}
      </div>
      <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
        {description}
      </div>
    </div>
  );

  const mainContent = () => {
    if (!icon) {
      return titleAndDescription;
    }

    switch (iconSize) {
      case "sm":
        return (
          <>
            {icon}
            {titleAndDescription}
          </>
        );
      case "md":
      case "lg":
      default:
        return (
          <div className="flex h-full items-center space-x-4 shrink-0">
            <div>{icon}</div>
            <Separator orientation="vertical" className={'mt-0'} />
            {titleAndDescription}
          </div>
        );
    }
  }

  const extraContent = extra ? (
    <div className={bentoTransition}>
      {extra}
    </div>
  ) : <></>;

  return (
    <BentoCard
      className={cn(
        "relative justify-start",
        className
      )}
    >
      {extraContent}
      <Separator className={bentoTransition} orientation="horizontal"/>
      <div className={bentoTransition}>
        {mainContent()}
      </div>
    </BentoCard>
  );
}


type BentoGridItemProps = {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  scrollable?: boolean;
}

export const HeaderGridItem = ({className, title, description, scrollable, header, icon}: BentoGridItemProps) => {
  return (
    <BentoCard
      className={cn(
        className,
      )}
    >
      {header}
      <div>
        {icon}
        <div className="flex flex-col space-y-1">
          <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
            {title}
          </div>
          <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
            {description}
          </div>
        </div>
      </div>
    </BentoCard>
  );
};

export const ReverseHeaderGridItem = ({className, title, scrollable, description, header, icon}: BentoGridItemProps) => {

  const headerComponent = scrollable ? (
    <ScrollArea className='max-h-[22rem]'>
      {header}
    </ScrollArea> ) : header;

  return (
    <BentoCard
      className={cn(
        className
      )}
    >
      <div className={bentoTransition}>
        {icon}
        <div className="flex flex-col space-y-1">
          <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
            {title}
          </div>
          <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
            {description}
          </div>
        </div>
      </div>
      {headerComponent}
    </BentoCard>
  );
}