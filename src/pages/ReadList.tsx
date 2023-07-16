import ReadListCard from "@/components/ReadListCard";
import { useGetReadlistQuery } from "@/redux/features/readlist/readlistApi";
import { IBook } from "@/types/globalTypes";

export default function ReadList() {
  const { data } = useGetReadlistQuery("", {
    refetchOnMountOrArgChange: true,
  });
console.log(data);
  return (
    <div className="grid grid-cols-12 max-w-4xl mx-auto relative ">
      <div className="col-span-12 my-5 mx-auto">
        <h1 className="text-2xl my-3"> Your Readlist</h1>
        <div className=" grid grid-cols-3 gap-10 pb-20">
          {data?.data?.map((d: { book: IBook; }) => (
            <ReadListCard book={d?.book} />
          ))}
        </div>
      </div>
    </div>
  );
}
