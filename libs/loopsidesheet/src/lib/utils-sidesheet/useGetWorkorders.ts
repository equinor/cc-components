import { mockWorkorders } from "./mockWorkorder"

export const useGetWorkorders = () => {

    return {
        data: mockWorkorders,
        isLoading: false,
        error: null
    }
}