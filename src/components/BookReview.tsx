import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import { IReview } from "@/types/globalTypes";

import axios from "axios";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";

interface IProps {
  reviews: IReview[];
  id: string;
  user: unknown;
  refetch: () => void;
}

export default function BookReview({ reviews, id, refetch, user }: IProps) {
  const { id: userId } = useAppSelector((state) => state.auth.user);

  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddReview = async () => {
    setIsLoading(true);
    console.log(isLoading);
    const data = {
      id: userId,
      review: comment,
    };

    const resdata = await axios.post(
      `http://localhost:8000/api/v1/books/addReview/${id}`,
      data
    );
    setComment("");
    refetch();
    // addBookReview({
    //   id,
    //   review: comment,
    // });
    setIsLoading(false);
    console.log(resdata);
  };
  console.log(user);
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
            <div key={r?._id} className="flex gap-3 items-center mb-5">
              <Avatar>
                <AvatarFallback>{r?.id?.name.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <div>
                <p>{r?.id?.name}</p>
                <div>
                  <p className="p-1 bg-gray-200 mt-1">{r?.review}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
