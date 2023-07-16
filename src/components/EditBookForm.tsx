import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { IBook } from "@/types/globalTypes";
import {
  useEditBookMutation,
  useGetBookDetailsQuery,
} from "@/redux/features/books/bookApi";
import React, { useEffect, useState } from "react";
import { toast } from "./ui/use-toast";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function EditBookForm({ id, className, ...props }: UserAuthFormProps) {
  const { data: singleBookData } = useGetBookDetailsQuery(id);
  const editBook = singleBookData?.data;
  // const editBook: IBook = useAppSelector((state) => state.book.editBook);
  const [editBookFunc, { data, isLoading }] =
    useEditBookMutation();

  const [formData, setFormData] = useState<Partial<IBook>>({});
  const [updatedData, setUpdatedData] = useState<Partial<IBook>>({});

  useEffect(() => {
    setFormData(() => ({
      ...editBook,
    }));
  }, [editBook]);
  useEffect(() => {
    if (data?.success) {
      toast({
        description: "Book Updated",
      });
    }
  }, [data]);

  const handleInputChange = (e: {
    target: { name: string; value: number | string };
  }) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    editBookFunc({ id: editBook._id, data: updatedData });
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
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
