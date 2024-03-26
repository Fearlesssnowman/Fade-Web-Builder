'use client';

import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { db } from "@/lib/db";
import { EditorBtns } from '@/lib/constants'
import { addAnElement, deleteAnElement, updateAnElement } from "./editorFns";

export type DeviceTypes = 'Desktop' | 'Mobile' | 'Tablet'

export type EditorElement = {
    id: string
    styles: React.CSSProperties
    name: string
    type: EditorBtns
    content: EditorElement[] | { href?: string; innerText?: string; src?: string }
}

export type Editor = {
    liveMode: boolean
    elements: EditorElement[]
    selectedElement: EditorElement
    device: DeviceTypes
    previewMode: boolean
    funnelPageId: string
}

export type HistoryState = {
    history: Editor[]
    currentIndex: number
}

export type EditorState = {
    editor: Editor
    history: HistoryState
}

const initialEditor: Editor = {
    elements: [
        {
        content: [],
        id: '__body',
        name: 'Body',
        styles: {},
        type: '__body',
        },
    ],
    selectedElement: {
        id: '',
        content: [],
        name: '',
        styles: {},
        type: null,
    },
    device: 'Desktop',
    previewMode: false,
    liveMode: false,
    funnelPageId: '',
}

const initialHistoryState: HistoryState = {
  history: [initialEditor],
  currentIndex: 0,
}

const initialState: EditorState = {
  editor: initialEditor,
  history: initialHistoryState,
}

export const editorSlice = createAppSlice({
  name: "counter",
  initialState,
  reducers: (create) => ({
    populate: create.reducer((state, action: PayloadAction<string>) => {
    //   state += action.payload;
    
    }),
    change_device: create.reducer((state, action: PayloadAction<DeviceTypes>) => {
      state.editor.device = action.payload;
    }),
    toggle_preview_mode: create.reducer((state) => {
      state.editor.previewMode = state.editor.previewMode ? false : true;
    }),
    toggle_live_mode: create.reducer((state) => {
      state.editor.liveMode = state.editor.liveMode ? false : true;
    }),
    add_element: create.reducer((state, action: PayloadAction<{ containerId: string; elementDetails: EditorElement }>) => {
      const updatedEditorState = {
        ...state.editor,
        elements: addAnElement(state.editor.elements, action),
      }

      const updatedHistory = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorState },
      ]

      const newEditorState = {
        ...state,
        editor: updatedEditorState,
        history: {
          ...state.history,
          history: updatedHistory,
          currentIndex: updatedHistory.length - 1,
        },
      }
      return newEditorState;
    }),
    change_clicked_element: create.reducer((state, action: PayloadAction<{ elementDetails: EditorElement }>) => {
      const clickedState = {
          ...state,
          editor: {
              ...state.editor,
              selectedElement: action.payload.elementDetails || { 
                  id: '',
                  content: [],
                  name: '',
                  styles: {},
                  type: "__body",
              },
          },
          history: {
              ...state.history,
              history: [
                  ...state.history.history.slice(0, state.history.currentIndex + 1),
                  { ...state.editor }, 
              ],
              currentIndex: state.history.currentIndex + 1,
          },
      }
      return clickedState;
    }),
    delete_element: create.reducer((state, action: PayloadAction<{ elementDetails: EditorElement }>) => {
        const stateElements = state.editor.elements
        state.editor.elements = deleteAnElement(stateElements, action)
    }),
    update_element: create.reducer((state, action: PayloadAction<{ elementDetails: EditorElement }>) => {
        const updatedElements = updateAnElement(state.editor.elements, action)

        const UpdatedElementIsSelected =
          state.editor.selectedElement.id === action.payload.elementDetails.id

        const updatedEditorStateWithUpdate = {
          ...state.editor,
          elements: updatedElements,
          selectedElement: UpdatedElementIsSelected
            ? action.payload.elementDetails
            : {
                id: '',
                content: [],
                name: '',
                styles: {},
                type: null,
              },
        }

        const updatedHistoryWithUpdate = [
          ...state.history.history.slice(0, state.history.currentIndex + 1),
          { ...updatedEditorStateWithUpdate }, 
        ]
        const updatedEditor = {
          ...state,
          editor: updatedEditorStateWithUpdate,
          history: {
            ...state.history,
            history: updatedHistoryWithUpdate,
            currentIndex: updatedHistoryWithUpdate.length - 1,
          },
        }
        return updatedEditor
    })
  }),
  selectors: {
    selectEditor: (state) => state.editor,
    selectHistory: (state) => state.history,
  },
});

export const { populate, change_device, toggle_live_mode, toggle_preview_mode, add_element, change_clicked_element, delete_element, update_element } = editorSlice.actions;

export const { selectEditor, selectHistory } = editorSlice.selectors;
