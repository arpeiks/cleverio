import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import React from "react";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { PasswordValidations } from "@/lib/types";
import { passwordValidators } from "@/lib/password";
import { useMediaQuery } from "@/hooks/use-media-query";

type Props = {
  list: any;
  visible?: boolean;
  validations?: PasswordValidations[];
};

const PasswordInputError = ({
  list,
  visible = false,
  validations = [],
}: Props) => {
  const [open, setOpen] = React.useState(true);
  const breakpoint = useMediaQuery("(min-width: 1080px)");
  const toggleVisibility = () => setOpen((prev) => !prev);

  const config: any = {
    side: breakpoint ? "right" : "top",
    align: breakpoint ? "center" : "end",
  };

  return (
    <div className={cn("hidden cursor-pointer", visible && "block")}>
      <Popover defaultOpen open={open}>
        <PopoverTrigger asChild onClick={toggleVisibility}>
          <X className="w-4 h-4 text-red-600" />
        </PopoverTrigger>
        <PopoverContent
          side={config.side}
          align={config.align}
          //   side="top"
          //   align="end"
          sideOffset={28}
          className={cn("w-88 hidden", visible && "block")}
        >
          <div className="flex flex-col gap-0.5">
            {validations.map((v: PasswordValidations) => {
              const isValid = !!list[v];
              const Icon = isValid ? Check : X;

              return (
                <div
                  key={v}
                  className={cn(
                    "flex items-center gap-2 text-sm",
                    isValid && "text-green-800",
                    !isValid && "text-red-600"
                  )}
                >
                  {<Icon className="w-3 h-3" />}{" "}
                  <span>{passwordValidators?.[v]?.desc}</span>
                </div>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PasswordInputError;
