import {
  useAddBookMutation,
  useAddReviewMutation,
} from "@/redux/features/books/bookApi";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { FiSend } from "react-icons/fi";
import { useState } from "react";
import { IReview } from "@/types/globalTypes";

interface IProps {
  reviews: IReview[];
  id: string;
}

export default function BookReview({ reviews, id }: IProps) {
  const [addReview, { data }] = useAddReviewMutation();
  const [comment, setComment] = useState("");
  console.log(reviews);
  const handleAddReview = () => {
    const data = {
      id,
      review: comment,
    };
    addReview(data);
    console.log(data);
  };
  console.log(data, comment);
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
