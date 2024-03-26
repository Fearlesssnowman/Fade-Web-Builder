import React from 'react'
import ContextWindow from './_components/ContextWindow/ContextWindow'
import Properties from './_components/Properties'

function Editor(props: { data: {accountId: string, funnelId: string, funnelPageId: string, funnelPageDetails: {}} }) {
  const { data } = props
  const { accountId, funnelId, funnelPageId, funnelPageDetails } = data;
  console.log("This is inside the Editor ", accountId, funnelId, funnelPageId, funnelPageDetails)
  return (
    <div>
        <ContextWindow/>
        <Properties subaccountId={accountId} />
    </div>
  )
}

export default Editor
