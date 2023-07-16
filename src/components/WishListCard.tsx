import { IBook } from "@/types/globalTypes";

import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface IProps {
  book: IBook;
}

export default function WishListCard({ book }: IProps) {
console.log(book);
  return (
    <div>
      <div className="rounded-2xl h-auto flex flex-col items-start  p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <Link to={`/book-details/${book?._id}`} className="w-full">
          <img
            src={
              "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
            }
            alt="product"
          />
          <h1 className="text-xl font-semibold mt-1">{book?.title}</h1>
        </Link>
        <p className="font-semibold text-primary">{book?.genre}</p>
        <p>{(book?.description)?.slice(0,50)}...</p>

   
      </div>
    </div>
  );
}
