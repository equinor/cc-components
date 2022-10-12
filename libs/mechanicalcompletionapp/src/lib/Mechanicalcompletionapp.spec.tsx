import { render } from '@testing-library/react';

import Mechanicalcompletionapp from './Mechanicalcompletionapp';

describe('Mechanicalcompletionapp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Mechanicalcompletionapp />);
    expect(baseElement).toBeTruthy();
  });
});
