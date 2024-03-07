import { useEffect, useMemo, useState } from 'react';

import {
  ErrorMessage,
  InfoMessage,
  MessageType,
  WaringMessage,
} from '../types/general-types';

export const useMessageBoundary = () => {
  const [messageItem, setItem] = useState<
    ErrorMessage | WaringMessage | InfoMessage | undefined
  >();

  const setMessageItem = (item?: ErrorMessage | InfoMessage | WaringMessage) => {
    setItem(item);
  };

  useEffect(() => {
    if (messageItem) {
      throw messageItem;
    }
  }, [messageItem]);

  return {
    setMessageItem,
    messageItem,
  };
};

export const useInfo = () => {
  const { setMessageItem, messageItem } = useMessageBoundary();
  const setInfo = (message: string) => {
    setMessageItem({ message, name: 'Message', type: MessageType.Info });
  };

  const infoMessage = useMemo(() => {
    if (messageItem?.type === MessageType.Info) {
      return messageItem;
    }
    return;
  }, [messageItem]);

  return { infoMessage, setInfo };
};

export const useWarning = () => {
  const { setMessageItem, messageItem } = useMessageBoundary();
  const setWarning = (message: string) => {
    setMessageItem({ message, name: 'Message', type: MessageType.Warning });
  };

  const warningMessage = useMemo(() => {
    if (messageItem?.type === MessageType.Warning) {
      return messageItem;
    }
    return;
  }, [messageItem]);

  return { warningMessage, setWarning };
};

export const useError = () => {
  const { setMessageItem, messageItem } = useMessageBoundary();
  const setError = (message: string) => {
    setMessageItem({ message, name: 'Error', type: MessageType.Error });
  };

  const errorMessage = useMemo(() => {
    if (messageItem?.type === MessageType.Error) {
      return messageItem;
    }
    return;
  }, [messageItem]);

  return { errorMessage, setError };
};
