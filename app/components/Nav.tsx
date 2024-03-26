"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "../styles/layout.module.css";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { clsx } from "clsx";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeftCircle, Laptop, Tablet, Smartphone, EyeIcon, Undo2, Redo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/hooks";
import { DeviceTypes, selectEditor, selectHistory } from "@/lib/features/editor/editorSlice";
import { change_device, toggle_preview_mode, toggle_live_mode } from "@/lib/features/editor/editorSlice";

export const Nav = (props: any) => {
    const { pageDetails } = props;
    console.log("Page details from inside Nav, ", pageDetails)
    const dispatch = useAppDispatch();
    const editor = useAppSelector(selectEditor);
    const history = useAppSelector(selectHistory);

    console.log(editor);

    const pathname = usePathname();
    
    const subaccountId = pathname.split('/')[2];
    const funnelId = pathname.split('/')[4];
    const funnelPageDetails = {
      name: 'Home',
      pathName: 'home',
      updatedAt: new Date()
    };

    const state = {
        editor,
        history
    };

    const handleOnBlurTitleChange = () => {
      console.log('Title Changed');
    }

    const handlePreviewClick = () => {
      dispatch(toggle_preview_mode());
      dispatch(toggle_live_mode());
    }

    const handleUndo = () => {
      console.log('Undo Clicked');
    }

    const handleRedo = () => {
      console.log('Redo Clicked');
    }

    return (
      <TooltipProvider>
        <nav
          className={clsx(
            'border-b-[1px] flex items-center justify-between p-2 gap-2 transition-all',
            { '!h-0 !p-0 !overflow-hidden': state.editor.previewMode }
          )}
        >
          <aside className="flex items-center gap-4 max-w-[260px] w-[300px]">
            <Link href={`/${subaccountId}/${funnelId}`}>
              <ArrowLeftCircle />
            </Link>
            <div className="flex flex-col w-full ">
              <Input
                defaultValue={funnelPageDetails.name}
                className="border-none h-5 m-0 p-0 text-lg"
                onBlur={handleOnBlurTitleChange}
              />
              <span className="text-sm text-muted-foreground">
                Path: /{funnelPageDetails.pathName}
              </span>
            </div>
          </aside>
          <aside>
            <Tabs
              defaultValue="Desktop"
              className="w-fit "
              value={state.editor.device}
              onValueChange={(value) => {
                console.log(value);
                dispatch(change_device(value as DeviceTypes));
              }}
            >
              <TabsList className="grid w-full grid-cols-3 bg-transparent h-fit">
                <Tooltip>
                  <TooltipTrigger>
                    <TabsTrigger
                      value="Desktop"
                      className="data-[state=active]:bg-muted w-10 h-10 p-0"
                    >
                      <Laptop />
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Desktop</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <TabsTrigger
                      value="Tablet"
                      className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                    >
                      <Tablet />
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Tablet</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <TabsTrigger
                      value="Mobile"
                      className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                    >
                      <Smartphone />
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Mobile</p>
                  </TooltipContent>
                </Tooltip>
              </TabsList>
            </Tabs>
          </aside>
          <aside className="flex items-center gap-2">
            <Button
              variant={'ghost'}
              size={'icon'}
              className="hover:bg-slate-800 hover:!text-white"
              onClick={handlePreviewClick}
            >
              <EyeIcon />
            </Button>
            <Button
              disabled={!(state.history.currentIndex > 0)}
              onClick={handleUndo}
              variant={'ghost'}
              size={'icon'}
              className="hover:bg-slate-800 hover:!text-white"
            >
              <Undo2 />
            </Button>
            <Button
              disabled={
                !(state.history.currentIndex < state.history.history.length - 1)
              }
              onClick={handleRedo}
              variant={'ghost'}
              size={'icon'}
              className="hover:bg-slate-800 hover:!text-white mr-4"
            >
              <Redo2 />
            </Button>
            <Button onClick={()=>{}}>Save</Button>
          </aside>
        </nav>
      </TooltipProvider>
    )
};
