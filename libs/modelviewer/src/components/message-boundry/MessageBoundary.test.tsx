import { describe, test, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import MessageBoundary, { MessageBoundaryFallbackProps } from './MessageBoundary';
import { useError } from '../../hooks/useMessageBoundary';
import { useEffect } from 'react';

type MessageComponentProps = {
  somethingToThrow: unknown;
};

const MessageComponent = ({ somethingToThrow }: MessageComponentProps) => {
  throw somethingToThrow;
};
const MessageComponentWithHook = () => {
  const { setError } = useError();

  useEffect(() => {
    setError('This is an Error');
  }, []);
  return null;
};

const Fallback = ({ message, title }: MessageBoundaryFallbackProps) => {
  return (
    <p data-testid="fallback">
      <h1>{title}</h1>
      <p>{message}</p>
    </p>
  );
};

describe('MessageBoundary', async () => {
  test('Should Trow Error and display message', async () => {
    const message = 'This is a test!';
    render(
      <MessageBoundary fallbackComponent={Fallback}>
        <MessageComponent somethingToThrow={new Error(message)} />
      </MessageBoundary>
    );
    const el = await screen.findByTestId('fallback');

    expect(el.innerHTML).toContain(message);
    expect(el.innerHTML).toContain('Error');
  });

  test('Should be able to handle string', async () => {
    render(
      <MessageBoundary fallbackComponent={Fallback}>
        <MessageComponent somethingToThrow={'test'} />
      </MessageBoundary>
    );
    const el = await screen.findByTestId('fallback');

    expect(el.innerHTML).toContain('test');
    expect(el.innerHTML).toContain('Unknown');
  });
  test('Should be able to handle error by setError from useError Hook', async () => {
    render(
      <MessageBoundary fallbackComponent={Fallback}>
        <MessageComponentWithHook />
      </MessageBoundary>
    );
    const el = await screen.findByTestId('fallback');

    expect(el.innerHTML).toContain('This is an Error');
    expect(el.innerHTML).toContain('Error');
  });
});


describe('component test for useError', async () => {
  const errorMessage = 'This is an Error 2000';
  
  const MessageComponentWithHookClickEvent = () => {
    const { setError } = useError();

    return (
      <button
      data-testid="button"
      onClick={() => {
        setError(errorMessage);
      }}
      >
          Error Button
        </button>
      );
    };
    
    const Fallback = ({ message, title }: MessageBoundaryFallbackProps) => {
      return (
        <div data-testid="fallback">
          <h1>{title}</h1>
          <p>{message}</p>
        </div>
      );
    };
    
    test('Should be able have setError inside a dom event', async () => {
    render(
      <MessageBoundary fallbackComponent={Fallback}>
        <MessageComponentWithHookClickEvent />
      </MessageBoundary>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const el = await screen.findByTestId('fallback');
    expect(el.innerHTML).toContain(errorMessage);
    expect(el.innerHTML).toContain('Error');
  });
});