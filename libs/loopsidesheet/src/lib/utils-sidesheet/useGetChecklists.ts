import { mockChecklists } from "./mockChecklist";

export const useGetChecklists = () => {

    return {
        data: mockChecklists,
        isLoading: false,
        error: null
    }
}