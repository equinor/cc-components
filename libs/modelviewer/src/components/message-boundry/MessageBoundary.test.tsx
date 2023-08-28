import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import MessageBoundary, { MessageBoundaryFallbackProps } from './MessageBoundary';
import { useError } from '../../hooks/useMessageBoundary';

type MessageComponentProps = {
  somethingToThrow: unknown;
};

const MessageComponent = ({ somethingToThrow }: MessageComponentProps) => {
  throw somethingToThrow;
};
const MessageComponentWithHook = () => {
  const { setError } = useError();

  setError('This is an Error');
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
  test('Should be able to handle string', async () => {
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
