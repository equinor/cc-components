export enum MessageType {
  Info = 'Info',
  Error = 'Error',
  Warning = 'Warning',
}

export interface InfoMessage extends Error {
  type: MessageType.Info;
}

export interface WaringMessage extends Error {
  type: MessageType.Warning;
}

export interface ErrorMessage extends Error {
  type: MessageType.Error;
}
