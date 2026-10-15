export const getDotsColor = (category: string | null): string => {
    switch (category) {
        case 'PA':
            return '#ff4081';
        default:
            return '#ffc107';
    }
};