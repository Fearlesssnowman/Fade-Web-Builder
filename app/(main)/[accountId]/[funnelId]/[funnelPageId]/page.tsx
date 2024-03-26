import type { Metadata } from "next";
import Editor from "./components/editor/Editor";
import { db } from "@/lib/db";
import { Nav } from "./components/Nav";
import { StoreProvider } from "@/app/StoreProvider";

export default function IndexPage( { params } : { params : { accountId : string,  funnelId : string , funnelPageId: string } } ) {
  console.log("This is the params", params.funnelPageId, params.funnelId, params.accountId,)
  const accountId = params.accountId;
  const funnelId = params.funnelId;
  const funnelPageId = params.funnelPageId;
  const funnelPageDetails = {}
  // const data = db.funnel
  return (
    <StoreProvider>
      <div className="h-full w-screen bg-white">
        <Nav pageDetails={funnelPageDetails}/>
        <Editor data={{ accountId, funnelId, funnelPageId, funnelPageDetails }}/>
      </div>
    </StoreProvider>
  );
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
