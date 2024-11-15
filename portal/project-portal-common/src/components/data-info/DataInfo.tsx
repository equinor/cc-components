import { Icon, Popover, Typography } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { PersonCell } from '@equinor/fusion-react-person';
import { useRef, useState } from 'react';
import styled from 'styled-components';

type DataInfoProps = {
	title: string;
	dataSource: string;
	azureUniqueId?: string;
	access: 'Internal' | 'External' | 'Restricted';
};

const Style = {
	Content: styled.div`
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-width: 200px;
	`,
};

export const DataInfo = ({ dataSource, azureUniqueId, access, title }: DataInfoProps) => {
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
				<Popover.Header>{title}</Popover.Header>
				<Popover.Content>
					<Style.Content>
						<div>
							<Typography variant="overline"> Data source:</Typography>
							<Typography variant="body_short">
								<b>{dataSource}</b>
							</Typography>
						</div>
						<div>
							<Typography variant="overline"> Access:</Typography>
							<Typography variant="body_short">
								<b>{access}</b>
							</Typography>
						</div>

						{azureUniqueId && (
							<>
								<Typography variant="overline">Contact person</Typography>
								<PersonCell azureId={azureUniqueId} showAvatar subHeading={(u: {mail: string}) => u.mail} />
							</>
						)}
					</Style.Content>
				</Popover.Content>
			</Popover>
		</div>
	);
};
