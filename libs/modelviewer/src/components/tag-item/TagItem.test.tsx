import { describe, test, expect, beforeEach, vi } from 'vitest';
import { screen, render, fireEvent } from '@testing-library/react';
import { TagItem } from './TagItem';
import { TagOverlay } from '../../types/overlayTags';

const tag: TagOverlay = {
  tagNo: 'test-123',
  color: '#ff0000',
  description: 'test-description',
};

let isSelected = true;

let onSelected = vi.fn();
describe('TagItem', () => {
  beforeEach(() => {
    onSelected = vi.fn();
  });

  test('Should display tagNo 123', async () => {
    render(<TagItem {...{ tag, isSelected, onSelected }} />);
    expect(screen.getByText(/test-123/i)).toBeDefined();
  });
  test('Should display description', async () => {
    render(<TagItem {...{ tag, isSelected, onSelected }} />);
    expect(screen.getByText(/test-description/i)).toBeDefined();
  });
  test('Should call onSelected', async () => {
    render(<TagItem {...{ tag, isSelected, onSelected }} />);
    const tagItem = screen.getByLabelText(/tag context/i);
    fireEvent.click(tagItem);

    expect(onSelected).toBeCalled();
    expect(onSelected).toBeCalledTimes(1);
  });
  test('Should not show tagNo 123', async () => {
    isSelected = false;
    render(<TagItem {...{ tag, isSelected, onSelected }} />);
    expect(screen.getAllByTestId('eds-icon-path')).toBeDefined();
  });
  test('Should call onSelected with tagNo', async () => {
    isSelected = false;
    render(<TagItem {...{ tag, isSelected, onSelected }} />);
    const tagItem = screen.getByLabelText(/tag context/i);
    fireEvent.click(tagItem);

    expect(onSelected).toBeCalled();
    expect(onSelected).toBeCalledTimes(1);
    expect(onSelected).toBeCalledWith('test-123');
  });
});
