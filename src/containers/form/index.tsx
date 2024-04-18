"use client";

import {
  validatePassword,
  getActiveValidations,
  getPasswordStrength,
} from "@/lib/password";
import React from "react";
import { useAtom } from "jotai";
import { cn } from "@/lib/utils";
import PasswordInputError from "./error";
import { Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PasswordValidations } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import { formAtom, settingsAtom } from "@/lib/atoms";

const Form = () => {
  const [settings] = useAtom(settingsAtom);
  const [form, setForm] = useAtom(formAtom);
  const [loading, setLoading] = React.useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const activeValidations = getActiveValidations(
    settings
  ) as PasswordValidations[];

  const passwordStrength = getPasswordStrength(form.password);
  const passwordStatus = validatePassword(form.password, activeValidations);

  const isFormInvalid =
    !form.email.trim() || !form.password || !passwordStatus.isValid;

  React.useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <p>loading</p>;

  return (
    <div className="w-full max-w-sm">
      <h1 className="font-medium text-xl text-center mb-6">Cleverio</h1>

      <div className="flex flex-col gap-4">
        <div>
          <Label htmlFor="email" className="text-gray-500 font-normal">
            email address
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            className="mt-0.5"
            value={form.email}
            onChange={handleChange}
            placeholder="enter email address"
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-gray-500 font-normal">
            password
          </Label>

          <div className="relative mb-2">
            <Input
              id="password"
              name="password"
              type="password"
              className="mt-0.5"
              value={form.password}
              onChange={handleChange}
              placeholder="enter your password"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Check
                className={cn(
                  "w-4 h-4 text-green-800 hidden",
                  passwordStatus.isValid && "block"
                )}
              />
              <PasswordInputError
                list={passwordStatus.list}
                validations={activeValidations}
                visible={!passwordStatus.isValid}
              />
            </div>
          </div>

          <Progress
            value={form.password.length ? passwordStrength.value : 0}
            className={cn(`w-full h-[3px] [&_*]:${passwordStrength.bgColor}`)}
          />
        </div>

        <Button disabled={isFormInvalid}>Proceed</Button>
      </div>
    </div>
  );
};

export default Form;
