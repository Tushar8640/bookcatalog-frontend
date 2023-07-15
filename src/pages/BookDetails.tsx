import ProductReview from "@/components/ProductReview";
import { Button } from "@/components/ui/button";
import { useGetBookDetailsQuery } from "@/redux/features/books/bookApi";
import { setToEdit } from "@/redux/features/books/bookSlice";
import { useAppDispatch } from "@/redux/hooks";
import { IBook } from "@/types/globalTypes";

import { Link, useParams } from "react-router-dom";

export default function BookDetails() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { data } = useGetBookDetailsQuery(id);
  const book = data?.data;
  //! Temporary code, should be replaced with redux

  const handleAddToEdite = (book: IBook) => {
    dispatch(setToEdit(book));
  };
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

          <Link to={`/editbook/${id}`} state={{ data: book }}>
            <Button
              onClick={() => handleAddToEdite(book)}
              size={"sm"}
              className="mr-5"
            >
              Edit
            </Button>
          </Link>
          <Button size={"sm"}>Delete</Button>
        </div>
      </div>
      <ProductReview />
    </>
  );
}
