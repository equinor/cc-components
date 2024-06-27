import React from "react";
import styled, { css, keyframes } from "styled-components";
import { PersonAvatar } from '@equinor/fusion-react-person';
import { useCurrentUser } from '@equinor/fusion-framework-react-app/framework';
import { Icon } from "@equinor/eds-core-react";
import { Message } from "../sidesheet/lib/ui-sidesheet/RFOCTab";

const sendingAnimation = keyframes`
  0%, 100% { transform: scale(0.7); opacity: 0.7; }
  50% { transform: scale(1); opacity: 1; }
`;

const Bubble = styled.div<{ isMine: boolean, isSending: boolean, timestamp?: string }>`

  opacity: ${props => (props.isSending ? '0.6' : '1')};
  ${props => props.isSending && css`
    animation: ${sendingAnimation} 2.5s ease-in-out infinite;
  `}

  max-width: 60%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 20px;
  border-bottom-right-radius: ${props => (props.isMine ? "0px" : undefined)};
  border-bottom-left-radius: ${props => (props.isMine ? undefined : "0px")};
  background-color: ${props => (props.isMine ? '#0078ff' : '#e5e5ea')};
  color: ${props => (props.isMine ? 'white' : '#333')};
  align-self: ${props => (props.isMine ? 'flex-end' : 'flex-start')};
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.4;
  position: relative;

  &::after {
    content: '${(props) => props.timestamp}';
    white-space: nowrap;
    color: grey;
    position: absolute;
    top: -1.5em; /* Adjust this value as needed to position the text above the element */
    left: 50%;
    transform: translateX(-50%);
    /* Additional styles for the text */
    font-size: 1em; /* Normal text size */
    text-align: center;
    /* You might want to add more styles such as color, background, padding, etc. */
  }
 `;

type ChatBubbleProps = {
  message: Message;
}
export const ChatBubble = ({ message }: ChatBubbleProps) => {
  const user = useCurrentUser()
  if (!message.isMine) {
    return <span style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
      <Icon size={32} name="help_outline" />
      <Bubble timestamp={message.timestamp} isSending={message.isSending} isMine={message.isMine}>{message.content}</Bubble>
    </span>
  }
  return <span style={{ display: "flex", width: "100%", gap: "10px", alignItems: "flex-end", justifyContent: "end" }}>
    <Bubble timestamp={message.timestamp} isSending={message.isSending} isMine={message.isMine}>{message.content}</Bubble>
    <PersonAvatar size="small" azureId={user?.localAccountId} />
  </span>

};
