import { IBook } from "@/types/globalTypes";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useAppSelector } from "@/redux/hooks";
import { useDeleteBookMutation } from "@/redux/features/books/bookApi";
import { useAddToWishlistMutation } from "@/redux/features/wishlist/wishlistApi";
import { useAddToReadlistMutation } from "@/redux/features/readlist/readlistApi";
interface IProps {
  book: IBook;
}

export default function BookCard({ book }: IProps) {
  const { user } = useAppSelector((state) => state.auth);
  const [deleteBook] = useDeleteBookMutation();
  const [addWishlist] = useAddToWishlistMutation();
  const [addReadlist] = useAddToReadlistMutation();

  console.log("error");
  const handleDeleteBook = (book: IBook) => {
    console.log(book);
    deleteBook(book?._id);
    toast({
      description: "Book Deleted",
    });
  };

  const addToWishList = (id: string) => {
    addWishlist({
      user: user?.id,
      book: id,
    });
    toast({
      description: "Book Added to wishlist",
    });
  };
  const addToReadlist = (id: string) => {
    addReadlist({
      user: user?.id,
      book: id,
    });
    toast({
      description: "Book Added to readlist",
    });
  };
  return (
    <div>
      <div className="rounded-2xl h-[480px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <Link to={`/book-details/${book._id}`} className="w-full">
          <img
            src={
              "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
            }
            alt="product"
          />
          <h1 className="text-xl font-semibold">{book?.title}</h1>
        </Link>
      

        {/* <p className="text-sm">Price: {book?.price}</p> */}
        <div className="flex justify-around w-full">
          <Button variant="default" onClick={() => addToWishList(book._id)}>
            Add to WishList
          </Button>
          <Button variant="default" onClick={() => addToReadlist(book._id)}>
            Add to Readlist
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => handleDeleteBook(book)}
          >
            <MdDelete />
          </Button>
        </div>
      </div>
    </div>
  );
}
