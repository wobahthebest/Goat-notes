"use client";

import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { logOutAction } from "@/actions/user";

const LogOutButton = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogOut = async () => {
    setLoading(true);

    const { errorMessage } = await logOutAction();

    if (errorMessage) {
      toast.error(errorMessage);
      router.push("/");
    } else {
      toast.success("Logged out successfully");
    }

    setLoading(false);
  };

  return (
    <Button
      disabled={loading}
      className="w-24"
      variant={"outline"}
      onClick={handleLogOut}
    >
      {loading ? <Loader2 className="animate-spin" /> : "Log out"}
    </Button>
  );
};
export default LogOutButton;
