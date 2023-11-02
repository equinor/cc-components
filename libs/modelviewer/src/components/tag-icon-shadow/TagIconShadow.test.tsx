import { describe, test, expect, beforeEach } from 'vitest';
import { screen, render } from '@testing-library/react';
import TagIconShadowWrapper from './TagIconShadow';

describe('TacIconShadow', () => {
  beforeEach(() => {
    render(
      <TagIconShadowWrapper>
        <p>Icon</p>
      </TagIconShadowWrapper>
    );
  });
  test('Should have error message', async () => {
    expect(screen.getByText(/Icon/i)).toBeDefined();
  });
});
