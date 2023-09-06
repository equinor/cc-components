import { Component, FC, ReactNode } from 'react';
import {
  ErrorMessage,
  InfoMessage,
  MessageType,
  WaringMessage,
} from '../../types/general-types';

export interface MessageBoundaryState {
  hasMessage?: boolean;
  message?: string;
  title?: string;
  type?: MessageType | 'Unknown';
  item?: ErrorMessage | InfoMessage | WaringMessage | string;
}

export type MessageBoundaryFallbackProps = MessageBoundaryState;

interface Props {
  children?: ReactNode;
  fallbackComponent: FC<MessageBoundaryState>;
}

class MessageBoundary extends Component<Props, MessageBoundaryState> {
  constructor(props: Props) {
    super(props);
    this.state = { hasMessage: false };
  }

  static getDerivedStateFromError(
    item: ErrorMessage | InfoMessage | WaringMessage
  ): MessageBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasMessage: true, message: item.message, title: item.name, item };
  }

  componentDidCatch(item: ErrorMessage | InfoMessage | WaringMessage) {
    if (typeof item === 'string') {
      this.setState({
        hasMessage: true,
        message: item,
        title: 'Unknown',
        type: 'Unknown',
      });
      return;
    }
    this.setState({
      hasMessage: true,
      message: item.message,
      title: item.name,
      item,
      type: item.type,
    });
  }

  render() {
    const { hasMessage } = this.state;
    const FallbackComponent = this.props.fallbackComponent;

    if (hasMessage) {
      return <FallbackComponent {...this.state} />;
    }

    return this.props.children;
  }
}

export default MessageBoundary;
