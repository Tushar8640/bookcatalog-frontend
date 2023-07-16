import { Link } from "react-router-dom";

import { Button } from "./ui/button";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logOut } from "@/redux/features/auth/authSlice";
import { LogOutIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function Navbar() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div>
     
            <h2 className="text-3xl text-blue-400">Book Cat</h2>
          </div>
          <div>
            <ul className="flex items-center">
              <li>
                <Button variant="link" asChild>
                  <Link to="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/books">All Books</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/wishlist">Wish List</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/readlist">Read List</Link>
                </Button>
              </li>

              {user.email ? (
                <li className="ml-5">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        {" "}
                        <Button
                          onClick={() => dispatch(logOut())}
                          variant={"default"}
                          size={"sm"}
                        >
                          <LogOutIcon width={"20"} className="" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Logout</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </li>
              ) : (
                <li className="ml-5">
                  <Link to={"/login"}>
                    {" "}
                    <Button>Login</Button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
