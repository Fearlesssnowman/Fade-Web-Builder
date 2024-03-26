'use client'
import { Badge } from '@/components/ui/badge'
import { EditorBtns, defaultStyles } from '@/lib/constants'
import clsx from 'clsx'
import React from 'react'
import { v4 } from 'uuid'
import Recursive from './recursive'
import { Trash } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { EditorElement, add_element, change_clicked_element, delete_element, selectEditor, selectHistory } from '@/lib/features/editor/editorSlice'

type Props = { element: EditorElement }

const Container = ({ element }: Props) => {
  const { id, content, name, styles, type } = element
  const dispatch = useAppDispatch()
  const editor = useAppSelector(selectEditor)
  const history = useAppSelector(selectHistory);
  const state = { editor, history }

  const handleOnDrop = (e: React.DragEvent, type: string) => {
    e.stopPropagation()
    const componentType = e.dataTransfer.getData('componentType') as EditorBtns
    
    switch (componentType) {
      case 'text':
        const textPayload = {
            containerId: id,
            elementDetails: {
                content: { innerText: 'Text Element' },
                id: v4(),
                name: 'Text',
                styles: {
                color: 'black',
                ...defaultStyles,
                },
                type: 'text',
            } as EditorElement,
        }
        dispatch(add_element(textPayload))
        console.log(state.editor.elements)
        break
      case 'link':
        const linkPayload = {
            containerId: id,
            elementDetails: {
              content: {
                innerText: 'Link Element',
                href: '#',
              },
              id: v4(),
              name: 'Link',
              styles: {
                color: 'black',
                ...defaultStyles,
              },
              type: 'link',
            } as EditorElement,
          }
        dispatch(add_element(linkPayload))
        break
      case 'video':
        const videoPayload = {
            containerId: id,
            elementDetails: {
              content: {
                src: 'https://www.youtube.com/embed/QuU1VW33ei8?si=4FhyEu1bGdHnSF7C',
              },
              id: v4(),
              name: 'Video',
              styles: {},
              type: 'video',
            } as EditorElement,
        }
        dispatch(add_element(videoPayload))
        break
      case 'container':
        const containerPayload = {
            containerId: id,
            elementDetails: {
              content: [],
              id: v4(),
              name: 'Container',
              styles: { ...defaultStyles },
              type: 'container',
            } as EditorElement,
          }
        dispatch(add_element(containerPayload))
        break
      case '2Col':
        const twoColPayload = {
            containerId: id,
            elementDetails: {
              content: [
                {
                  content: [],
                  id: v4(),
                  name: 'Container',
                  styles: { ...defaultStyles, width: '100%' },
                  type: 'container',
                },
                {
                  content: [],
                  id: v4(),
                  name: 'Container',
                  styles: { ...defaultStyles, width: '100%' },
                  type: 'container',
                },
              ],
              id: v4(),
              name: 'Flex',
              styles: { ...defaultStyles, display: 'flex' },
              type: '2Col',
            } as EditorElement,
        }
        dispatch(add_element(twoColPayload))
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
            elementDetails: element,
        }
        dispatch(change_clicked_element(clickedPayload))
    }

  const handleDeleteElement = () => {
    const clickedPayload =  {
        elementDetails: element,
    }
    dispatch(delete_element(clickedPayload))
  }

  return (
    <div
      style={styles}
      className={clsx('relative p-4 transition-all group', {
        'max-w-full w-full': type === 'container' || type === '2Col',
        'h-fit': type === 'container',
        'h-full': type === '__body',
        'overflow-auto': type === '__body',
        'flex flex-col md:!flex-row': type === '2Col',
        '!border-blue-500':
          state.editor.selectedElement.id === id &&
          !state.editor.liveMode &&
          state.editor.selectedElement.type !== '__body',
        '!border-yellow-400 !border-4':
          state.editor.selectedElement.id === id &&
          !state.editor.liveMode &&
          state.editor.selectedElement.type === '__body',
        '!border-solid':
          state.editor.selectedElement.id === id && !state.editor.liveMode,
        'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
      })}
      onDrop={(e) => handleOnDrop(e, id)}
      onDragOver={handleDragOver}
      draggable={type !== '__body'}
      onClick={handleOnClickBody}
      onDragStart={(e) => handleDragStart(e, 'container')}
    >
      <Badge
        className={clsx(
          'absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg hidden',
          {
            block:
              state.editor.selectedElement.id === element.id &&
              !state.editor.liveMode,
          }
        )}
      >
        {element.name}
      </Badge>

      {Array.isArray(content) &&
        content.map((childElement) => (
          <Recursive
            key={childElement.id}
            element={childElement}
          />
        ))}

      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode &&
        state.editor.selectedElement.type !== '__body' && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold  -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
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

export default Container