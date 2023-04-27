import { useState } from 'react';

export function useErrorBoundaryTrigger() {
  const [_, setState] = useState(null);
  return (exception: Error) => {
    setState(() => {
      throw exception;
    });
  };
}
