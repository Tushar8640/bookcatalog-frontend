import { useGetTodosQuery } from "./redux/features/todos/todoApi";

function App() {
  const {data,isError} = useGetTodosQuery(undefined)
  console.log(data);
  return (
    <>
      <h1>Hello world</h1>
    </>
  );
}

export default App;
