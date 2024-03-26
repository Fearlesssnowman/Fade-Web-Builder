import { PayloadAction } from "@reduxjs/toolkit"
import { EditorElement } from "./editorSlice"


export const addAnElement = (
    editorArray: EditorElement[],
    action:  PayloadAction<{ containerId: string; elementDetails: EditorElement }>
  ): EditorElement[] => {
        return editorArray.map((item) => {
        if (item.id === action.payload.containerId && Array.isArray(item.content)) {
            return {
            ...item,
            content: [...item.content, action.payload.elementDetails],
            }
        } else if (item.content && Array.isArray(item.content)) {
            return {
            ...item,
            content: addAnElement(item.content, action),
            }
        }
        return item
    })
}

export const deleteAnElement = (
    editorArray: EditorElement[],
    action: PayloadAction<{ elementDetails: EditorElement }>
) : EditorElement[] => {
    return editorArray.filter((item) => {
        if (item.id === action.payload.elementDetails.id) {
            console.log("I deleted this element", item)
            return false
        } else if (item.content && Array.isArray(item.content)) {
            item.content = deleteAnElement(item.content, action)
        }
        return true
    })
}

export const updateAnElement = (
    editorArray: EditorElement[],
    action: PayloadAction<{ elementDetails: EditorElement }>
  ): EditorElement[] => {
    return editorArray.map((item) => {
      if (item.id === action.payload.elementDetails.id) {
        return { ...item, ...action.payload.elementDetails }
      } else if (item.content && Array.isArray(item.content)) {
        return {
          ...item,
          content: updateAnElement(item.content, action),
        }
      }
      return item
    })
  }