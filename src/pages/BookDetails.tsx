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
  const { data ,refetch} = useGetBookDetailsQuery(id);
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
    console.log(book);
  };
  const handleAddToEdite = (book: IBook) => {
    dispatch(setToEdit(book));
  };
  console.log(book?.addedBy === userId);
  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
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
          <p className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit eos
            obcaecati debitis velit nobis, fuga dicta. Culpa, atque quae
            similique autem ducimus eligendi aliquid, omnis nihil maxime ad
            consequatur eaque, alias itaque cum quos nobis reiciendis voluptas
            deleniti illo libero officiis magni iste. Rerum maxime earum
            inventore recusandae officiis placeat eum. Minus voluptatem, debitis
            omnis, tempore optio velit corrupti officiis amet rerum quibusdam
            aliquam ad eaque neque, cumque atque nulla ipsam labore
            reprehenderit nihil eligendi a officia accusantium quas non. Enim
            harum dolor quasi dolorum modi sed et pariatur deserunt amet. Ipsam
            fugiat totam, ipsum minus voluptas accusantium dicta accusamus.
          </p>
          {/* <p className="text-xl">Rating: {product?.rating}</p> */}

          {(userId === book?.addedBy) && (
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
      <BookReview reviews={book?.reviews} id={id!} refetch={refetch}/>
    </>
  );
}
