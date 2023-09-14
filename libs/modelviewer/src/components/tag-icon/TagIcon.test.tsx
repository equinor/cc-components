import { describe, test, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import { TagIcon } from './TagIcon';
import { Icon } from '@equinor/eds-core-react';
import { home } from '@equinor/eds-icons';

Icon.add({ home });
describe('TacIcon', () => {
  test('Should have error message', () => {
    render(<TagIcon icon={<Icon name="home" />} legendColor="#fff" />);

    expect(screen.findAllByText('Icon')).toBeTruthy();
  });
});
