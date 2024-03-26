'use client'
import { Badge } from '@/components/ui/badge'
import { EditorElement, change_clicked_element, delete_element, selectEditor, selectHistory } from '@/lib/features/editor/editorSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import clsx from 'clsx'
import { Trash } from 'lucide-react'
import React from 'react'

type Props = {
  element: EditorElement
}

const TextComponent = (props: Props) => {

    const dispatch = useAppDispatch()
    const editor = useAppSelector(selectEditor)
    const history = useAppSelector(selectHistory)
    const state = { editor, history }

    const handleDeleteElement = () => {
        const clickedPayload =  {
            elementDetails: props.element,
        }
        dispatch(delete_element(clickedPayload))
    }

    const styles = props.element.styles

    const handleOnClickBody = (e: React.MouseEvent) => {
        e.stopPropagation()
        const clickedPayload =  {
            elementDetails: props.element,
        }
        dispatch(change_clicked_element(clickedPayload))
    }

    return (
        <div
        style={styles}
        className={clsx(
            'p-[2px] w-full m-[5px] relative text-[16px] transition-all',
            {
            '!border-blue-500':
                state.editor.selectedElement.id === props.element.id,

            '!border-solid': state.editor.selectedElement.id === props.element.id,
            'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
            }
        )}
        onClick={handleOnClickBody}
        >
        {state.editor.selectedElement.id === props.element.id &&
            !state.editor.liveMode && (
            <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
                {state.editor.selectedElement.name}
            </Badge>
            )}
        <span
            contentEditable={!state.editor.liveMode}
            onBlur={(e) => {
            const spanElement = e.target as HTMLSpanElement
            dispatch({
                type: 'UPDATE_ELEMENT',
                payload: {
                elementDetails: {
                    ...props.element,
                    content: {
                    innerText: spanElement.innerText,
                    },
                },
                },
            })
            }}
        >
            {!Array.isArray(props.element.content) &&
            props.element.content.innerText}
        </span>
        {state.editor.selectedElement.id === props.element.id &&
            !state.editor.liveMode && (
            <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
                <Trash
                className="cursor-pointer"
                size={16}
                onClick={handleDeleteElement}
                />
            </div>
            )}
        </div>
    )
}

export default TextComponent