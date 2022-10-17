import { render } from '@testing-library/react';

import Swcrapp from './Swcrapp';

describe('Swcrapp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Swcrapp />);
    expect(baseElement).toBeTruthy();
  });
});
