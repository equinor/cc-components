import { useState, useEffect, useRef } from 'react';

export const useClientWidth = (): number => {
	const [clientWidth, setClientWidth] = useState<number>(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setClientWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return clientWidth;
};

export const useDivHeight = () => {
	const [divHeight, setDivHeight] = useState<number>(0);
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const updateHeight = () => {
			if (ref.current) {
				setDivHeight(ref.current.clientHeight - ref.current.offsetHeight);
			}
		};

		// Initial height update
		updateHeight();

		const handleResize = () => {
			updateHeight();
		};

		// Subscribe to window resize event
		window.addEventListener('resize', handleResize);

		return () => {
			// Clean up event listener on component unmount
			window.removeEventListener('resize', handleResize);
		};
	}, [ref]);

	return { divHeight, ref };
};
