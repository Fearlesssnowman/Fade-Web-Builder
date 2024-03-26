import React from 'react'
import ContextWindow from './_components/ContextWindow/ContextWindow'
import Properties from './_components/Properties'

function Editor() {
  return (
    <div>
        <ContextWindow/>
        <Properties subaccountId='1' />
    </div>
  )
}

export default Editor
