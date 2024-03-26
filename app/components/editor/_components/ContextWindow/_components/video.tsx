'use client'
import { Badge } from '@/components/ui/badge'
import { EditorBtns } from '@/lib/constants'
import { EditorElement, change_clicked_element, delete_element, selectEditor, selectHistory } from '@/lib/features/editor/editorSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import clsx from 'clsx'
import { Trash } from 'lucide-react'
import React from 'react'

type Props = {
  element: EditorElement
}

const VideoComponent = (props: Props) => {
  const dispatch = useAppDispatch()
  const editor = useAppSelector(selectEditor)
    const history = useAppSelector(selectHistory)
    const state = { editor, history }

const styles = props.element.styles



const handleDragStart = (e: React.DragEvent, type: string) => {
    if (type === '__body') return
    e.dataTransfer.setData('componentType', type)
}

const handleOnClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const clickedPayload =  {
        elementDetails: props.element,
    }
    dispatch(change_clicked_element(clickedPayload))
}

const handleDeleteElement = () => {
    const clickedPayload =  {
        elementDetails: props.element,
    }
    dispatch(delete_element(clickedPayload))
  }

  return (
    <div
      style={styles}
      draggable
      onDragStart={(e) => handleDragStart(e, 'video')}
      onClick={handleOnClick}
      className={clsx(
        'p-[2px] w-full m-[5px] relative text-[16px] transition-all flex items-center justify-center',
        {
          '!border-blue-500':
            state.editor.selectedElement.id === props.element.id,
          '!border-solid': state.editor.selectedElement.id === props.element.id,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        }
      )}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg ">
            {state.editor.selectedElement.name}
          </Badge>
        )}

      {!Array.isArray(props.element.content) && (
        <iframe
          width={props.element.styles.width || '560'}
          height={props.element.styles.height || '315'}
          src={props.element.content.src}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      )}

      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
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

export default VideoComponent