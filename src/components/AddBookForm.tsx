import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { IBook } from "@/types/globalTypes";
import { useAddBookMutation } from "@/redux/features/books/bookApi";
import React, { useEffect, useState } from "react";
import { toast } from "./ui/use-toast";
import { useAppSelector } from "@/redux/hooks";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function AddBookForm({ id, className, ...props }: UserAuthFormProps) {
  const [addBook, { data, isLoading, isError, error }] = useAddBookMutation();
  const { id: userId } = useAppSelector((state) => state.auth.user);
  const [formData, setFormData] = useState<Partial<IBook>>({});

  const handleInputChange = (e: {
    target: { name: string; value: number | string };
  }) => {
    const { name, value } = e.target;
    setFormData((prevformData) => ({
      ...prevformData,
      [name]: value,
    }));
  };
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    formData.addedBy = userId!;
    addBook(formData);
  }
  useEffect(() => {
    if (data?.success) {
      toast({
        description: "Book Added",
      });
    }
  }, [data]);
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className=" mb-1" htmlFor="title">
              Title
            </Label>
            <Input
              defaultValue={formData?.title}
              id="title"
              placeholder="Title"
              type="text"
              name="title"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleInputChange}
            />
            <Label className="mt-4  mb-1" htmlFor="author">
              Author
            </Label>
            <Input
              defaultValue={formData?.author}
              id="author"
              placeholder="Author Name"
              type="text"
              name="author"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleInputChange}
            />
            <Label className="mt-4  mb-1" htmlFor="genre">
              Genre
            </Label>
            <Input
              defaultValue={formData?.genre}
              id="genre"
              name="genre"
              placeholder="book genre"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleInputChange}
              className="lowercase"
            />
            <Label className="mt-4  mb-1" htmlFor="year">
              Publication Year
            </Label>
            <Input
              defaultValue={formData?.publicationYear}
              id="year"
              name="publicationYear"
              placeholder="Publication Year"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleInputChange}
            />
            <Label className="mt-4  mb-1" htmlFor="year">
              Description
            </Label>
            <Textarea
              name="description"
              defaultValue={formData?.description}
              placeholder="Book descripton"
              className="resize-none"
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <p>loading</p>}
            Add Book
          </Button>
        </div>
      </form>
    </div>
  );
}
