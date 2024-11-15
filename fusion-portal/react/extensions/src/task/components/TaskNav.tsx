import { Button, Icon, Tabs } from '@equinor/eds-core-react';
import { PropsWithChildren, useRef, useState, useCallback, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { mergeRefs } from '../utils/merge-refs';

const Style = {
	TabsRow: styled.div`
		display: flex;
		width: calc(100%);
		width: 100%;
	`,
	TabsButton: styled(Button)`
		width: 25px;
		:hover {
			border-radius: 0;
		}
		flex-shrink: 0;
		margin: 0;
		height: 48px;
	`,
};

export const TabNav = ({ children }: PropsWithChildren) => {
	const list = useRef<HTMLDivElement>(null);

	const debounceScroll = useRef<ReturnType<typeof setTimeout>>();

	const [containerWidth, setContainerWidth] = useState(0);
	const [totalWidth, setTotalWidth] = useState(0);
	const [prevDisabled, setPrevDisabled] = useState(true);
	const [nextDisabled, setNextDisabled] = useState(false);

	const handleScroll = useCallback(() => {
		if (debounceScroll.current) clearTimeout(debounceScroll.current);

		debounceScroll.current = setTimeout(() => {
			if (!list.current) return;
			list.current.scrollLeft === 0 ? setPrevDisabled(true) : setPrevDisabled(false);
			const atEndIsh = Math.abs(containerWidth + Math.round(list.current.scrollLeft) - totalWidth) <= 5;
			atEndIsh ? setNextDisabled(true) : setNextDisabled(false);
		}, 200);
	}, [containerWidth, totalWidth]);

	const resizeObserver = useMemo(
		() =>
			new ResizeObserver((entries) => {
				entries.forEach((entry) => {
					setContainerWidth(Math.round(entry.borderBoxSize[0].inlineSize));
					handleScroll();
				});
			}),
		[handleScroll]
	);

	useEffect(() => {
		const cachedList = list.current;
		return () => {
			if (debounceScroll.current) clearTimeout(debounceScroll.current);
			cachedList?.removeEventListener('scroll', handleScroll);
			resizeObserver.disconnect();
		};
	}, [handleScroll, resizeObserver]);

	const listCallback = useCallback(
		(node: HTMLDivElement) => {
			if (!node) return;
			setTotalWidth(node.scrollWidth);
			setContainerWidth(node.clientWidth);
			resizeObserver.observe(node);
			node.addEventListener('scroll', handleScroll, {
				passive: true,
			});
		},
		[handleScroll, resizeObserver]
	);

	const scroll = (direction: string) => {
		//Tabs have "scroll-snap-align: end" so we need to scroll less than
		//the full row to avoid skipping past tabs. Here we set it to 80%
		const SCROLL_AMOUNT = 0.7;
		let target = 0;
		const signifier = direction === 'left' ? -1 : 1;
		if (list.current !== null) {
			target = list.current.scrollLeft + signifier * containerWidth * SCROLL_AMOUNT;
		}

		list.current?.scrollTo(target, 0);
	};

	return (
		<Style.TabsRow>
			{totalWidth > containerWidth && (
				<Style.TabsButton
					variant="ghost_icon"
					onClick={() => scroll('left')}
					aria-hidden="true"
					tabIndex={-1}
					disabled={prevDisabled}
				>
					<Icon name="chevron_left" />
				</Style.TabsButton>
			)}
			<Tabs.List ref={mergeRefs<HTMLDivElement>(list, listCallback)}>{children}</Tabs.List>
			{totalWidth > containerWidth && (
				<Style.TabsButton
					variant="ghost_icon"
					onClick={() => scroll('right')}
					aria-hidden="true"
					tabIndex={-1}
					disabled={nextDisabled}
				>
					<Icon name="chevron_right" />
				</Style.TabsButton>
			)}
		</Style.TabsRow>
	);
};
