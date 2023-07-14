import { Toaster } from "./components/ui/Toaster";
import MainLayout from "./layouts/MainLayout";
import { useGetTodosQuery } from "./redux/features/todos/todoApi";

function App() {
  const { data, isError } = useGetTodosQuery(undefined);
  console.log(data);
  return (
    <>
      <Toaster />
      <MainLayout />
    </>
  );
}

export default App;
