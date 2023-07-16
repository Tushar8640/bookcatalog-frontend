import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <div className="pt-16 min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
