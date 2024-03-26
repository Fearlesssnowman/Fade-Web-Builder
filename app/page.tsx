import type { Metadata } from "next";
import { Counter } from "./components/counter/Counter";
import SignUpForm from "@/components/form/SignUpForm";
import Navbar from "@/components/Navbar";

export default function IndexPage() {
  return (<div className="h-full w-screen bg-white flex justify-center items-center">
    <Navbar/>
      <div className="text-6xl">
        Welcome to <span className="text-7xl font-mono font-bold ml-[10px]">FaDe</span>
      </div>
      {/* <SignUpForm /> */}
  </div>);
}

export const metadata: Metadata = {
  title: "Fade Web Builder",
};
