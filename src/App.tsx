
import { Toaster } from "./components/ui/Toaster";
import MainLayout from "./layouts/MainLayout";
import { useAuthCheck } from "./hooks/useAuthCheck";

function App() {

  const authChecked = useAuthCheck();
  if (!authChecked) {
    return <p>...Loading</p>;
  }
  return (
    <>
      <Toaster />
      <MainLayout />
    </>
  );
}

export default App;
