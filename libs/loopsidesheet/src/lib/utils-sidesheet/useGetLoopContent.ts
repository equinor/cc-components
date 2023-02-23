import { mockLoopContent } from "./mockLoopContent"

export const useGetLoopContent = () => {

    return {
        data: mockLoopContent,
        isLoading: false,
        error: null
    }
}