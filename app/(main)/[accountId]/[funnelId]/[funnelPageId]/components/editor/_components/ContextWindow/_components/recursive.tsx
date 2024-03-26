import React from 'react'
import { EditorElement } from '@/lib/features/editor/editorSlice'
import Container from './container'
import TextComponent from './text'
import VideoComponent from './video'

type Props = {
  element: EditorElement
}

const Recursive = ({ element }: Props) => {
  switch (element.type) {
      case 'text':
          return <TextComponent element={element} />
      case 'container':
          return <Container element={element} />
      case '__body':
          return <Container element={element} />
      case '2Col':
          return <Container element={element} />
      case 'video':
          return <VideoComponent element={element} />
      default:
          return null
  }
}

export default Recursive