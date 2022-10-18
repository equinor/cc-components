import { render } from '@testing-library/react';

import Punchapp from './Punchapp';

describe('Punchapp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Punchapp />);
    expect(baseElement).toBeTruthy();
  });
});
