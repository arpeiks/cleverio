"use client";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerClose,
  DrawerTitle,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerTrigger,
  DrawerDescription,
} from "@/components/ui/drawer";

import React from "react";
import { useAtom } from "jotai";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import { settingsAtom } from "@/lib/atoms";
import { Button } from "@/components/ui/button";
import { PasswordValidations } from "@/lib/types";
import { passwordValidators } from "@/lib/password";
import { Checkbox } from "@/components/ui/checkbox";
import { useMediaQuery } from "@/hooks/use-media-query";

const options = Object.keys(passwordValidators)
  .filter((key) => key !== PasswordValidations.MORE_THAN_10_DIGITS)
  .map((key) => ({
    id: key as any as PasswordValidations,
    desc: passwordValidators[key as PasswordValidations].desc,
  }));

export const SettingsModal = () => {
  const title = "Settings";
  const description = "Make changes to the criteria here.";

  const SettingsIcon = (
    <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
      <Settings className="cursor-pointer hover:rotate-180 transition" />
    </div>
  );

  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{SettingsIcon}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{SettingsIcon}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const ProfileForm = ({ className }: React.ComponentProps<"form">) => {
  const [settings, updateSettings] = useAtom(settingsAtom);

  const handleCheckedChange = (title: PasswordValidations, value: boolean) => {
    updateSettings((prev) => ({ ...prev, [title]: value }));
  };

  return (
    <form className={cn("grid items-start gap-4", className)}>
      {options.map((o) => (
        <div key={o.id} className="flex items-center space-x-2">
          <Checkbox
            id={o.id}
            checked={settings[o.id]}
            onCheckedChange={(v) => handleCheckedChange(o.id, Boolean(v))}
          />
          <label
            htmlFor={o.id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {o.desc}
          </label>
        </div>
      ))}
    </form>
  );
};
