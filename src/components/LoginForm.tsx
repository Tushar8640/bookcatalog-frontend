import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useLoginMutation } from "@/redux/features/auth/authApi";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [login, { isLoading, data }] = useLoginMutation();
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    login({
      email,
      password,
    });
  }

  console.log(data);
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id="password"
              placeholder="your password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <p>loading</p>}
            Login with Email
          </Button>
        </div>
      </form>
    </div>
  );
}
