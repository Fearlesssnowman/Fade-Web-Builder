import React from "react";
import Link from "next/link";
import { Blocks } from "lucide-react";
import AvatarDropdown from "@/components/ui/AvatarDropdown";
import { Button } from "./ui/button";



const Navbar = () => {
  return (
    <div className="bg-zinc-100 py-2 bprder-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <h2 className="flex space-x-2 ">
          <Link className="flex justify-between items-center" href="/">
            <Blocks />
            <span className="text-gray-800 text-2xl font-bold font-mono ml-[10px]">FaDe</span>
          </Link>
          
        </h2>
        <div className="flex space-x-3">
          <Link href='/sign-in'>
            <Button>
              Sign in
            </Button>
          </Link>
          {/* <AvatarDropdown /> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;