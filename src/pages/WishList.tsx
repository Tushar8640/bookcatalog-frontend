import WishListCard from "@/components/WishListCard";
import { useGetWishlistQuery } from "@/redux/features/wishlist/wishlistApi";
import { IBook } from "@/types/globalTypes";

export default function WishList() {
  const { data } = useGetWishlistQuery("", {
    refetchOnMountOrArgChange: true,
  });
console.log(data?.data);
  return (
    <div className="grid grid-cols-12 max-w-4xl mx-auto relative ">
      <div className="col-span-12 my-5 mx-auto">
        <h1 className="text-2xl my-3 font-semibold text-primary"> Your Wish List</h1>
        <div className=" grid grid-cols-3 gap-10 pb-20">
          {data?.data?.map((d: { book: IBook; }) => (
            <WishListCard book={d?.book} />
          ))}
        </div>
      </div>
    </div>
  );
}
