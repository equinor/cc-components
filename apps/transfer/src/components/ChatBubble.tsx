import React from "react";
import styled, { css, keyframes } from "styled-components";
import { PersonAvatar } from '@equinor/fusion-react-person';
import { useCurrentUser } from '@equinor/fusion-framework-react-app/framework';
import { Icon } from "@equinor/eds-core-react";

const sendingAnimation = keyframes`
  0%, 100% { transform: scale(0.7); opacity: 0.7; }
  50% { transform: scale(1); opacity: 1; }
`;

const Bubble = styled.div<{ isMine: boolean, isSending: boolean }>`

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
 `;

type ChatBubbleProps = {
  message: string;
  isMine: boolean;
  isSending: boolean;
}
export const ChatBubble = ({ message, isMine, isSending }: ChatBubbleProps) => {
  const user = useCurrentUser()
  if (!isMine) {
    return <span style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
      <Icon size={32} name="help_outline" />
      <Bubble isSending={isSending} isMine={isMine}>{message}</Bubble>
    </span>
  }
  return <span style={{ display: "flex", width: "100%", gap: "10px", alignItems: "flex-end", justifyContent: "end" }}>
    <Bubble isSending={isSending} isMine={isMine}>{message}</Bubble>
    <PersonAvatar size="small" azureId={user?.localAccountId} />
  </span>

};
