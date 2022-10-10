import { render } from '@testing-library/react';

import CcComponents from './CcComponents';

describe('CcComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CcComponents />);
    expect(baseElement).toBeTruthy();
  });
});
