import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PortalMessage } from './PortalMessage';

describe('PortalMessage', () => {
	it('renders with default values', () => {
		render(<PortalMessage title="Default Message" />);

		const titleElement = screen.getByText('Default Message');
		expect(titleElement).toBeInTheDocument();

		const iconElement = screen.getByTestId('icon');
		expect(iconElement).toBeInTheDocument();
	});

	it('renders with custom type and color', () => {
		render(
			<PortalMessage title="Custom Message" type="Error" color="#FF0000">
				Custom Error Content
			</PortalMessage>
		);

		const titleElement = screen.getByText('Custom Message');
		expect(titleElement).toBeInTheDocument();

		const iconElement = screen.getByTestId('icon');
		expect(iconElement).toBeInTheDocument();

		const contentElement = screen.getByText('Custom Error Content');
		expect(contentElement).toBeInTheDocument();
	});
});
