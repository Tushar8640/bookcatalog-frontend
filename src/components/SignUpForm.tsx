import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useRegisterMutation } from "@/redux/features/auth/authApi";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function SignupForm({ className, ...props }: UserAuthFormProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [register, { isLoading, data }] = useRegisterMutation();
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    register({
      name,
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
            <div>
              <Label className="" htmlFor="name">
                Name
              </Label>
              <Input
                id="name"
                placeholder="name@example.com"
                type="name"
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect="off"
                disabled={isLoading}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label className="" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect="off"
                disabled={isLoading}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label className="" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                placeholder="your password"
                type="password"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <Button disabled={isLoading}>
            {isLoading && <p>loading</p>}
            Create Account
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? <p>loading</p> : <p>GitHub</p>}
      </Button>
    </div>
  );
}
