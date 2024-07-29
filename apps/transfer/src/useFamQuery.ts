import { useHttpClient } from "@equinor/fusion-framework-react/http"
import { useQuery } from "@tanstack/react-query"

export const useFamQuery = <T,>(queryKey: string[], query: string, enabled: boolean = true) => {
  const client = useHttpClient("cc-api")
  return useQuery({
    enabled,
    queryKey,
    queryFn: async () => {
      const res = await client.fetch("/v2/dynamic", {
        method: "POST",
        headers: {
          ["content-type"]: "application/json"
        },
        body: JSON.stringify({
          pagination: null,
          options: null,
          query: query
        })
      })
      return (await res.json()).data as T
    }
  })
}
