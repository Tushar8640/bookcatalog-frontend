import { IBook } from "@/types/globalTypes";
import { toast } from "./ui/use-toast";
import { Link } from "react-router-dom";
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
import { Label } from "./ui/label";
interface IProps {
  book: IBook;
  status: string;
  id: string;
}

export default function ReadListCard({ book, status, id }: IProps) {
  const [sstatus, setSStatus] = useState("");
  useEffect(() => {
    setSStatus(status);
  }, [status]);

  const statusArr = ["Reading", "Plan to Read", "Finished"];

  const handleChangeStatus = async (status: string) => {
    const resdata = await axios.patch(
      `http://localhost:8000/api/v1/read-list/${id}`,
      { status }
    );

    if (resdata?.data?.success) {
      toast({
        description: "Status Changed",
      });
    }
  };
  return (
    <div>
      <div className="rounded-2xl h-auto flex flex-col items-start  p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-sm hover:scale-[102%] transition-all gap-2">
        <img
          src={
            "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
          }
          alt="product"
        />
        <h1 className="text-xl font-semibold mt-1">{book?.title}</h1>

        <p className="font-semibold text-primary">{book?.genre}</p>
        <p>{book?.description?.slice(0, 50)}...</p>
        <Label className="mt-2">Status:</Label>
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
        <div className="flex justify-around w-full"></div>
      </div>
    </div>
  );
}
