import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { FiSend } from "react-icons/fi";
import { useEffect, useState } from "react";
import { IReview } from "@/types/globalTypes";
import { useAddReviewMutation } from "@/redux/features/wishlist/wishlistApi";
import axios from "axios";

interface IProps {
  reviews: IReview[];
  id: string;
  refetch: () => void;
}

export default function BookReview({ reviews, id, refetch }: IProps) {
  const [addBookReview, { data }] = useAddReviewMutation();
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddReview = async () => {
    setIsLoading(true);
    console.log(isLoading);
    const data = {
      review: comment,
    };

    const resdata = await axios.post(
      `http://localhost:8000/api/v1/books/addReview/${id}`,
      data
    );
    setComment("")
    refetch();
    // addBookReview({
    //   id,
    //   review: comment,
    // });
    setIsLoading(false);
    console.log(resdata);
  };

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex flex-col gap-5 mt-3">
        <Textarea
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[30px]"
          value={comment}
          
        />
        <Button
          onClick={handleAddReview}
         size={"sm"}
          disabled={isLoading}
          className="w-[100px]"
        >
          Comment
        </Button>
      </div>
      <div className="mt-10">
        {reviews
          ?.slice()
          ?.reverse()
          ?.map((r: IReview) => (
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
