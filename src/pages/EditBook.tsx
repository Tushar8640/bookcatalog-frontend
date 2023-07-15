import { EditBookForm } from "@/components/EditBookForm";
import { useParams } from "react-router-dom";

export default function EditBook() {
  const params = useParams()
  const {id} = params
  console.log(id);
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl my-5">Edit Book</h1>
      <EditBookForm  id={id} />
    </div>
  );
}
