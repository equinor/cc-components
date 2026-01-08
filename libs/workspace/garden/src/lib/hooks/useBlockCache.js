import { useQueries } from '@tanstack/react-query';
import { useGarden } from './useGarden';
export function useBlockCache({ blockSqrt, blocks, blocksInView, context, getBlockAsync, hash, }) {
    const { groupingService: { groupingKeys, timeInterval, dateVariant, summaryKey }, } = useGarden();
    const blockCache = useQueries({
        queries: blocks.map((block) => ({
            /** Unique identifier for blocks, add state here to invalidate query onChange */
            queryKey: [
                ...groupingKeys,
                timeInterval,
                dateVariant,
                summaryKey,
                `x${block.x}`,
                `y${block.y}`,
                context,
                ...hash,
            ],
            /** Only fetch if block is in view */
            enabled: !!blocksInView.find((s) => s.x === block.x && s.y === block.y),
            /** Annoying default in react-query */
            refetchOnWindowFocus: false,
            queryFn: async (s) => {
                const { signal } = s;
                //fetch block with coordinates of block x and block y
                const coordinates = getBlockIndexes(block, blockSqrt);
                return getBlockAsync({
                    ...coordinates,
                    groupingKeys: groupingKeys,
                    timeInterval: timeInterval,
                    dateVariant: dateVariant,
                    summaryKey: summaryKey,
                }, context, signal);
            },
        })),
    });
    return blockCache;
}
/**
 * Get item indexes for block
 * @param b - Block to find indexes for
 * @param sqrt - Square root of block size
 */
function getBlockIndexes(b, sqrt) {
    return {
        columnStart: b.x * sqrt,
        columnEnd: b.x * sqrt + sqrt - 1,
        rowStart: b.y * sqrt,
        rowEnd: b.y * sqrt + sqrt - 1,
    };
}
