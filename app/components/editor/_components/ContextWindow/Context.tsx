'use client'; 
import { EditorElement, change_clicked_element, selectEditor, selectHistory, toggle_live_mode, toggle_preview_mode } from '@/lib/features/editor/editorSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import clsx from 'clsx';
import { EyeOff } from 'lucide-react';
import React from 'react'
import { Button } from '@/components/ui/button';
import Recursive from './_components/recursive';

function Context() {
    const dispatch = useAppDispatch();
    const editor = useAppSelector(selectEditor);
    const history = useAppSelector(selectHistory);
    const state = { editor, history }

    const handleClick = () => {
        dispatch(change_clicked_element({} as { elementDetails: EditorElement }));
        console.log("Touch kiya meko", editor.selectedElement)
        console.log("Ye sab hai par " ,state.editor.elements)
    }
    const handleUnpreview = () => {
        dispatch(toggle_live_mode());
        dispatch(toggle_preview_mode());
    }

    return (
        <div
        className={clsx(
            'use-automation-zoom-in h-[90%] mb-[65px] overflow-auto mx-[35px] mr-[425px] bg-background transition-all rounded-md',
            {
            '!p-0 !mx-0 h-screen !my-[0px]':
                state.editor.previewMode === true || state.editor.liveMode === true,
            '!w-[850px]': state.editor.device === 'Tablet',
            '!w-[420px]': state.editor.device === 'Mobile',
            'w-full': state.editor.device === 'Desktop',
            }
        )}
        onClick={handleClick}
        >
        {state.editor.previewMode && state.editor.liveMode && (
            <Button
            variant={'ghost'}
            size={'icon'}
            className="w-6 h-6 bg-slate-600 p-[2px] fixed top-0 left-0 z-[100]"
            onClick={handleUnpreview}
            >
            <EyeOff />
            </Button>
        )}
        

        {
        Array.isArray(state.editor.elements) &&
            state.editor.elements.map((childElement) => (
            <Recursive
                key={childElement.id}
                element={childElement}
            />
            ))
            }
        </div>
    )
}

export default Context
