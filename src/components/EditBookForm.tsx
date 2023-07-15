"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { useAppSelector } from "@/redux/hooks";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function EditBookForm({ className, ...props }: UserAuthFormProps) {
  const { editBook } = useAppSelector((state) => state.book);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
console.log(editBook);
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className=" mb-1" htmlFor="title">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Title"
              type="text"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Label className="mt-4  mb-1" htmlFor="author">
              Author
            </Label>
            <Input
              id="author"
              placeholder="Author Name"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Label className="mt-4  mb-1" htmlFor="genre">
              Genre
            </Label>
            <Input
              id="genre"
              placeholder="book genre"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Label className="mt-4  mb-1" htmlFor="year">
              Publication Year
            </Label>
            <Input
              id="year"
              placeholder="Publication Year"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Label className="mt-4  mb-1" htmlFor="year">
              Description
            </Label>
            <Textarea placeholder="Book descripton" className="resize-none" />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <p>loading</p>}
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
