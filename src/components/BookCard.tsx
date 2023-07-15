import { IProduct } from "@/types/globalTypes";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useDeleteBookMutation } from "@/redux/features/books/bookApi";
interface IProps {
  product: IProduct;
}

export default function BookCard({ book }: IProps) {
  const [deleteBook] = useDeleteBookMutation();
  const handleDeleteBook = (book: any) => {
    console.log(book);
    deleteBook(book?._id);
    toast({
      description: "Book Deleted",
    });
  };
  return (
    <div>
      <div className="rounded-2xl h-[480px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <Link to={`/book-details/${book._id}`} className="w-full">
          <img src={book?.image} alt="product" />
          <h1 className="text-xl font-semibold">{book?.name}</h1>
        </Link>
        <p>Rating: {book?.rating}</p>
        <p className="text-sm">
          Availability: {book?.status ? "In stock" : "Out of stock"}
        </p>
        <p className="text-sm">Price: {book?.price}</p>
        <Button variant="default" onClick={() => addToWishList(book)}>
          Add to WishList
        </Button>
        <Button variant="outline" onClick={() => handleDeleteBook(book)}>
          <MdDelete />
        </Button>
      </div>
    </div>
  );
}
