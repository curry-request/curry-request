import crossFetch from "cross-fetch"

const request = (
  baseUrl: string,
  alternativeFetchImpl?: typeof fetch
) => (baseHeaders?: { [k: string]: string }) => (method: string) => (
  route?: string
) => (payload?: string | object) => (token?: string): Promise<Response> => {
  const headers = baseHeaders || {}
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const fetch = alternativeFetchImpl || crossFetch

  // we add an abort() method
  //const abortCtrl = new AbortController()
  //const signal = abortCtrl.signal
  //request.abort = () => abortCtrl.abort()

  const httpConfig: RequestInit = {
    method,
    headers
    //signal,
  }

  if (payload) {
    httpConfig.body =
      typeof payload === "object" ? JSON.stringify(payload) : payload
  }

  const res = fetch(`${baseUrl}${route || ""}`, httpConfig)
  return res
}

export default request
