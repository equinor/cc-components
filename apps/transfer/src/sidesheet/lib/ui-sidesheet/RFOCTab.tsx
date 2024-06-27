import { HandoverPackage } from "@cc-components/handovershared"
import { Button, CircularProgress, Icon, TextField } from "@equinor/eds-core-react"
import React, { useLayoutEffect, useState } from "react"
import { useHandoverResource } from "../utils-sidesheet"
import { ChatBubble } from "../../../components/ChatBubble"
import styled from "styled-components"
import { tokens } from "@equinor/eds-tokens"
import { useVirtualizer } from "@tanstack/react-virtual"

const default_messages: Message[] = [
  { content: "We have to resolve 3929018 (Punch A) before initiating RFOC", isMine: false, isSending: false },
  { content: "I will have someone look at it", isMine: true, isSending: false },
  { content: "Fixed, are we ready to initiate now?", isMine: true, isSending: false },
  { content: "Sorry for spamming but a scrollbar was necessary to simulate a heated argument", isMine: true, isSending: false },
  { content: "Sorry for spamming but a scrollbar was necessary to simulate a heated argument", isMine: true, isSending: false },
  { content: "Sorry for spamming but a scrollbar was necessary to simulate a heated argument", isMine: true, isSending: false },
  { content: "Sorry for spamming but a scrollbar was necessary to simulate a heated argument", isMine: true, isSending: false },
  { content: "Sorry for spamming but a scrollbar was necessary to simulate a heated argument", isMine: true, isSending: false },
  { content: "Creating a virtualized list can be challenging, especially when it comes to managing the height of list items. Accurate height calculation is essential for the correct functioning of the virtualization process. Virtualized lists only render items that are currently in the viewport, thereby improving performance for lists with a large number of items. However, any miscalculation in the height of these items can lead to issues like incorrect item positioning, erratic scrolling, or clipping of content.", isMine: true, isSending: false },
  { content: "Yep", isMine: false, isSending: false },
]


type RFOCTabProps = {
  commPkg: HandoverPackage
}
export function RFOCTab({ commPkg }: RFOCTabProps) {
  const {
    data: punchPackages,
    dataIsFetching: isDataFetchingPunch,
    error: punchError,
  } = useHandoverResource(commPkg.commissioningPackageUrlId, 'punch');
  const hasPunchA = punchPackages?.some(s => s.category == "PA")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>(default_messages)

  const sendMessage = async () => {
    setMessages(s => ([...s, { content: message, isMine: true, isSending: true }]))
    setMessage("")
    await new Promise((res) => setTimeout(() => {
      setMessages((s) => [...s.map(s => ({ ...s, isSending: false }))])
      res(undefined)
    }, 2500))
  }

  return (
    <div style={{ display: "grid", gridTemplateRows: "1fr auto", height: "100%", boxSizing: "border-box", padding: "10px" }}>
      <Chat messages={messages} />
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <TextField onKeyUp={(a) => a.code == "Enter" && sendMessage()} placeholder="Add a reply" id="Sender" value={message} onChange={(e) => setMessage(e.target.value)} />
          <Icon size={32} name="send" color={tokens.colors.interactive.primary__resting.hex} style={{ cursor: "pointer" }} onClick={() => sendMessage()} />
        </span>
        <span style={{ display: "flex", gap: "10px" }}>
          <Button title={isDataFetchingPunch || !punchPackages || hasPunchA ? `Fix all punch A` : undefined} disabled={isDataFetchingPunch || !punchPackages || hasPunchA}>Initiate RFOC</Button> {hasPunchA && (<Icon name="info_circle" color="red" />)}
          <Button>Postpone</Button>
          {isDataFetchingPunch && (<CircularProgress size={16} />)}
        </span>
      </div>
    </div>
  )
}

type Message = {
  isSending: boolean;
  isMine: boolean;
  content: string;
}
type ChatProps = {
  messages: Message[]
}
function Chat({ messages }: ChatProps) {
  const parentRef = React.useRef<HTMLDivElement | null>(null)

  const rowVirtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parentRef.current,
    //HACK: Bruh
    estimateSize: (i) => 50 + (Math.floor(messages[i].content.length / 50) * 20.5),
    paddingStart: 20,
    paddingEnd: 20,
  })


  useLayoutEffect(() => {
    rowVirtualizer.scrollToIndex(messages.length-1, {align: "center"})
  },[])

  return (
    <>
      <div
        ref={parentRef}
        style={{
          height: `100%`,
          overflow: 'auto'
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {

            const msg = messages[virtualItem.index]
            return (<div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <ChatBubble isMine={msg.isMine} isSending={msg.isSending} message={msg.content} />
            </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

