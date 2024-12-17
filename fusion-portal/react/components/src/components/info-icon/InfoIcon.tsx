import { Icon, Popover } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useRef, useState } from 'react';

export const InfoIcon = ({ message }: { message: string }) => {
	const referenceElement = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div
			onMouseOver={() => {
				setIsOpen(true);
			}}
			onMouseLeave={() => {
				setIsOpen(false);
			}}
			ref={referenceElement}
		>
			<Icon data={info_circle} color={tokens.colors.text.static_icons__tertiary.hex} />
			<Popover placement="bottom" open={isOpen} anchorEl={referenceElement.current}>
				<Popover.Content>{message}</Popover.Content>
			</Popover>
		</div>
	);
};
