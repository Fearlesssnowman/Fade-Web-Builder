'use client'
import React from 'react'
import RecursiveElement from './recursive'

import { v4 } from 'uuid'
import clsx from 'clsx'
import { Badge } from '@/components/ui/badge'
import { EditorBtns, defaultStyles } from '@/lib/constants'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { EditorElement, change_clicked_element, delete_element, selectEditor, selectHistory } from '@/lib/features/editor/editorSlice'

type Props = {
  element: EditorElement
}

const TwoColumns = (props: Props) => {
  const { id, content, type } = props.element
    const dispatch = useAppDispatch()
    const editor = useAppSelector(selectEditor)
    const history = useAppSelector(selectHistory)
    const state = { editor , history }

    const handleOnDrop = (e: React.DragEvent, type: string) => {
        e.stopPropagation()
        const componentType = e.dataTransfer.getData('componentType') as EditorBtns
        switch (componentType) {
        case 'text':
            dispatch({
            type: 'ADD_ELEMENT',
            payload: {
                containerId: id,
                elementDetails: {
                content: { innerText: 'Text Component' },
                id: v4(),
                name: 'Text',
                styles: {
                    color: 'black',
                    ...defaultStyles,
                },
                type: 'text',
                },
            },
            })
            break
        case 'container':
            dispatch({
            type: 'ADD_ELEMENT',
            payload: {
                containerId: id,
                elementDetails: {
                content: [],
                id: v4(),
                name: 'Container',
                styles: { ...defaultStyles },
                type: 'container',
                },
            },
            })
            break
        case '2Col':
            dispatch({
            type: 'ADD_ELEMENT',
            payload: {
                containerId: id,
                elementDetails: {
                content: [],
                id: v4(),
                name: 'Flex',
                styles: { ...defaultStyles },
                type: '2Col',
                },
            },
            })
            break
        }
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

    const handleDragStart = (e: React.DragEvent, type: string) => {
        if (type === '__body') return
        e.dataTransfer.setData('componentType', type)
    }

    const handleOnClickBody = (e: React.MouseEvent) => {
        e.stopPropagation()
        const clickedPayload =  {
            elementDetails: props.element,
        }
        dispatch(change_clicked_element(clickedPayload))
    }

    return (
        <div
        style={props.element.styles}
        className={clsx('relative p-4 transition-all', {
            'h-fit': type === 'container',
            'h-full': type === '__body',
            'm-4': type === 'container',
            '!border-blue-500':
            state.editor.selectedElement.id === props.element.id &&
            !state.editor.liveMode,
            '!border-solid':
            state.editor.selectedElement.id === props.element.id &&
            !state.editor.liveMode,
            'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        })}
        id="innerContainer"
        onDrop={(e) => handleOnDrop(e, id)}
        onDragOver={handleDragOver}
        draggable={type !== '__body'}
        onClick={handleOnClickBody}
        onDragStart={(e) => handleDragStart(e, 'container')}
        >
        {state.editor.selectedElement.id === props.element.id &&
            !state.editor.liveMode && (
            <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg ">
                {state.editor.selectedElement.name}
            </Badge>
            )}
        {Array.isArray(content) &&
            content.map((childElement) => (
            <RecursiveElement
                key={childElement.id}
                element={childElement}
            />
            ))}
        </div>
    )
}

export default TwoColumns