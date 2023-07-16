import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { FiSend } from "react-icons/fi";
import { useState } from "react";
import { IReview } from "@/types/globalTypes";
import { useAddReviewMutation } from "@/redux/features/wishlist/wishlistApi";
import axios from "axios";

interface IProps {
  reviews: IReview[];
  id: string;
}

export default function BookReview({ reviews, id }: IProps) {
  const [addBookReview, { data }] = useAddReviewMutation();
  const [comment, setComment] = useState("");

  const handleAddReview = async () => {
    const data = {
      review: comment,
    };

    const resdata = axios.post(
      `http://localhost:8000/api/v1/books/addReview/${id}`,
      data
    );
    // addBookReview({
    //   id,
    //   review: comment,
    // });
    console.log(data);
  };

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex gap-5 items-center">
        <Textarea
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[30px]"
        />
        <Button
          onClick={handleAddReview}
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          <FiSend />
        </Button>
      </div>
      <div className="mt-10">
        {reviews?.map((r: IReview) => (
          <div key={r._id} className="flex gap-3 items-center mb-5">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{r.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
