import { shadow } from "@/styles/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import LogOutButton from "./LogOutButton";
import DarkModeToggle from "./DarkModeToggle";
import { getUser } from "@/auth/server";

const Header = async () => {
  const user = await getUser();

  return (
    <header
      className="h-24 relative flex items-center w-full sm:px-8 px-3 justify-between bg-popover"
      style={{ boxShadow: shadow }}
    >
      <Link href="/" className="flex items-end gap-2">
        <Image
          src={"/goatius.png"}
          height={60}
          width={60}
          alt="Logo"
          className="rounded-full"
          priority
        />
        <h1 className="text-2xl pb-1 flex flex-col font-semibold leading-6 ">
          GOAT <span>Notes</span>
        </h1>
      </Link>

      <div className="flex gap-4">
        {user ? (
          <LogOutButton />
        ) : (
          <>
            <Button className="sm:block hidden" asChild>
              <Link href={"/signup"}>Sign up</Link>
            </Button>
            <Button variant={"outline"} asChild>
              <Link href={"/login"}>Login</Link>
            </Button>
          </>
        )}
        <DarkModeToggle />
      </div>
    </header>
  );
};
export default Header;
