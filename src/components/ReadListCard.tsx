import { IBook } from "@/types/globalTypes";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useDeleteBookMutation } from "@/redux/features/books/bookApi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useEffect, useState } from "react";
import axios from "axios";
interface IProps {
  book: IBook;
  status: string;
  id: string;
}

export default function ReadListCard({ book, status, id }: IProps) {
  const [deleteBook] = useDeleteBookMutation();
  const handleDeleteBook = (book: IBook) => {
    console.log(book);
    deleteBook(book?._id);
    toast({
      description: "Book Deleted",
    });
  };
  const [sstatus, setSStatus] = useState("");
  useEffect(() => {
    setSStatus(status);
  }, [status]);
  console.log(sstatus);
  const statusArr = ["Reading", "Plan to Read", "Finished"];

  const handleChangeStatus = async (status) => {
    const resdata = await axios.patch(
      `http://localhost:8000/api/v1/read-list/${id}`,
      { status }
    );
    // addBookReview({
    //   id,
    //   review: comment,
    // });
    if (resdata?.data?.success) {
      toast({
        description: "Status Changed",

      });
    }
    console.log(resdata, status);
  };
  return (
    <div>
      <div className="rounded-2xl h-[480px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <Link to={`/book-details/${book?._id}`} className="w-full">
          <img
            src={
              "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
            }
            alt="product"
          />
          <h1 className="text-xl font-semibold">{book?.title}</h1>
        </Link>
        <Select
          onValueChange={(value) => {
            setSStatus(value);
            handleChangeStatus(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue defaultValue={sstatus} placeholder={sstatus} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              {statusArr?.map((status, i) => (
                <SelectItem
                  className={`${sstatus === status && "bg-green-500/30"}`}
                  key={i}
                  value={status}
                >
                  <span>{status}</span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* <p className="text-sm">Price: {book?.price}</p> */}
        <div className="flex justify-around w-full">
          <Button
            variant="default"
            // onClick={() => addToWishList(book)}
          >
            Add to WishList
          </Button>
        </div>
      </div>
    </div>
  );
}
