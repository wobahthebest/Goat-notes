"use client";

import { useRouter } from "next/navigation";
import { CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { loginAction, signUpAction } from "@/actions/user";

type CardType = {
  type: "login" | "signup";
};

const CardForm = ({ type }: CardType) => {
  const isLogin = type === "login";
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      let errorMessage;
      let title;
      let description;

      if (isLogin) {
        errorMessage = (await loginAction(email, password)).errorMessage;
        title = "Logged in";
        description = "You are now logged in.";
      } else {
        errorMessage = (await signUpAction(email, password)).errorMessage;
        title = "Signed up";
        description = "Check your email for a confirmation link.";
      }

      if (!errorMessage) {
        toast.success(title, {
          description,
        });
        router.replace("/");
      } else {
        toast.error("Error", {
          description: errorMessage,
        });
      }
    });
  };
  return (
    <form action={handleSubmit}>
      <CardContent className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            className="w-full"
            type="email"
            name="email"
            id="email"
            placeholder="Type your email"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            className="w-full"
            type="password"
            name="password"
            id="password"
            placeholder="Type your password"
          />
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-6 mt-10">
        <Button className="w-full" disabled={isPending} type="submit">
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isLogin ? (
            "Login"
          ) : (
            "Sign up"
          )}
        </Button>
        <p className="text-xs">
          {isLogin ? "Don't have an account yet?" : "Already have an account?"}{" "}
          <Link
            className={`underline text-blue-500 ${
              isPending ? "pointer-events-none opacity-50" : ""
            }`}
            href={isLogin ? "/signup" : "/login"}
          >
            {isLogin ? "Sign Up" : "Login"}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
};
export default CardForm;
