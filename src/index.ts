import crossFetch from "cross-fetch"

const request = (
  baseUrl: string,
  alternativeFetchImpl?: typeof fetch
) => (baseHeaders: { [k: string]: string }) => (method: string) => (
  route?: string
) => (payload?: { [k: string]: string }) => (
  token?: string
): Promise<Response> => {
  const headers = baseHeaders
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const fetch = alternativeFetchImpl || crossFetch

  const httpConfig = {
    method,
    headers,
    body: JSON.stringify(payload),
  }

  return fetch(`${baseUrl}${route || ""}`, httpConfig)
}

export default request
