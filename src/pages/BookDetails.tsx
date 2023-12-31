import BookReview from "@/components/BookReview";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  useDeleteBookMutation,
  useGetBookDetailsQuery,
} from "@/redux/features/books/bookApi";
import { setToEdit } from "@/redux/features/books/bookSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IBook } from "@/types/globalTypes";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function BookDetails() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { data, refetch } = useGetBookDetailsQuery(id);
  const book = data?.data;
  const navigate = useNavigate();
  const [deleteBook] = useDeleteBookMutation();
  const { id: userId } = useAppSelector((state) => state.auth.user);
  const handleDeleteBook = (book: IBook) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBook(book?._id);
        toast({
          description: "Book Deleted",
        });
        navigate("/books");
      }
    });
   
  };
  const handleAddToEdite = (book: IBook) => {
    dispatch(setToEdit(book));
  };
  console.log(book?.addedBy === userId);
  console.log(book);
  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center mt-5">
        <div className="w-[50%]">
          <img
            src={
              "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
            }
            alt=""
          />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{book?.title}</h1>
         <div className="flex space-x-2">
         <p className="text-xl font-semibold">{book?.author}</p>
         
          <p className="text-xl">{book?.publicationYear}</p>
         </div>
         <p className="text-xl capitalize">Genre: {book?.genre}</p>
          <p className="text-xl">{book?.description}</p>
          {/* <p className="text-xl">Rating: {product?.rating}</p> */}

          {userId === book?.addedBy && (
            <Link to={`/editbook/${id}`} state={{ data: book }}>
              <Button
                onClick={() => handleAddToEdite(book)}
                size={"sm"}
                className="mr-5"
                disabled={!(userId === book?.addedBy)}
              >
                Edit
              </Button>
            </Link>
          )}
          <Button
            variant="destructive"
            size={"sm"}
            onClick={() => handleDeleteBook(book)}
            disabled={!(userId === book?.addedBy)}
          >
            Delete
          </Button>
        </div>
      </div>
      <BookReview reviews={book?.reviews} id={id!} refetch={refetch} user={book?.id}/>
    </>
  );
}
