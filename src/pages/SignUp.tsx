
import { Button,  } from "@/components/ui/button";
import { SignupForm } from "../components/SignUpForm";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <>
      <div className="container relative  h-screen items-center justify-center  lg:px-0 md:mt-24">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center  space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
          
            </div>
            <SignupForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Already have an account
              <Link
                to="/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                <Button variant={"link"}> Login now</Button>
              </Link>
           
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
