import { HandoverPackage } from "@cc-components/handovershared"
import { Button, CircularProgress, Icon, TextField } from "@equinor/eds-core-react"
import React, { useState } from "react"
import { useHandoverResource } from "../utils-sidesheet"
import { ChatBubble } from "../../../components/ChatBubble"
import styled from "styled-components"
import { tokens } from "@equinor/eds-tokens"

const default_messages: Message[] = [
  { content: "We have to resolve 3929018 (Punch A) before initiating RFOC", isMine: false, isSending: false },
  { content: "I will have someone look at it", isMine: true, isSending: false },
  { content: "Fixed, are we ready to initiate now?", isMine: true, isSending: false },
  { content: "Sorry for spamming but a scrollbar was necessary to simulate a heated argument", isMine: true, isSending: false },
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

const ChatFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding:10px;
`;
type Message = {
  isSending: boolean;
  isMine: boolean;
  content: string;
}
type ChatProps = {
  messages: Message[]
}
function Chat({ messages }: ChatProps) {
  return (
    <ChatFlexContainer>
      {messages.map(s => <ChatBubble isSending={s.isSending} isMine={s.isMine} message={s.content} />)}
    </ChatFlexContainer>
  )
}
