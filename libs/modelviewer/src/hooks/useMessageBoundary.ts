import { useMemo, useState } from 'react';

import {
  ErrorMessage,
  InfoMessage,
  MessageType,
  WaringMessage,
} from '../type/general-types';

type MessageOptions = {
  shouldNotThrow: boolean;
};

export const useMessageBoundary = () => {
  const [messageItem, setItem] = useState<
    ErrorMessage | WaringMessage | InfoMessage | undefined
  >();

  const setMessageItem = (
    item?: ErrorMessage | InfoMessage | WaringMessage,
    options?: MessageOptions
  ) => {
    setItem(item);

    if (!options?.shouldNotThrow && item) {
      throw item;
    }
  };

  return {
    setMessageItem,
    messageItem,
  };
};

export const useInfo = () => {
  const { setMessageItem, messageItem } = useMessageBoundary();
  const setInfo = (message: string, options?: MessageOptions) => {
    setMessageItem({ message, name: 'Message', type: MessageType.Info }, options);
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
  const setWarning = (message: string, options?: MessageOptions) => {
    setMessageItem({ message, name: 'Message', type: MessageType.Warning }, options);
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
  const setError = (message: string, options?: MessageOptions) => {
    setMessageItem({ message, name: 'Error', type: MessageType.Error }, options);
  };

  const errorMessage = useMemo(() => {
    if (messageItem?.type === MessageType.Error) {
      return messageItem;
    }
    return;
  }, [messageItem]);

  return { errorMessage, setError };
};
